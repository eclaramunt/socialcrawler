import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountListComponent } from '../account/account-list.component';
import { AccountDetailComponent } from '../account/account-detail.component';
import { AccountAddComponent } from '../account/account-add.component';

import { AuthGuard } from '../_guards/auth.guards';

const heroesRoutes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/add', component: AccountAddComponent },
  { path: 'account/:id', component: AccountDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }