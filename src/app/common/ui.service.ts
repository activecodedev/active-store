import { Severity } from '@/types/severity.enum';
import {
  importProvidersFrom,
  inject,
  Injectable,
  makeEnvironmentProviders,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private readonly toast = inject(MessageService);
  // private readonly dialog = inject(MatDialog)

  // private readonly loadState = signalState({ count: 0, isLoading: false })
  // isLoading = computed(() => this.loadState.isLoading())

  // showLoader() {
  //   if (this.loadState.count() === 0) {
  //     patchState(this.loadState, () => ({ isLoading: true }))
  //   }
  //   patchState(this.loadState, (state) => ({ count: state.count + 1 }))
  // }

  // hideLoader() {
  //   patchState(this.loadState, (state) => ({ count: state.count - 1 }))
  //   if (this.loadState.count() === 0) {
  //     patchState(this.loadState, () => ({ isLoading: false }))
  //   }
  // }

  showToast(
    severity: Severity,
    summary: string,
    detail: string,
    sticky = false,
    key = ''
  ) {
    this.toast.add({
      severity,
      summary,
      detail,
      sticky,
      key,
    });
  }

  // showDialog(
  //   title: string,
  //   content: string,
  //   okText = 'OK',
  //   cancelText?: string,
  //   customConfig?: MatDialogConfig
  // ): Observable<boolean> {
  //   const dialogRef = this.dialog.open(
  //     SimpleDialogComponent,
  //     customConfig || {
  //       width: '300px',
  //       data: { title, content, okText, cancelText },
  //     }
  //   )

  //   return dialogRef.afterClosed()
  // }
}

export function provideUiService() {
  return makeEnvironmentProviders([importProvidersFrom(MessageService)]);
}
