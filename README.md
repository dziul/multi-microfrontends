# multi-microfrontends

uma _POC_ referente utilização de multi micro-frontends usando module-federation.

| projeto | framework/lib | porta |
| --- | --- | --- |
| host | Angular v14.x | 4200 |
| remote-a | Angular v15.x | 4201 |

### A fazer / Anotações

- [x] teste de conversão para  _Custom Element_ os projetos _REMOTES_ Angular. ([Angular elements overview](https://angular.io/guide/elements))
  - [x] em `app.module.ts` remote o `AppComponent` de `bootstrap`
  - [x] adiciona em `index.html` remove o antigo e declara a nova tag html que foi definida em `app.module.ts`
  - [x] cria `remote-bootstrap.ts` e o inclui em `files` no arquivo `tsconfig.app.json`.
  - [x] expõem `remote-bootstrap.ts` no `webpack.config.js`
  - o arquivo final será `../remoteEntry.mjs`, esse nome é fixo usando o `withModuleFederation` de `@nrwl/angular/module-federation`.
    > a proposta inicial é não mexer ou adicionar depedencias extras.
- [x] mescla dados de `module-federation.config.js` com `webpack.config.js`. Depois remove `module-federation.config.js`
- [ ] teste de host (angular 14.x) consumindo um remote (15.x) com versão superior do framework Angular

  esse teste serve para ver como se comparta quando o _HOST_ possui uma versão menor do _REMOTE_ consumido
- [ ] teste de integração de rotas entre mfes
- [ ] teste de armazenamento de dados entre mfes sem usar o escopo global `window`

### Referencias

- https://www.npmjs.com/package/@angular-architects/module-federation-tools
- https://github.com/adrianiskandar/ModuleFederationWebComponents
- [código fonte](https://github.com/nrwl/nx/blob/master/packages/angular/src/utils/mf/with-module-federation.ts#L6) do recurso `withModuleFederation` de `@nx/angular/module-federation`
- [código fonte](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf-runtime/src/lib/loader/dynamic-federation.ts) do recurso `dynamic-federation` de `@angular-architects/module-federation-tools`