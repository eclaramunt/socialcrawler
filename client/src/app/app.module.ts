import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// rutas
import { routing } from './app.routing';

// interceptores
import { AuthGuard } from './_guards/auth.guards';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// services
import { AuthenticationService } from './_services/authentication.services';
import { fbService } from './_services/fb.service';
import { TwitterService } from './_services/twitter.service';

// modules
import { AccountsModule } from './_modules/accounts.module';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AccountsModule,
    routing,
    FacebookModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    fbService,
    TwitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
