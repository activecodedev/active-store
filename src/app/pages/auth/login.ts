import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppConfigurator } from '@/layout/components/app.configurator';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '@/auth/auth.service';
import { UiService } from '@/common/ui.service';
import { Severity } from '@/types/severity.enum';
import {
  catchError,
  combineLatest,
  EMPTY,
  filter,
  first,
  tap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    RouterModule,
    AppConfigurator,
    InputIcon,
    IconField,
    ToastModule,
    ReactiveFormsModule,
  ],
  template: `
    <app-configurator [simple]="true" />
    <div class="bg-surface-0 dark:bg-surface-900">
      <div class="flex items-center justify-between flex-col h-screen">
        <div
          class="flex flex-col items-center justify-center w-full md:w-4/12 h-full text-center py-12 px-6"
        >
          <a [routerLink]="['/']" class="mb-12" style="cursor: pointer">
            <svg
              height="56"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H6.00019V3.82345L17 1.66667V6.66667L6.00019 8.82345V10.4901L17 8.33333V13.3333L6.00019 15.4901V20H0V0Z"
                fill="url(#paint0_linear)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="3.33335"
                  y1="3.08442e-08"
                  x2="8.49995"
                  y2="20"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="var(--p-primary-400)" />
                  <stop offset="1" stop-color="var(--p-primary-700)" />
                </linearGradient>
              </defs>
            </svg>
          </a>
          <p-toast key="login"></p-toast>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="flex flex-col">
              <p-iconfield class="w-full mb-6">
                <p-inputicon class="pi pi-user" />
                <input
                  pInputText
                  type="text"
                  placeholder="E-mail"
                  formControlName="email"
                  class="w-full md:w-[25rem] text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-600"
                />
              </p-iconfield>

              <p-iconfield class="w-full mb-6">
                <p-inputicon class="pi pi-key" />
                <input
                  pInputText
                  type="password"
                  placeholder="Hasło"
                  formControlName="password"
                  class="w-full md:w-[25rem] text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-600"
                />
              </p-iconfield>

              <p-button
                label="Zaloguj się"
                styleClass="w-full mb-6"
                type="submit"
              ></p-button>
              <a
                href="#"
                class="font-medium text-sm text-surface-300 dark:text-surface-500"
                >Przypomnienie hasła</a
              >
              <p
                class="font-medium text-surface-400 dark:text-surface-400 m-0 mt-12"
              >
                Jeśli nie masz jeszcze konta,
                <a
                  class="text-primary cursor-pointer"
                  [routerLink]="['/auth/register']"
                  >zarejestruj się</a
                >
              </p>
            </div>
          </form>
        </div>
        <div class="flex flex-wrap items-center pb-20 px-6">
          <h4 class="m-0 mr-8" style="line-height: 22px">active store</h4>
          <h6
            class="m-0 font-medium text-surface-300 dark:text-surface-500"
            style="line-height: 17px"
          >
            Copyright Ⓒ Active Code
          </h6>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  uiService = inject(UiService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .login(rawForm.email, rawForm.password)
      .pipe(
        catchError((error) => {
          this.uiService.showToast(
            Severity.Error,
            'Logowanie',
            error.code,
            true,
            'login'
          );

          return throwError(() => error);
        })
      )
      .subscribe();

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(
          ([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''
        ),
        first(),
        tap(([authStatus, user]) => {
          setTimeout(
            () =>
              this.uiService.showToast(
                Severity.Success,
                'Logowanie',
                `Witaj ${user.fullName}! Rola: ${authStatus.userRole}`,
                true,
                'default'
              ),
            2000
          );
          this.router.navigateByUrl('/');
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
