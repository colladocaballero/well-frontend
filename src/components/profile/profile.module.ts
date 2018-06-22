import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { profileRouting } from './profile.routing';

import { ProfileComponent } from './profile.component';
import { CommentsComponent } from './comments/comments.component';
import { FriendsComponent } from './friends/friends.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CarouselComponent } from './gallery/carousel/carousel.component';


@NgModule({
	declarations: [
		ProfileComponent,
		CommentsComponent,
		FriendsComponent,
		GalleryComponent,
		CarouselComponent
	],
	imports: [
		CommonModule,
		NgbModule,
		profileRouting
	],
	entryComponents: [
		CarouselComponent
	]
})
export class ProfileModule {
}
