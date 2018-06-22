import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginNavbarComponent } from '../components/navbars/login-navbar/login-navbar.component';
import { HomeNavbarComponent } from '../components/navbars/home-navbar/home-navbar.component';
import { RegisterComponent } from '../components/register/register.component';
import { NewMessageComponent } from '../components/messages/new-message/new-message.component';
import { UploadPhotoComponent } from '../components/navbars/home-navbar/upload-photo/upload-photo.component';
import { ChangeProfilePictureComponent } from '../components/home/change-profile-picture/change-profile-picture.component';

import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { HomeService } from '../services/home.service';
import { MessagesService } from '../services/messages.service';

import { routing, appRoutingProviders } from './app.routing';

import { AuthGuard } from './auth.guard';
import { PhotosService } from '../services/photo.service';
import { CommentsService } from '../services/comments.service';
import { FriendRequestsService } from '../services/friend-requests.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginNavbarComponent,
		HomeNavbarComponent,
		RegisterComponent,
		NewMessageComponent,
		UploadPhotoComponent,
		ChangeProfilePictureComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgbModule.forRoot()
	],
	providers: [
		appRoutingProviders,
		ConfigService,
		UserService,
		HomeService,
		MessagesService,
		PhotosService,
		CommentsService,
		FriendRequestsService,
		AuthGuard,
		NgbModal,
		NgbActiveModal
	],
	bootstrap: [AppComponent],
    entryComponents: [
		NewMessageComponent,
		UploadPhotoComponent,
		ChangeProfilePictureComponent
	]
})
export class AppModule { 
	constructor() {
		fontawesome.library.add(solid);
	}
 }
