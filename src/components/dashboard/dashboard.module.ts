import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { appRouting } from './dashboard.routing';
import { AuthGuard } from '../../app/auth.guard';

@NgModule({
    imports: [
        appRouting
    ],
    declarations: [],
    providers: [
        AuthGuard
    ]
})

export class DashboardModule {
    
}
