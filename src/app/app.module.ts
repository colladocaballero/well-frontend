import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from '../components/register/register.component';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
	declarations: [
	AppComponent,
	RegisterComponent
	],
	imports: [
	BrowserModule,
	routing
	],
	providers: [
	appRoutingProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
