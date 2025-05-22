import { inject, Injectable } from '@angular/core';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { $enum } from 'ts-enum-util';
import { Role } from './auth.enum';
import { IUser, User } from '@/types/user';
import { transformError } from '@/common/common';

interface IJwtToken {
  email: string;
  role: string;
  picture: string;
  iat: number;
  exp: number;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService extends AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  override register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(
      `${environment.baseUrl}/v1/auth/login`,
      {
        email,
        password,
      }
    );
  }

  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: $enum(Role).asValueOrDefault(token.role, Role.None),
      userEmail: token.email,
      userPicture: token.picture,
    } as IAuthStatus;
  }

  protected getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<IUser>(`${environment.baseUrl}/v1/auth/me`)
      .pipe(map(User.Build, catchError(transformError)));
  }
}
