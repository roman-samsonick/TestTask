import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingOverlayService } from 'src/app/modules/loading-overlay/loading-overlay.service';

@Injectable()
export class LoadingOverlayInterceptor implements HttpInterceptor {
  constructor(
    private readonly loadingOverlayService: LoadingOverlayService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingOverlayService.addLoading();

    return next.handle(req).pipe(
      finalize(() => this.loadingOverlayService.removeLoading()),
    );
  }
}
