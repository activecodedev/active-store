import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  mergeMap,
  Observable,
  pipe,
  tap,
  throwError,
} from 'rxjs';
import { Role } from './auth.enum';
import { IUser, User } from '@/types/user';
import { CacheService } from '@/common/cache.service';
import { transformError } from '@/common/common';
import { jwtDecode as decode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IServerAuthResponse {
  accessToken: string;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
};

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    // catchError(transformError)
    catchError((error) => {
      return throwError(() => error);
    })
  );
  protected readonly cache = inject(CacheService);
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  );

  constructor() {
    if (this.hasExpiredToken()) {
      this.logout(true);
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken());
      // To load user on browser refresh, resume pipeline must activate on the next cycle
      // Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0);
    }
  }

  abstract register(
    email: string,
    username: string,
    password: string
  ): Observable<void>;

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>;

  protected abstract transformJwtToken(token: unknown): IAuthStatus;

  protected abstract getCurrentUser(): Observable<User>;

  login(email: string, password: string): Observable<void> {
    this.clearToken();

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        const token = decode(value.accessToken);
        return this.transformJwtToken(token);
      }),
      tap((status) => this.authStatus$.next(status)),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      }),
      this.getAndUpdateUserIfAuthenticated
    );

    return loginResponse$;
  }

  logout(clearToken?: boolean) {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0);
  }

  protected setToken(jwt: string) {
    this.cache.setItem('jwt', jwt);
  }

  getToken(): string {
    return this.cache.getItem('jwt') ?? '';
  }

  protected clearToken() {
    // clear all cache data along with jwt
    this.cache.clear();
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken();

    if (jwt) {
      const payload = decode(jwt) as { exp: number };
      return Date.now() >= payload.exp * 1000;
    }

    return true;
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()));
  }
}
