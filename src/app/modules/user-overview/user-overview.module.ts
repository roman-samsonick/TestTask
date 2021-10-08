import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ShortNamePipe } from './short-name.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserDeleteConfirmationComponent } from './user-list/user-delete-confirmation/user-delete-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    ShortNamePipe,
    UserDeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class UserOverviewModule { }
