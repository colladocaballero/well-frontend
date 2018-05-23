import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';

import { AuthGuard } from './auth.guard';

const appRoutes:Routes = [
    {path: '', component: RegisterComponent, canActivate: [AuthGuard]}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
