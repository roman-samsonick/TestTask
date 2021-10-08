import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface IUserPage {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly items: IUser[];
}

@Injectable()
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getUserPage(page: number, limit: number): Observable<IUserPage> {
    return this.httpClient.get<IUser[]>(`${this.apiUrl}`, {
      params: { _page: page, _limit: limit },
      observe: 'response',
    }).pipe(map(response => ({
      page,
      limit,
      total: Math.ceil(
        Number(response.headers.get('x-total-count')) / limit,
      ),
      items: response.body!,
    })));
  }

  updateOnlineTime(id: string): void {
    this.httpClient.patch(`${this.apiUrl}/${id}`, { onlineTime: new Date() })
      .subscribe();
  }

  findByPartialName(firstName?: string, lastName?: string): Observable<IUser[]> {
    const searchParams = {} as any;

    if (lastName) {
      searchParams.lastName_like = lastName;
    }

    if (firstName) {
      searchParams.firstName_like = firstName
    }

    return this.httpClient.get<IUser[]>(this.apiUrl, { params: searchParams });
  }

  findByUsername(username: string): Observable<IUser | null> {
    return this.findUser({ username });
  }

  removeUser(id: string): Observable<IUser> {
    return this.httpClient.delete<IUser>(`${this.apiUrl}/${id}`);
  }

  findById(id: string): Observable<IUser | null> {
    return this.findUser({ id });
  }

  createUser(user: any): Observable<IUser> {
    return this.httpClient.post<IUser>(this.apiUrl, user);
  }

  updateUser(id: string, user: any): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.apiUrl}/${id}`, user);
  }

  private transformToUserClass(users: IUser[]): IUser | null {
    return users.length
      ? users[0]
      : null;
  }

  private findUser(userPattern: Partial<IUser>): Observable<IUser | null> {
    return this.httpClient.get<IUser[]>(this.apiUrl, { params: userPattern as any })
      .pipe(map(this.transformToUserClass));
  }
}
