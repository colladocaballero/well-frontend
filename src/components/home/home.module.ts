import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeService } from '../../services/home.service';

import { appRouting } from './home.routing';
import { AuthGuard } from './auth.guard';

@NgModule({
    imports: [
        appRouting
    ],
    declarations: [],
    providers: [
        AuthGuard,
        HomeService
    ]
})

export class HomeModule {
    
}
