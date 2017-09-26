import { LoginStatus } from 'ngx-facebook/dist/umd';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class TwitterService {
  constructor(private http: Http) {
  }
  
  getTwitters() {
    const headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token })
    const user_id = JSON.parse(localStorage.getItem('currentUser')).user;
    return this.http.get(
      environment.server.base + environment.server.urls.users.accounts.twitters.replace(':id', user_id), { headers: headers })
      .map(response => response.json().data)
  }
}
