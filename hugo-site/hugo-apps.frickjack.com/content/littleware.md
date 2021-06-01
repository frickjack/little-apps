---
title: "littleware"
description: "littleware software stack"
---

# little software

Littleware is a suite of tools, API services, and applications developed by Reuben Pasquini over the years to explore various designs and technologies.  The code is all open source and hosted on github.

### automation

The [misc-stuff repository](https://github.com/frickjack/misc-stuff) holds the `little` tools for deploying [cloudformation](https://aws.amazon.com/cloudformation/) stacks and interacting with other cloud and local infrastructure tools.

### little-elements

The [little-elements repository](https://github.com/frickjack/little-elements) tracks typescript code for the [@littleware/little-elements npm package](https://www.npmjs.com/package/@littleware/little-elements) that provides a series of web components, dependency injection, and state-tracking middleware for web and nodejs applications and UX.

### little-authn

The [little-authn repository](https://github.com/frickjack/little-authn) tracks typescript code for the [@littleware/little-authn npm package](https://www.npmjs.com/package/@littleware/little-authn) that implements an OIDC client for a [cognito](https://aws.amazon.com/cognito/) identity provider.  We deploy this service as a [lambda](https://aws.amazon.com/lambda/) function behind an API gateway that this sites login feature relies on.

### littleware

The [littleware repository](https://github.com/frickjack/littleware) is a mono-repo hosting multiple java and scala projects.  Some of the projects provide middleware for dependency injection, configuration management, and using the builder pattern to assemble immutable application state.  Other projects implement services like JWT session management.

### little-apps

The [little-apps repository](https://github.com/frickjack/little-apps) host the [hugo](https://gohugo.io) them and content and the custom web components that define this web site.