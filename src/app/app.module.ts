import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginNavbarComponent } from '../components/navbars/login-navbar/login-navbar.component';
import { HomeNavbarComponent } from '../components/navbars/home-navbar/home-navbar.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';

import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';

import { HomeModule } from '../components/home/home.module';

import { routing, appRoutingProviders } from './app.routing';
import { appRouting } from '../components/home/home.routing';

import { AuthGuard } from './auth.guard';

@NgModule({
	declarations: [
		AppComponent,
		LoginNavbarComponent,
		HomeNavbarComponent,
		RegisterComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		HomeModule,
		appRouting
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
