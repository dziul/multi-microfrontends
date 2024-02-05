import { Component, OnDestroy, OnInit, VERSION, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

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

  <p>{{tick}}</p>

  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {


  protected version = VERSION.full

  protected tick=0
  private subscription = new Subscription()

  constructor(private router: Router){

    console.log('>>> AppComponent.constructor')
  }

  ngOnInit(): void {
    this.router.initialNavigation() // necessário iniciar navegação manualmente

    this.subscription.add(timer(0,1000).subscribe((tick)=>{
        this.tick = tick
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
