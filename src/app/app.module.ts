import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(solid);

import { AppComponent } from './app.component';
import { LoginNavbarComponent } from '../components/navbars/login-navbar/login-navbar.component';
import { HomeNavbarComponent } from '../components/navbars/home-navbar/home-navbar.component';
import { RegisterComponent } from '../components/register/register.component';

import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';

import { routing, appRoutingProviders } from './app.routing';

import { AuthGuard } from './auth.guard';

@NgModule({
	declarations: [
		AppComponent,
		LoginNavbarComponent,
		HomeNavbarComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [
		appRoutingProviders,
		ConfigService,
		UserService,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
