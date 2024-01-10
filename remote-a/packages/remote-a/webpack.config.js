const { withModuleFederation } = require('@nrwl/angular/module-federation');

module.exports = withModuleFederation({
  name: 'remote-a',
  exposes: {
    './Module': 'packages/remote-a/src/remote-bootstrap.ts',
  },
});
