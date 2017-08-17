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

// modules
import { AccountsModule } from './_modules/accounts.module';
import { FacebookModule } from 'ngx-facebook';

// materialize-css
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';

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
    FacebookModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    fbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
