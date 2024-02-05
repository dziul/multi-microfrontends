const { withModuleFederation } = require('@nrwl/angular/module-federation');
module.exports = withModuleFederation({
  name: 'host',
  shared: (libraryName, sharedConfig) => {
    // const {requiredVersion} = sharedConfig
    // return { requiredVersion, version: requiredVersion,  singleton:false }

    const { requiredVersion } = sharedConfig
    return { requiredVersion, version:requiredVersion,  singleton:false }

  }
});
