import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';

import { AuthGuard } from './auth.guard';

const appRoutes:Routes = [
    {path: '', component: RegisterComponent, canActivate: [AuthGuard]},
    {
        path: 'home',
        loadChildren: '../components/home/home.module#HomeModule'
    },
    {
        path: 'messages',
        loadChildren: '../components/messages/messages.module#MessagesModule'
    }
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
