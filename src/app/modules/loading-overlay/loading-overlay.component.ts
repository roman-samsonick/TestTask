import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingOverlayService } from 'src/app/modules/loading-overlay/loading-overlay.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.sass'],
})
export class LoadingOverlayComponent implements OnInit{
  constructor(
    private readonly loadingOverlayService: LoadingOverlayService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get isLoading(): Observable<boolean> {
    return this.loadingOverlayService.isLoading;
  }

  ngOnInit(): void {
    this.loadingOverlayService.isLoading.subscribe(() => this.changeDetectorRef.detectChanges());
  }
}
