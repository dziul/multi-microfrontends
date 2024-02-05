import {
    AfterContentInit,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
  } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
import { loadRemoteModule } from './route.util';

 export interface WrapperComponentRouteConfig {
  remoteEntry:string
  elementName:string
  path:string
 }



  @Component({
    selector: 'host-wrapper',
    template: '<div #vc></div>',
    encapsulation: ViewEncapsulation.ShadowDom
  })
  export class WrapperComponent implements AfterContentInit {
    @ViewChild('vc', { read: ElementRef, static: true })
    vc!: ElementRef;

    constructor(private route: ActivatedRoute, private router:Router) {}

    ngAfterContentInit(): void {
      const elementName = this.route.snapshot.data['elementName'];
      const remoteEntry = this.route.snapshot.data['remoteEntry'];
      const path = this.route.snapshot.data['path'];

      const element = document.createElement(elementName) as HTMLElement & {mfe:{hostRouter: Router, rootPath:string, activatedRouteUrl:string}}

      element.mfe = {
        activatedRouteUrl: this.route.snapshot.url.join('/'),
        hostRouter: this.router,
        rootPath: path
      }

      this.vc.nativeElement.appendChild(element);


      loadRemoteModule({
          remoteEntry,
          exposedModule: './Module',
      }).then(console.log)


    }
  }
