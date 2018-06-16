import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { CommentsComponent } from './comments/comments.component';

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
    ]
})

export class HomeModule {
    
}
