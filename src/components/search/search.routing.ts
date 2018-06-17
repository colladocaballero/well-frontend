import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SearchComponent } from "./search.component";

export const searchRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: SearchComponent
    }
]);
