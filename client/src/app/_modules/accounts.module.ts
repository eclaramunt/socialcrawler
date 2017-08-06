import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountListComponent } from '../account/account-list.component';
import { AccountDetailComponent } from '../account/account-detail.component';
import { AccountAddComponent } from '../account/account-add.component';
import { AccountFormComponent } from '../_forms/account-form.component';

import { AccountService } from '../_services/account.service';
import { AccountRoutingModule } from '../_routers/accounts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountListComponent,
    AccountDetailComponent,
    AccountAddComponent,
    AccountFormComponent
  ],
  providers: [AccountService]
})
export class AccountsModule { }