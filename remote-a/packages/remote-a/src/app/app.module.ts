import { ApplicationRef, Component, DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    path: '',
    loadChildren: () => import('./features/home').then(m=>m.HomeModule)
  },
  {
    path: 'plants',
    loadChildren: () => import('./features/plants').then(m=>m.PlantsModule)
  },
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

  ngDoBootstrap(appRef: ApplicationRef ): void {
    const customElement = createCustomElement(AppComponent, {
      injector: appRef.injector
    })

    customElements.define('remote-a', customElement)
  }
}
