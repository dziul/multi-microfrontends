import { Component, OnInit, VERSION, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `

  <ul>
    <li><a routerLink="/">home</a></li>
    <li><a routerLink="/plants">plants</a></li>
  </ul>

  <p>remote-b</p>

  <p class="label-version"><strong>Angular v{{version}}</strong></p>

  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {


  protected version = VERSION.full

  constructor(private router: Router){

    console.log('>>> AppComponent.constructor')
  }

  ngOnInit(): void {
    this.router.initialNavigation() // necessário iniciar navegação manualmente

    // this.router.navigateByUrl('/home')
  }
}
