import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Account } from '../_models/account';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getAccounts(): Observable<Account[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token })
    let user_id = JSON.parse(localStorage.getItem('currentUser')).user;
    return this.http.get(environment.server.base + environment.server.urls.users.accounts.get.replace(':id', user_id), { headers: headers })
      .map(response => Account.fromJSONArray(response.json().data))
  }

  addAccount(object): Promise<Account> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token })
    let user_id = JSON.parse(localStorage.getItem('currentUser')).user;
    return this.http.post(
      environment.server.base + environment.server.urls.users.accounts.get.replace(':id', user_id),
      {
        type: object.type,
        facebook_id: object.facebook_id
      },
      { headers: headers }
    )
      .toPromise()
      .then(response => response.json().data as Account)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}