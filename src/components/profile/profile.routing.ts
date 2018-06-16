import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

export const profileRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ProfileComponent
    }
]);
