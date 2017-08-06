import { AccountService } from '../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';

@Component({
  templateUrl: 'account-add.component.html'
})

export class AccountAddComponent {
  constructor(private accountService: AccountService) { }

}
