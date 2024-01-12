import {
    AfterContentInit,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
  } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
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

    constructor(private route: ActivatedRoute) {}

    ngAfterContentInit(): void {
      const elementName = this.route.snapshot.data['elementName'];
      const remoteEntry = this.route.snapshot.data['remoteEntry'];
      const path = this.route.snapshot.data['path'];

      const element = document.createElement(elementName) as HTMLElement

      element.setAttribute('path', path)

      this.vc.nativeElement.appendChild(element);


      loadRemoteModule({
          remoteEntry,
          exposedModule: './Module',
      }).then(console.log)


    }
  }
