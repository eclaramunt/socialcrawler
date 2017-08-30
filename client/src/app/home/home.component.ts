import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { fbService } from '../_services/fb.service';

@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  constructor(private fbService: fbService) { }

  ngOnInit() {
    console.log(this.fbService.me());
  }
}
