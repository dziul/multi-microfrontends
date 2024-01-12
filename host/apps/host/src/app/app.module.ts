import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { startsWith } from './shared/route.util';
import { WrapperComponent, WrapperComponentRouteConfig } from './shared/wrapper.component';



const routes: Routes = [
  {
    matcher: startsWith('remote-a'),
    data:{
      path: 'remote-a',
      elementName: 'remote-a',
      remoteEntry: 'http://localhost:4201/remoteEntry.mjs'
    } as WrapperComponentRouteConfig,

    component: WrapperComponent
  },
  {
    matcher: startsWith('remote-b'),
    data:{
      path: 'remote-b',
      elementName: 'remote-b',
      remoteEntry: 'http://localhost:4202/remoteEntry.mjs'
    } as WrapperComponentRouteConfig,

    component: WrapperComponent
  },
  {
    path: 'example',
    loadChildren: () => import('./features/example/example.module').then(m=>m.ExampleModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m=>m.HomeModule)
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
