import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-confirmation',
  templateUrl: './user-delete-confirmation.component.html',
  styleUrls: ['./user-delete-confirmation.component.sass'],
})
export class UserDeleteConfirmationComponent {
  constructor(
    private readonly matDialogRef: MatDialogRef<any>,
  ) {
  }

  confirm(): void {
    this.matDialogRef.close(true);
  }

  close(): void {
    this.matDialogRef.close(false);
  }
}
