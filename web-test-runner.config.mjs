import { playwrightLauncher } from '@web/test-runner-playwright';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';

const interactive = process.env.LITTLE_INTERACTIVE !== 'false';

/**
 * Replicates karma proxies: rewrites short browser-side import paths to
 * their actual node_modules locations served by the WTR dev server.
 *
 * Karma served files under /base/node_modules/...; WTR serves node_modules
 * directly from rootDir, so the equivalent rewrite is fromPrefix -> /node_modules/...
 */
function makeRewriteMiddleware(fromPrefix, toPrefix) {
  return function rewriteMiddleware(context, next) {
    if (context.url.startsWith(fromPrefix)) {
      context.url = toPrefix + context.url.slice(fromPrefix.length);
    }
    return next();
  };
}

export default {
  ...jasmineTestRunnerConfig(),

  // Entry point matching karma's `files` config - testMain.js imports all specs
  files: ['web/lib/testMain.js'],
  nodeResolve: true,
  port: 9876,

  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        // Mirrors karma's ChromeHeadlessNoSandbox custom launcher:
        // headless + --no-sandbox when LITTLE_INTERACTIVE=false
        headless: !interactive,
        args: interactive ? [] : ['--no-sandbox'],
      },
    }),
  ],

  // Watch mode when interactive, single-run when LITTLE_INTERACTIVE=false (CI)
  watch: interactive,

  middleware: [
    // karma: '/i18next' -> '/base/node_modules/i18next'
    makeRewriteMiddleware('/i18next', '/node_modules/i18next'),
    // karma: '/lit-html' -> '/base/node_modules/lit-html'
    makeRewriteMiddleware('/lit-html', '/node_modules/lit-html'),
    // karma: '/@littleware/little-elements' -> '/base/node_modules/@littleware/little-elements'
    makeRewriteMiddleware('/@littleware/little-elements', '/node_modules/@littleware/little-elements'),
    // karma: '/modules/@fortawesome/fontawesome-free' -> '/base/node_modules/@fortawesome/fontawesome-free'
    makeRewriteMiddleware('/modules/@fortawesome/fontawesome-free', '/node_modules/@fortawesome/fontawesome-free'),
    // karma: '/modules/purecss' -> '/base/node_modules/purecss'
    makeRewriteMiddleware('/modules/purecss', '/node_modules/purecss'),
  ],
};
