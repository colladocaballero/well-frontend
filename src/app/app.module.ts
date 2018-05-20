import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeNavbarComponent } from '../components/navbars/home-navbar/home-navbar.component';
import { DashboardNavbarComponent } from '../components/navbars/dashboard-navbar/dashboard-navbar.component';
import { RegisterComponent } from '../components/register/register.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';

import { DashboardModule } from '../components/dashboard/dashboard.module';

import { routing, appRoutingProviders } from './app.routing';
import { appRouting } from '../components/dashboard/dashboard.routing';

@NgModule({
	declarations: [
		AppComponent,
		HomeNavbarComponent,
		DashboardNavbarComponent,
		RegisterComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		DashboardModule,
		appRouting
	],
	providers: [
		appRoutingProviders,
		ConfigService,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
