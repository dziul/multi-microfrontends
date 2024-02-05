import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BambuComponent } from "./bambu.component";

@NgModule({
    imports: [RouterModule.forChild([{
        path: '',
        component: BambuComponent
    }])]
})
export class BambuModule{}