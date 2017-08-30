import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { fbService } from '../_services/fb.service';
import { AccountService } from '../_services/account.service';

@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  constructor(private fbService: fbService, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccounts().then(accounts => {
      
      accounts.forEach(function (account: Account) {
        let ac = account as Account;
        console.log(ac.getEntries());

        let ac2 = new Account();
        console.log(ac2.getEntries());
      })
    })
  }
}
