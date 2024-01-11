import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  styleUrls: ['./app.component.css'],
  template: `

  <ul>
    <li><a routerLink="/">home</a></li>
    <li><a routerLink="/plants">plants</a></li>
  </ul>

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
