import { ApplicationRef, Component, DoBootstrap, NgModule, inject } from '@angular/core';
import { BrowserModule, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';


@Component({
  template: `
    <h1>Not Found!</h1>
  `
})
class EmptyComponent{}



const routes:Routes = [
  {
    path: '**',
    component: EmptyComponent
  }
]


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { scrollPositionRestoration: 'top' }
    ),
  ],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(){

    inject(ɵDomSharedStylesHost).removeHost(window.document.head)
    
  }

  ngDoBootstrap(appRef: ApplicationRef ): void {

    const customElement = createCustomElement(AppComponent, {
      injector: appRef.injector
    })

    customElements.define('remote-a', customElement)
  }
}
