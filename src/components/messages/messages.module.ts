import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';

import { messagesRouting } from './messages.routing';
// import { AuthGuard } from './auth.guard';

@NgModule({
    imports: [
        CommonModule,
        messagesRouting
    ],
    declarations: [
        MessagesComponent,
        MessageComponent
    ],
    providers: [
        // AuthGuard
    ]
})

export class MessagesModule {
    
}
