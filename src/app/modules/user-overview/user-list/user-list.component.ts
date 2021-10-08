import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IUserPage, UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/models/user.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteConfirmationComponent } from 'src/app/modules/user-overview/user-list/user-delete-confirmation/user-delete-confirmation.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements AfterViewInit {
  @ViewChild('paginator') readonly paginator!: MatPaginator;

  readonly dataSource = new MatTableDataSource<IUser>([]);
  readonly displayedColumns = this.admin
    ? ['index', 'image', 'name', 'role', 'actions', 'create']
    : ['index', 'image', 'name'];

  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService,
    private readonly matDialog: MatDialog,
  ) {
  }

  get admin(): boolean {
    return this.loginService.user.role === 'admin';
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(switchMap(this.fetchPage))
      .subscribe(this.setUserPage);

    this.paginator.page.emit({ pageSize: 10, pageIndex: 0, length: 1 });
  }

  removeUser(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.matDialog.open(UserDeleteConfirmationComponent)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.removeUserById(id));
  }

  private removeUserById = (id: string) => {
    this.userService.removeUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
    });
  };

  private fetchPage = (page: PageEvent): Observable<IUserPage> => {
    return this.userService.getUserPage(page.pageIndex, page.pageSize);
  };

  private setUserPage = (page: IUserPage): void => {
    this.dataSource.data = page.items;
    this.paginator.length = page.total;
  };
}
