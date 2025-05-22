import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

export const AuthHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // TODO: create UI service
  // const uiService = inject(UiService)

  const jwt = authService.getToken();
  const baseUrl = environment.baseUrl;

  if (req.url.startsWith(baseUrl)) {
    const authRequest = req.clone({
      setHeaders: { authorization: `Bearer ${jwt}` },
    });
    return next(authRequest).pipe(
      catchError((err) => {
        // TODO: create UI service
        // uiService.showToast(err.error.message)
        if (err.status === 401) {
          router.navigate(['/login'], {
            queryParams: { redirectUrl: router.routerState.snapshot.url },
          });
        }
        return throwError(() => err);
      })
    );
  } else {
    return next(req);
  }
};
