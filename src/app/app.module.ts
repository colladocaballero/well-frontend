import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeNavbarComponent } from '../components/navbars/home-navbar/home-navbar.component';
import { DashboardNavbarComponent } from '../components/navbars/dashboard-navbar/dashboard-navbar.component';
import { RegisterComponent } from '../components/register/register.component';

import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
	declarations: [
		AppComponent,
		HomeNavbarComponent,
		DashboardNavbarComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	providers: [
		appRoutingProviders,
		ConfigService,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
