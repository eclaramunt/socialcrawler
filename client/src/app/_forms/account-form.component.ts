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
  model: Account;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FacebookService
  ) { }

  cancel() {
    this.router.navigate(['/accounts']);
  }

  ngOnInit() {
  }

}