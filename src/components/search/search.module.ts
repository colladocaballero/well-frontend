import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { searchRouting } from './search.routing';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        searchRouting
    ],
    providers: []
})

export class SearchModule {

}
