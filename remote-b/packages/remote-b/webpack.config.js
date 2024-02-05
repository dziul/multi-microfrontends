const { withModuleFederation } = require('@nrwl/angular/module-federation');

module.exports = withModuleFederation({
  name: 'remote-b',
  exposes: {
    './Module': 'packages/remote-b/src/bootstrap-remote.ts',
  },
  shared: (libraryName, sharedConfig) => {

    // if(libraryName.startsWith('@angular/')) return false

    const { requiredVersion } = sharedConfig
    return { requiredVersion, version:requiredVersion,  singleton:false }

  }
});
