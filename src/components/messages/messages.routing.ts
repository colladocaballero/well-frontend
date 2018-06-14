import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { AuthGuard } from './auth.guard';
import { MessagesComponent } from './messages.component';

export const messagesRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: MessagesComponent
    }
]);
