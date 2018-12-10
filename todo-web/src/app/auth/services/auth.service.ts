import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '../../shared/models/user.model';

@Injectable()
export class AuthService {
  private serviceUrl: string = 'localhost:3000';

  constructor(private http: HttpClient) { }

  public signIn(user: UserModel): Observable<HttpResponse<UserModel>> {
    return this.http.post<UserModel>(`${this.serviceUrl}/users/login`, user, {observe: 'response'});
  }

  public signUp(user: UserModel): Observable<HttpResponse<UserModel>> {
    return this.http.post<UserModel>(`${this.serviceUrl}/users`, user, {observe: 'response'});
  }

  public getCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.serviceUrl}/users/me`);
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`${this.serviceUrl}/users/me/token`);
  }
}