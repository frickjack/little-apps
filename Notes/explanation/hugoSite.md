# TL;DR

A review of our transition of https://apps.frickjack.com to [hugo](https://gohugo.io).

## Problem and Audience

A web site may be architected in various ways: from a simple collection of static html, javascript, and css files behind a web server; to a site administered by a content management system; to a web application built on custom server or client side software.  

The appropriate design for a particular site is the one that best balances the requirements of the site's different stakeholders.  For example, the marketing team may primarily view the site as one part of customer relationship management (CRM).  The customer support team might want to publish documentation to the site, or provide tools for a customer to request support.  The product team may want the site to provide access to the product's user console application.

Each stakeholder may need to update the site in different ways.  The marketing and customer support teams may require a simple mechanism to submit edits for review and publication.  The product development team may want to build and test code updates with a CICD pipeline.  Neither of those teams may be well versed in graphic design.

## apps.frickjack.com and hugo

We just completed a project to transition https://apps.frickjack.com to the [hugo](https://gohugo.io) static site generator.  The https://apps.frickjack.com property acts both as my personal site and as a sandbox for experimenting with the littleware software stack.  It is a static multi-page site served from an S3 bucket with a few small javascript web applications and some early integrations with web API's.  

The hugo transition allowed us to move the content and theme management for https://apps.frickjack.com from an idiosynchratic templating system to the well documented and community supported process that hugo implements.  Hugo's theme design also pushed us to think about what we want the site to provide to its visitors, and whether the landing page clearly conveys those use cases.  For example, https://www.salesforce.com/ has a straight forward explanation of what the company is, "the #1 CRM ...", and a call to action "sign up for your free account".

The content management process is still developer oriented in that site updates are managed via github pull requests, and a [codebuild](https://aws.amazon.com/codebuild/) CI job updates the site, but the content markdown and theme templates are now managed in their own hugo directory hierarchy.  The site's github repo includes more details at https://github.com/frickjack/little-apps/blob/master/Notes/howto/devTest.md.

## Summary

We transitioned https://apps.frickjack.com to the [hugo](https://gohugo.io) static site generator to further decouple the site's content and theme management from the javascript code implementing the dynamic services and applications on the site.  We also reorganized the site to better support the experiences we want the site to provide to visitors.
