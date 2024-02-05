import { ApplicationRef, Component, DoBootstrap, NgModule, inject } from '@angular/core';
import { BrowserModule, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent, EntryComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@Component({
  template: `
    <h1>Not Found!</h1>
  `
})
class EmptyComponent{}



const routes:Routes = [
  {
    path: 'plants',
    loadChildren: () => import('./features/plants').then(m=>m.PlantsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/home').then(m=>m.HomeModule)
  },
  
  {
    path: '**',
    component: EmptyComponent
  }
]


@NgModule({
  declarations: [AppComponent, EntryComponent],
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
