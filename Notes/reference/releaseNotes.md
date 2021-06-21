# TL;DR

Some basic information on our tagged releases.
Note - `git log tag1...tag2` shows the commit log between versions.

## 1.6.0

* move header out to little-elements with integrated hamburger menu
* migrate to fontawesome 5+
* setup topic tiles on hugo homepage and tile shortcodes
* transition to [eslint](https://eslint.org/) and [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

## 1.5.1

* move to cloudformation managed bucket and cloudfront distribution

## 1.5.0

* transition to [hugo](https://gohugo.io)


## 1.4.5

* bump versions - pickup some fixes
* add config-.json files
* analytics load site-id from appcontext config

## 1.4.4

* add answers to common interview questions to resume

## 1.4.3

* add some meta-description tags
* upgrade codebuild image to nodejs 14
* tweak karma config for new codebuild
* update little-elements to 1.1.2
* remove redundant print CSS rules (now in little-elements)

## Version 1.4.2

* add `@media print` CSS rules to header
* new resume intro

## Version 1.4.1

* bump to `little-elements:1.1.1` to pickup `Loading ...` spinner

## Version 1.4.0

* introduce `appContext`: i18n, sharedState, eventBus, configuration
* introduce `authMgr` authentication UX
* introduce markdown resume
* move tests off homepage - link like an app


