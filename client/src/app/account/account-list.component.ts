import { AccountService } from '../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';

@Component({
    templateUrl: 'account-list.component.html'
})

export class AccountListComponent implements OnInit {
    accounts: Account[] = [];

    constructor(private accountService: AccountService) { }

    getAccounts(): void {
        this.accountService
            .getAccounts()
            .then(accounts => this.accounts = accounts);
    }

    ngOnInit() {
        this.getAccounts();
    }
}
