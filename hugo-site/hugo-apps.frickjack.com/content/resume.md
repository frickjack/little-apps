---
title: "Reuben Pasquini resume"
description: "Reuben Pasquini resume"
---
# Reuben Pasquini

I am a software developer with experience across the web stack from devops to UI to CICD.  I work with a variety of technologies.

I enjoy every aspect of building and operating SaaS systems:
- working with users to design user journeys
- working with a team to deliver and test solutions
- developing processes for CICD and infrastructure as code
- monitoring and measuring live systems against SLOs and KPIs

AI changes the nature of our work.  Spec-driven development turbo-charges productivity, and allows experiments that were too expensive in the past.  Good teams use AI to build maintainable systems and processes, and recognize when to stop a bad idea even if AI gymnastics can make it work.

Chicago

https://github.com/frickjack

https://apps.frickjack.com


## EXPERIENCE

### iManage
principal software engineer
(https://imanage.com) July 2021 - present

71 S. Wacker Drive, Suite 400, Chicago, IL 60606

java maven spring-boot
kubernetes helm argocd
claude-code
github-actions jenkins
EFK prometheus grafana kibana
Azure cosmosdb blob-storage AKS terraform

I work with the customer-onboarding team to develop cloud-based
ETL tools that configure tenants for new customers and
migrate customer data from third party and legacy platforms
into the iManage cloud.

### Center for Translational Data Science at the University of Chicago
software developer and devops; 
Center for Translational Data Science at the University of Chicago
(https://ctds.uchicago.edu/); Aug 2017 - Feb 2021

5454 South Shore Drive
Suite 2A/B
Chicago, IL 60615

reactjs
python
kubernetes
golang
aws terraform

I worked with the plan-X team at CTDS (https://ctds.uchicago.edu) developing the next generation platform for research data commons (see https://medium.com/@rgrossman1/how-data-commons-can-support-open-science-40b0d978d2fb). We generalized and extended the software and automation that drives the Genomic Data Commons (GDC - https://portal.gdc.cancer.gov/), so it can be applied in other research domains and deployed to Kubernetes clusters in both public and private clouds. The technology we worked with varied from Reactjs on the frontend to GraphQL and REST API's on the backend to devops and CICD automation with terraform, kubernetes, and jenkins.

### OpenText Corporation
senior software engineer;
OpenText Corporation (https://opentext.com);
Jan 2014 - Aug 2017

275 Frank Tompa Drive
Waterloo, ON
N2L 0A1
Canada

java
javascript
php
mysql

Our small Optimost developer team worked with a wide variety of technologies to implement and operate Optimost's web-testing capabilities - from a clickstream analytics platform using Apache Storm and the Vertica columnar database, to a legacy PHP backend that we extended with HTTP API's to support new single-page web UI's.


### Bullingdon Research
software consultant;
Bullingdon Research (https://www.quantemplate.com/);
London;
May 2011 - May 2013

scala
javascript
aws
backbone.js

This consulting contract evolved over time. I initially used parts of my littleware open-source project in a web application for interacting with financial models. I developed several custom javascript modules and UI components with scala backends to provide OpenId authentication and SVG charts.

### Nickelodeon Animation Studios
software consultant;
Nickelodeon Animation Studios (https://nick.com);
Jan 2010 - Feb 2011

java
python
jpa
mysql

I aided in the design, development, and test of a prototype distributed workflow support system. A SQL database stored a node-based data model manipulated via APIs served by a J2EE application server. A simple json over HTTP python binding allowed integration with Maya.

### Auburn University Libraries
cataloging software support;
Auburn University Libraries (https://www.lib.auburn.edu/); Auburn, AL; 2007-2011

C# scala oracle

I developed custom cataloging tools, and helped deploy open source discovery and publishing tools.

### Sony Pictures Imageworks
system software developer;
Sony Pictures Imageworks; Culver City, CA; 1999-2007

java perl python oracle postgresql

I led the development of systems for render management, asset tracking, and workflow automation.

## EDUCATION

### Ph.D. Computer Science
Purdue University;
1994 - 1999

At Purdue I carried out research under the guidance of my adviser, Professor Vernon Rego, toward my dissertation: "Algorithms for Improving the Performance of Optimistic Parallel Simulation" (http://docs.lib.purdue.edu/dissertations/AAI9952158/).

The thesis explores methods to decrease the runtime of an optimistic parallel discrete event simulation on a network of workstations.

### B.S. Computer Engineering
University of Illinois;
1990 - 1994

I worked on a senior project with Professor Loui that we eventually filed as a research paper - "A Fault Tolerant Distributed Algorithm for Minimum-Weight Spanning Trees" - http://hdl.handle.net/2142/74575

## OPEN SOURCE

### littleware - various repositories
https://github.com/frickjack

java
scala
typescript
bash

## Common Interview Questions

These are answers to some common interview questions
drawn from https://www.livecareer.com/resources/interviews/questions.

### Describe an important project you worked on.

From https://www.livecareer.com/resources/interviews/questions/describe-an-important-project-you-worked-on

I am proud of many projects I worked on over the years.  A successful project begins as an effort to solve
a user problem, and yields a system that we iterate to deliver progressively more sophisticated solutions.

At CTDS our `gen3` automation system evolved into the cornerstone for our infrastructure provisioning, integration testing, and deployment process.  When I began at CTDS we had terraform scripts for provisioning a kubernetes cluster (pre EKS), and yaml files defining kubernetes resources that we could edit directly to configure a new deployment.  We had one production environment, and the developer team tested individual microservices locally.  When I left the center we ran dozens of production, staging, and qa environments; and each developer had her own prod-like kubernetes dev environment in the cloud.  We developed a gitops deployment process where a project manager pushed new code versions to production with a pull request (PR).  That PR would run through integration tests in a qa environment administered by Jenkins and code review before being merged and deployed.  The `gen3` automation scripts (https://github.com/uc-cdis/cloud-automation/blob/master/doc/README.md) have evolved into an entire suite of tools with many contributors, and continue to evolve as users' needs increase in complexity.

I had a similar experience working on the "global code" for the Optimost project.  Optimost was a SaaS platform for designing, deploying, and analyzing tests on web sites (A/B and mutlivariable tests).  The SaaS software platform was primarily used by our professional-services consultants who worked with a customer's marketing and web site optimization teams to design and run experiments.  Optimost integrated into a customer's web site with a javascript tag to the site (similar to Google Analytics) - we called our tag "global code". When a consultant was ready to deploy a new experiment onto a customer's site, then she would manually modify the global code javascript to add rules to trigger the experiment.  This was a tedious and error-prone process, and automating global-code generation was one of the first projects that I worked on.  The global-code automation became a tool that the entire consulting team relied on, and evolved to take on more responsibilities.

### How do you handle conflict?

https://www.livecareer.com/resources/interviews/questions/interview-question-how-do-you-handle-conflict

Every team has disagreements.
A healthy team builds a culture where
respectful discussions
focus on finding solutions,
and rely on data and experiments.
Teammates are open to compromise,
and accept decisions without rancor.

### Tell me how you handled a difficult situation at work.

https://www.livecareer.com/resources/interviews/questions/tell-me-how-you-handled-a-difficult-situation

I had an experience with an employer that froze
the pay of current employees while still recruiting new hires.
I respectfully let my manager know that I thought we
should prioritize retaining our current employees over
hiring new ones.

Situations like this come up in most workplaces.
Things like team layoffs are frustrating; once, the product I worked on was sold
to a different company.
The best I can do in these situations is
to discuss my concerns with my boss, hope for the best, and finally
accept that some bad things happen despite the best efforts of good people.

### What are your long range career goals?

https://www.livecareer.com/resources/interviews/questions/what-are-your-long-range-career-goals

I intend to continue as an individual contributor.  I enjoy the challenge and comradery of working with a team to design and implement a system.  UX, API, architecture, operations, testing - it's all interesting and challenging and constantly changing.

### What are your strengths and weaknesses?

https://www.livecareer.com/resources/interviews/questions/interview-question-what-are-your-strengths-and-weaknesses

I am good at looking at a system's design wholistically - from
the user experiences to the tools that implement those
experiences to the API's that the tools build on to 
the infrastructure implementing the API's.

I also try to develop code and systems that are easy
to test, deploy, and operate.  I did devops work
at my last job where I saw the value of code that 
is easy to configure, has good test coverage,
allows different versions
to safely co-exist, delivers structured logs, and publishes
monitoring metrics.

I am too conservative in some respects.
I expect systems to fail.
I expect tasks to take longer than others' estimates.
I expect difficult problems to arise in any
ambitious project.

I constantly work on communication.
It can be difficult for a team to embrace a new idea.
Sometimes a campaign of
persuasion and advocacy is necessary to sell an idea
to a team over time - 
discussing the idea with managers one-on-one, 
recruiting allies,
and preparing presentations that show costs and benefits.

Finally, I can improve as a manager - evaluating the performance of teams and products, hiring and firing, tracking task burn-down and schedules, reporting and meeting across the organization hierarchy.

### What’s Your Greatest Failure, And What Did You Learn From It?

https://www.livecareer.com/resources/interviews/questions/what-your-greatest-failure-what-did-you-learn-from-it

I have enjoyed many failures.  One was a consulting job I took
to develop an asset management system.
The project fizzled after one year for a variety
of reasons like ambiguous goals for different stakeholders, 
trying to adapt processes I had experience with from another job to a
different environment, and a water-fall effort to "build a system"
rather than deliver immediate value with simple wins.

I have several ideas about failure that I published in [this bLog](https://blog.frickjack.com/2025/07/succeeding-at-failure.html).
