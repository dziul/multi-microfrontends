const { withModuleFederation } = require('@nrwl/angular/module-federation');

module.exports = withModuleFederation({
  name: 'remote-a',
  exposes: {
    './Module': 'packages/remote-a/src/remote-bootstrap.ts',
  },
  shared: (libraryName, sharedConfig) => {

    // if(libraryName.startsWith('@angular/')) return false

    const { requiredVersion } = sharedConfig
    return { requiredVersion, version:requiredVersion,  singleton:false}

  }
});
