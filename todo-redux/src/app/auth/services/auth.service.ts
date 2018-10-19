import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../shared/models/user.model';

@Injectable()
export class AuthService {
  private serviceUrl: string = 'localhost:3000';

  constructor(private http: HttpClient) { }

  public signIn(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.serviceUrl}/users/login`, user);
    // resp.headers.get('x-auth')
  }

  public signUp(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.serviceUrl}/users`, user);
  }

  public getCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.serviceUrl}/users/me`);
  }

  public logout(): Observable<void> {
     return this.http.delete<void>(`${this.serviceUrl}/users/me/token`);
  }
}
