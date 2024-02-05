import { Injectable } from '@angular/core';
import { NavigationBehaviorOptions, NavigationExtras, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';


/**
 * @todo 
 * - verificar se há possibilidade de fazer um _override_ na diretiva `routerLink` 
 */
@Injectable({
  providedIn: 'root'
})
export class RouterService implements RouterServiceModel {

  private rootPath = ''
  private rootRouter?:Router


  constructor(private router: Router) {}

  


  /**
   * _pathname_ raiz do app. Não deve conter `/` no inicio e nem no final.
   * @param path 
   */
  public setRootPath(path:string){
    this.rootPath = path
  }
  public setRootRouter(router:Router){
    this.rootRouter = router
  }

  navigate(commands: unknown[], extras?: NavigationExtras) {
      return this.router.navigate(commands, extras)
  }

  navigateByUrl(url: string, extras?: NavigationBehaviorOptions){

    const parsedUrl = [this.rootPath, url].filter(Boolean).join('/').replace(/\/+/g, '/')

    return this.router.navigateByUrl(parsedUrl, extras)
  }


  get host(){

    if(!this.rootRouter) throw new Error('`rootRouter` not defined')

    return this.rootRouter
  }

}



abstract class RouterServiceModel {

    abstract navigate:Router['navigate']
    abstract navigateByUrl:Router['navigateByUrl']
}
