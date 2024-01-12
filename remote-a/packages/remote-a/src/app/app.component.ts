import { Component, Input, OnInit, VERSION, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `

  <ul>
    <li><a [routerLink]="path">home</a></li>
    <li><a [routerLink]="path + '/plants'">plants</a></li>
  </ul>

  <p>remote-a</p>

  <p class="label-version"><strong>Angular v{{version}}</strong></p>

  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {

  @Input() path=''



  protected version = VERSION.full

  constructor(private router: Router){

    console.log('>>> AppComponent.constructor')


    

  }

  ngOnInit(): void {


    this.router.resetConfig([{
      path: this.path,
      pathMatch: 'full',
      loadChildren: () => import('./features/home').then(m=>m.HomeModule)
    },
    {
      path: this.path + '/plants',
      loadChildren: () => import('./features/plants').then(m=>m.PlantsModule)
    }])

    this.router.initialNavigation() // necessário iniciar navegação manualmente
    this.router.navigateByUrl(this.path)

    // this.router.navigateByUrl('/home')
  }
}
