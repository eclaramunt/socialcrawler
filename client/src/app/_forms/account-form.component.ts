import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../_models/account';
import { AccountService } from '../_services/account.service';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';

@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html'
})
export class AccountFormComponent implements OnInit {
  submitted = false;
  model: Account;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FacebookService
  ) {
    let initParams: InitParams = {
      appId: '2012751978958165',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  onSubmit() {
    this.submitted = true;
    this.fb.login({
      enable_profile_selector: true
    })
      .then((response: LoginResponse) => console.log(response))
      .catch((error: any) => console.error(error));
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }

  ngOnInit() {
    this.model = new Account(1, '', '');
  }

}