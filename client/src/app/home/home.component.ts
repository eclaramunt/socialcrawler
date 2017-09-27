import { attachEmbeddedView } from '@angular/core/src/view';
import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { fbService } from '../_services/fb.service';
import { AccountService } from '../_services/account.service';
import { TwitterService } from '../_services/twitter.service';

@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  entries = [];
  constructor(
    private facebookService: fbService,
    private accountService: AccountService,
    private twitter: TwitterService
  ) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => {
      accounts.forEach((account: Account) => {
        if (account.isFacebook()) {
          // verifico si esta logueado
          this.facebookService.isLoggin().then(res => {
            this.facebookService.me().then(entries => {
              entries.data.forEach((entry) => {
                // obtengo los attachments para este entry
                this.facebookService.attachments(entry.id).then(attachments => {
                  this.entries.push({
                    type: 'facebook',
                    title: entry.message,
                    attachments: attachments,
                    created_at: entry.created_time
                  })
                })
              })
            })
          })
        } else {
          // se trata de una cuenta de twitter
          this.twitter.getTwitters().subscribe(res => {
            res.forEach((entry) => {
              let attachments = []
              if (entry.entities.media) {
                attachments = [entry.entities.media[0].media_url]
                this.entries.push({
                  type: 'twitter',
                  title: entry.text,
                  attachments: attachments,
                })
              }
            })
          })
        }
      })
    })
  }
}
