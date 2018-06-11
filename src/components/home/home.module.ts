import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeService } from '../../services/home.service';
import { CommentsComponent } from './comments/comments.component';
import { CommentsService } from '../../services/comments.service';

import { appRouting } from './home.routing';
import { AuthGuard } from './auth.guard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        appRouting
    ],
    declarations: [
        HomeComponent,
        CommentsComponent
    ],
    providers: [
        AuthGuard,
        HomeService,
        CommentsService
    ]
})

export class HomeModule {
    
}
