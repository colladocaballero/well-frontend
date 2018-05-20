import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../../app/auth.guard';
import { DashboardComponent } from './dashboard.component';

export const appRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: "me",
        component: DashboardComponent, canActivate: [AuthGuard]
    }
]);
