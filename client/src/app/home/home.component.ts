import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { fbService } from '../_services/fb.service';
import { AccountService } from '../_services/account.service';

@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  entries = [];
  constructor(private facebookService: fbService, private accountService: AccountService) { }

  addTwitter() {
    console.log('hizo click');
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => {
      accounts.forEach((account: Account) => {
        if (account.isFacebook()) {
          //verifico si esta logueado
          this.facebookService.isLoggin().then(res => {
            this.facebookService.me().then(entries => {
              entries.data.forEach((entry) => {
                //obtengo los attachments para este entry
                this.facebookService.attachments(entry.id).then(attachments => {
                  this.entries.push({
                    title: entry.message,
                    attachments: attachments,
                  })
                })
              })
            })
          })
        }
      })
    })
  }
}
