import { Component } from '@angular/core';

import { Account } from '../_models/account';

@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html'
})
export class AccountFormComponent {
  submitted = false;
  model = new Account(1, '', '');

  onSubmit() {
    this.submitted = true;

  }

}