class WebpackCustomPlugin {
  apply(compiler) {
    // compiler.resolverFactory.hooks.resolver.for('loader').tap('WebpackCustomPlugin', (resolver) => {
    //   resolver.hooks.resolve.tap('WebpackCustomPlugine', (request, resolveContext, callback) => {
    //     console.log('Hello from WebpackCustomPlugin!');
    //     callback();
    //   });
    // });
    compiler.hooks.normalModuleFactory.tap('WebpackCustomPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.beforeResolve.tap('WebpackCustomPlugin', (resolveData) => {
        if (resolveData) {
          console.log(`Processing file: ${resolveData.request}`);
        }
        return true;
      });
    });
  }
}

module.exports = {
  WebpackCustomPlugin,
};
