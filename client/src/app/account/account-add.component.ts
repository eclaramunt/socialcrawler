import { AccountService } from '../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { fbService } from '../_services/fb.service';

@Component({
  templateUrl: 'account-add.component.html'
})

export class AccountAddComponent implements OnInit {
  constructor(private accountService: AccountService, private fbService: fbService) { }

  addFacebook() {
    this.fbService.addFacebook();
  }

  me() {
    this.fbService.me();
  }

  ngOnInit() {
    this.fbService.getLoginStatus();
  }

}
