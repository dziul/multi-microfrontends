# multi-microfrontends

uma _POC_ referente utilização de multi micro-frontends usando module-federation.

| projeto | framework/lib |
| --- | --- |
| host | Angular v14.x |
| remote-a | Angular v15.x |


### desenvolvimento

| projeto | script |  porta | |
| --- | --- | --- | --- |
| host | `npm run dev` | 4200 | |
| remote-a | `npm run dev` | 4201 | |
| remote-aa | `npm run dev` | 4202 | mesma versão e framework usado em "remote-a" |


## Registro

- executado `npx -y create-nx-workspace@^<version>`. [saiba mais](https://nx.dev/getting-started/intro)
- executado `npm install @nrwl/angular@^<version>`. [saiba mais](https://nx.dev/nx-api/angular)
- executado `npx nx g @nx/angular:remote <app-name>`. [saiba mais](https://nx.dev/concepts/module-federation/micro-frontend-architecture)
- projeto "remote-a" possui o angular v15.2.0 e "remote-b" possui v15.2.10.

  - Testado que não importa o numero MAJOR, MINOR, PATH da versão haverá erro de Angular ao carregar ao uso do
   `platformBrowserDynamic`. Isso com o compartilhamento dos modulos `@angular/*` habilitado.
    
    Ao remover o compartilhando dos modulos `@angular/*`, deixou de dar os erros.
  - os apps angulares que são do tipo _remote_, em `app.component.ts` add na configuração `encapsulation: ViewEncapsulation.ShadowDom`. Deixar o componente com _shadow dom_
    
    Em AppModule no seu `constructor` aplicar o trecho `inject(ɵDomSharedStylesHost).removeHost(window.document.head)`, para remover os estilos do remote _shadow dom_ do header do _HOST_. (parece ser um bug do Angular, com o _shadow dom_ opção)

### A fazer / Anotações

- [x] teste de conversão para  _Custom Element_ os projetos _REMOTES_ Angular. ([Angular elements overview](https://angular.io/guide/elements))
  - [x] em `app.module.ts` remote o `AppComponent` de `bootstrap`
  - [x] adiciona em `index.html` remove o antigo e declara a nova tag html que foi definida em `app.module.ts`
  - [x] cria `remote-bootstrap.ts` e o inclui em `files` no arquivo `tsconfig.app.json`.
  - [x] expõem `remote-bootstrap.ts` no `webpack.config.js`
  - o arquivo final será `../remoteEntry.mjs`, esse nome é fixo usando o `withModuleFederation` de `@nrwl/angular/module-federation`.
    > a proposta inicial é não mexer ou adicionar depedencias extras.
- [x] mescla dados de `module-federation.config.js` com `webpack.config.js`. Depois remove `module-federation.config.js`
- [x] criar/adaptar algorítimo para carregamento de módulo remote. [código de referencia](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf-runtime/src/lib/loader/dynamic-federation.ts)
- [x] teste de host (angular 14.x) consumindo um remote (15.x) com versão superior do framework Angular

  esse teste serve para ver como se comparta quando o _HOST_ possui uma versão menor do _REMOTE_ consumido
  - [x] testar integração de remotes com compartilhamento habilitado das deps
    _falha ao usar dep `@angular/*` de mesmo numero MAJOR da versão entre remote. Solução evitar de compartilhar esses deps._
- [ ] teste de integração de rotas entre mfes
  - [x] teste para passar o _path_ para uso interno do mfe. se concatenado. ao carregar aplicar as rotas com os paths atualizados
  - [ ] proposta é criar um serviço que consome esse 'prefix' _path_
- [ ] teste de armazenamento de dados entre mfes sem usar o escopo global `window`

### Referencias

- https://www.npmjs.com/package/@angular-architects/module-federation-tools
- https://github.com/adrianiskandar/ModuleFederationWebComponents
- [código fonte](https://github.com/nrwl/nx/blob/master/packages/angular/src/utils/mf/with-module-federation.ts#L6) do recurso `withModuleFederation` de `@nx/angular/module-federation`
- [código fonte](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf-runtime/src/lib/loader/dynamic-federation.ts) do recurso `dynamic-federation` de `@angular-architects/module-federation-tools`
- [Multi-Framework and -Version Micro Frontends with Module Federation: The Good, the Bad, the Ugly](https://www.angulararchitects.io/en/blog/multi-framework-and-version-micro-frontends-with-module-federation-the-good-the-bad-the-ugly/)