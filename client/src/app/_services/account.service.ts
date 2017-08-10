import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Account } from '../_models/account';

import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  fb(): void {
    this.http.post('http://localhost:3000/users/1/accounts', {}).toPromise().then(response => console.log(response))
  }

  getAccounts(): Promise<Account[]> {
    return this.http.get(environment.server.base + environment.server.urls.accounts.get)
      .toPromise()
      .then(response => response.json().data as Account[])
      .catch(this.handleError);
  }

  createAccount(account: Account): Promise<Account> {
    return this.http.post(environment.server.base + environment.server.urls.accounts.get, account)
      .toPromise()
      .then(response => response.json().data as Account)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}