import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoadingOverlayService {
  private isLoadingState = new BehaviorSubject(0);

  addLoading(): void {
    this.isLoadingState.next(this.isLoadingState.value + 1);
  }

  removeLoading(): void {
    this.isLoadingState.next(this.isLoadingState.value - 1);
  }

  get isLoading(): Observable<boolean> {
    return this.isLoadingState.pipe(
      map(value => value > 0),
    );
  }
}
