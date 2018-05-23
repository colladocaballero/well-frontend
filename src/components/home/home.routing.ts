import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home.component';

export const appRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: "home",
        component: HomeComponent, canActivate: [AuthGuard]
    }
]);
