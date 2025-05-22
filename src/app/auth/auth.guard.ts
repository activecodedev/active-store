import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UiService } from '@/common/ui.service';
import { map, Observable, take } from 'rxjs';
import { Role } from './auth.enum';
import { Severity } from '@/types/severity.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const uiService = inject(UiService);
  return checkLogin(authService, router, uiService, route);
};

function checkLogin(
  authService: AuthService,
  router: Router,
  uiService: UiService,
  route?: ActivatedRouteSnapshot
): Observable<boolean> {
  return authService.authStatus$.pipe(
    map((authStatus) => {
      const roleMatch = checkRoleMatch(authStatus.userRole, route);
      const allowLogin = authStatus.isAuthenticated && roleMatch;
      if (!allowLogin) {
        showAlert(uiService, authStatus.isAuthenticated, roleMatch);
        router.navigate(['login'], {
          queryParams: {
            redirectUrl: router?.getCurrentNavigation()?.initialUrl.toString(),
          },
        });
      }
      return allowLogin;
    }),
    take(1) // the observable must complete for the guard to work
  );
}

function checkRoleMatch(role: Role, route?: ActivatedRouteSnapshot) {
  if (!route?.data?.['expectedRole']) {
    return true;
  }
  return role === route.data['expectedRole'];
}

function showAlert(uiService: UiService, isAuth: boolean, roleMatch: boolean) {
  if (!isAuth) {
    uiService.showToast(
      Severity.Warning,
      'Brak dostępu',
      'Aby kontynuować musisz się zalogować'
    );
  }
  if (!roleMatch) {
    uiService.showToast(
      Severity.Error,
      'Brak uprawnień',
      'Nie masz uprawnień do tej sekcji'
    );
  }
}
