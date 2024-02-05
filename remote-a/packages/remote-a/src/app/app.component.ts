import { Component, ElementRef, VERSION, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from './core/router.service';

let routerConfigDefined = false
@Component({
   template: '<router-outlet></router-outlet>'
})
export class EntryComponent {

}


@Component({
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `

  <ul>
    <li><a [routerLink]="path">home -link</a></li>
    <li><button (click)="gotTo('plants')">plants -button</button></li>
    <li><a [routerLink]="[path, 'plants']">plants -link</a></li>
    <li><button (click)="gotTo('example', true)">example -for host</button></li>
  </ul>

  <p>remote-a</p>

  <p class="label-version"><strong>Angular v{{version}}</strong></p>

  <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  protected path:string



  protected version = VERSION.full

  constructor(
    private router: Router,
    private elementRef: ElementRef<HTMLElement&{mfe?:{hostRouter?: Router, rootPath?:string, activatedRouteUrl?:string}}>,
    private routerService: RouterService){

    console.log('>>> AppComponent.constructor' )



    const { nativeElement } = this.elementRef
    const {rootPath='', activatedRouteUrl='', hostRouter } = nativeElement.mfe??{}

    this.path = rootPath

    if(!routerConfigDefined) {
      const children = this.router.config
      this.router.resetConfig([{
        children,
        path: rootPath
      }])

      routerConfigDefined = true
    }

    
    this.router.initialNavigation() // necessário iniciar navegação manualmente

    this.routerService.setRootPath(rootPath)

    if(hostRouter) this.routerService.setRootRouter(hostRouter)
    if(activatedRouteUrl) this.router.navigateByUrl(activatedRouteUrl)

  }


  


  gotTo(route:string, host=false){
    if(host) return this.routerService.host.navigateByUrl(route)
    return this.routerService.navigateByUrl(route)
  }
}