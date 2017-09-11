import { AccountService } from '../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { fbService } from '../_services/fb.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: 'account-add.component.html'
})

export class AccountAddComponent implements OnInit {
  constructor(private accountService: AccountService, private fbService: fbService, private activatedRoute: ActivatedRoute) { }

  addFacebook() {
    this.fbService.addFacebook();
  }

  me() {
    this.fbService.me();
  }

  ngOnInit() {
    this.fbService.isLoggin();
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      let token = params['oauth_token']
      let oauth_verifier = params['oauth_verifier']
      if (token !== undefined && oauth_verifier != undefined) {
        console.log('tengo token y verificacion del mismo');
      }
    });
  }
}
