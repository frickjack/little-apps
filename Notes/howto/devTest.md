# TL;DR

Howto design, develop, test, document, deploy

## Source layout

```
src/@module-group/module/
    bin
    common
    lib
    site
    web
```

* `bin` - compiled into `./commonjs/bin` folder as `commonjs` modules suitable for nodejs applications and lambdas
* `common` - compiled into the `./commonjs/common/` folder as commonjs modules, and also `./web/common/` as es2015 modules
* `lib` - compiled into `./web/lib/`
* `site` - html, nunjucks templates, and other web content compiled into `./site`

## Repository Management

[Angular style](https://medium.com/@menuka/writing-meaningful-git-commit-messages-a62756b65c81) commit messages.

[Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) branch management.  A short-lived branches should rebase (rather than merge) to sync up with the long-lived parent it branches off of.

## Deployment

The build process is setup so that commonjs and web modules are layed out for easy import into other npm packages.  The web content is setup to load code via relative paths when possible, but otherwise assumes javascript modules are deployed under a `/modules/` root.


## Dev-test

See the [buildspec.yml](../../buildspec.yml) [codebuild](https://aws.amazon.com/codebuild/) configuration.

The little-apps project manages the web resources implementing the https://apps.frickjack.com site.  The repo has two parts - javascript (typescript) code that runs in the browser, and a [hugo](https://gohugo.io) theme and content.  

The javascript library of web components, typescript code, and nodejs imports that we build with `npm` and `gulp`:

```
npm run build
npm test
npm run lint
npm audit
npm run stage
```

The `npm test` command runs a [jasmine](https://jasmine.github.io/index.html) test suites for web modules (using [karmajs](http://karma-runner.github.io/4.0/index.html)) and commonjs modules (with jasmine's nodejs runner).

The hugo theme and content are under the `hugo-site/` folder.  The `npm hugo-stage` and `npm hugo-build` scripts stage the littleware javascript code under folder `hugo-site/hugo-apps.frickjack.com/static-little-apps/`.  Once that code is in place, then the normal `hugo` commands can be run from within `hugo-site/hugo-apps.frickjack.com/` folder to test and build the `public/` folder for distribution.

```
npm run hugo-stage
cd hugo-site/hugo-apps.frickjack.com
hugo server
```

## Linting

The `lint` script integrates with [eslint](https://eslint.org/) and [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint).

* https://www.npmjs.com/package/eslint-config-airbnb-typescript
* https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
* https://github.com/typescript-eslint/typescript-eslint

## CICD

The [buildspec.yml](../../buildspec.yml) file defines a [codebuild](https://aws.amazon.com/codebuild/) pipeline that builds and tests code committed to the github repository.

## publish

Before publishing a new version - be sure to update both the [package version](../../package.json) and the [release notes](../reference/releaseNotes.md).

We do not publish this package to npm.

The codebuild CICD pipeline publishes this package to the S3 bucket backing https://apps.frickjack.com when a new git tag is published to github.
```
(
  version="$(jq -r .version < package.json)"
  git tag -a "$version" -m "release details in Notes/reference/releaseNotes.md#$version"
  git push origin $version
)
```
