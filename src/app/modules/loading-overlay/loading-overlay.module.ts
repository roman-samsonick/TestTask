import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingOverlayInterceptor } from 'src/app/modules/loading-overlay/loading-overlay.interceptor';
import { LoadingOverlayService } from 'src/app/modules/loading-overlay/loading-overlay.service';


@NgModule({
  declarations: [
    LoadingOverlayComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    LoadingOverlayComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingOverlayInterceptor,
      multi: true,
    },
    LoadingOverlayService,
  ],
})
export class LoadingOverlayModule {
}
