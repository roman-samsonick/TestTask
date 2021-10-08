import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserSearchModule } from 'src/app/modules/user-search/user-search.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    UserSearchModule,
    MatIconModule,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class LayoutModule { }
