const { withModuleFederation } = require('@nrwl/angular/module-federation');
module.exports = withModuleFederation({
  name: 'host',
  shared: (libraryName, sharedConfig) => {

    return {...sharedConfig, singleton:false }

  }
});
