import { AccountService } from '../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';

@Component({
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    constructor(private accountService: AccountService) { }
    accounts: Account[];

    getAccounts(): void {
        this.accountService
            .getAccounts()
            .then(accounts => this.accounts = accounts);
    }

    ngOnInit() {
        this.getAccounts();
    }
}
