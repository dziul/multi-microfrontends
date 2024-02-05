import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsComponent } from './plants.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PlantsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:  'bambu',
        loadChildren: () => import('./bambu/bambu.module').then(m=>m.BambuModule)
      },
      {
        path: '',
        component: PlantsComponent,
      },
    ])
  ]
})
export class PlantsModule { }
