import { LoginStatus } from 'ngx-facebook/dist/umd';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { AccountService } from '../_services/account.service';

@Injectable()
export class fbService {
  constructor(private fb: FacebookService, private accountService: AccountService) {
    let initParams: InitParams = {
      appId: '2012751978958165',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  getLoginStatus(): Promise<boolean> {
    return this.fb.getLoginStatus()
      .then((response: LoginStatus) => {
        return response.status === 'connected';
      })
      .catch(e => { return false; })
  }

  addFacebook(): void {
    this.fb.login({ scope: "user_posts", enable_profile_selector: true })
      .then((response: LoginResponse) => {
        console.log(response.authResponse);
        //Obtenida la respuesta, añado la cuenta al servidor
        this.accountService.addAccount({
          type: 'facebook',
          facebook_id: response.authResponse.userID
        })
      })
      .catch((error: any) => console.error(error));
  }

  me(): void {
    this.fb.api('me?fields=albums.limit(5),posts.limit(5)')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
}