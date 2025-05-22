import { Injectable } from '@angular/core';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';
import { User } from '@/types/user';
import { Role } from './auth.enum';
import { Observable, of, throwError } from 'rxjs';
import { sign } from 'fake-jwt-sign';

@Injectable({
  providedIn: 'root',
})
export class InMemoryAuthService extends AuthService {
  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'test@test.com',
    username: 'test',
    name: { first: 'Test', last: 'Test' },
    picture:
      'https://secure.gravatar.com/avatar/7cbaa9afb5ca78d97f3c689f8ce6c985',
    role: Role.Manager,
    dateOfBirth: new Date(1980, 1, 1),
    userStatus: true,
    address: {
      line1: 'Testowa 3/4',
      city: 'Warszawa',
      state: 'Mazowieckie',
      zip: '02-001',
    },
    level: 2,
    phone: '111111111',
  });

  constructor() {
    super();
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production."
    );
  }

  override register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }

  protected authProvider(
    email: string,
    _password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase();

    if (!email.endsWith('@test.com')) {
      return throwError(
        () => 'Failed to login! Email needs to end with @test.com.'
      );
    }

    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
        ? Role.Clerk
        : email.includes('manager')
        ? Role.Manager
        : Role.None,
    } as IAuthStatus;

    this.defaultUser.role = authStatus.userRole;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token;
  }

  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }
}
