# Reuben Pasquini

I am a technology agnostic software developer with over twenty years of experience spanning the full web stack.  I began my career implementing custom networking protocols in C++ for distributed simulation and render farm management, and that evolved to working on three-tier systems for workflow and asset management, then microservice cloud architectures and single-page applications.

I enjoy the challenge of building and operating a system that solves a problem for its users, but also recognize that the success of an engineering organization depends not only on the technologies and architecture patterns it employs, but also on the processes it puts in place.  A well-run organization empowers teams to efficiently iterate on a product - to align on goals, design, build, deploy, and ensure the quality of a release, then operate, monitor, measure, and iterate again.  Development processes depend upon a happy team that can evolve over time, as well as recruit, train, retain, reward, and promote the talented individuals that ultimately define the culture of a workplace.  

Finally, the best engineering organization cannot overcome a misunderstanding of what problems a product solves for its users, otherwise the team builds the wrong features, and the product cannot best competitors
with a better understanding of the needs driving the market.  

For me the job is most interesting when it works to keep all these forces
in balance.

Chicago<br/>
https://github.com/frickjack<br/>
https://apps.frickjack.com<br/>
[markdown format](./resume.md)

## EXPERIENCE

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
terraform
golang

I worked with the plan-X team at CTDS (https://ctds.uchicago.edu) developing the next generation platform for research data commons (see https://medium.com/@rgrossman1/how-data-commons-can-support-open-science-40b0d978d2fb). We generalized and extended the software and automation that drives the Genomic Data Commons (GDC - https://portal.gdc.cancer.gov/), so it can be applied in other research domains and deployed to Kubernetes or similar clusters in both public and private clouds. The technology we worked with varied from Reactjs on the frontend to swagger/openapis defined public facing GraphQL and REST API's driven by python code on the backend to devops 
 and CICD automation with terraform, kubernetes, and jenkins.


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

I worked on the full life cycle (design, develop, test, deploy) developing Optimost (https://www.opentext.com/products-and-solutions/products/customer-experience-management/opentext-marketing-optimization/opentext-optimost) (formerly of HP). The small Optimost developer team worked with a wide variety of technologies to implement Optimost's web-testing capabilities - from a clickstream analytics platform using Apache Storm and Vertica, to a legacy PHP backend that we extended with HTTP API's to support new single-page web UI's using Backbone.js - working with tools like git, jenkins, Chef, maven, nodejs, gulp, less, and Docker to automate as much as we could.


### Bullingdon Research
software consultant;
Bullingdon Research (https://www.quantemplate.com/);
London;
May 2011 - May 2013

scala
javascript
amazon-web-services
backbone.js

This consulting contract evolved over time. I initially used parts of my littleware open-source project in a web application for interacting with financial models. I developed several custom javascript modules and UI components with scala backends to provide OpenId authentication and SVG charts. We deployed to AWS beanstalk.

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

I worked on systems for render management, asset tracking, and workflow automation.

## EDUCATION

### Ph.D. Computer Science
Purdue University;
1994 - 1999

At Purdue I carried out research under the guidance of my adviser, Professor Vernon Rego, toward my dissertation: "Algorithms for Improving the Performance of Optimistic Parallel Simulation" (http://docs.lib.purdue.edu/dissertations/AAI9952158/).

The thesis explores various methods to decrease the runtime of an optimistic parallel discrete event simulation system on a network of workstations or other distributed platform.

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

I am proud of many projects I have worked on over the years, but I will only touch on a couple of efforts from my most recent jobs.  A successful project begins as an effort to solve
a problem for an internal or external user where I
am given the opportunity to explore the solution space
either singly or with a small team, and yields a system
that grows over time as we iterate to 
deliver more sophisticated solutions to users.

At CTDS our `gen3` automation system evolved into the 
cornerstone for our infrastructure provisioning,
integration testing, and deployment process.
When I began at CTDS we had terraform scripts
for provisioning a kubernetes cluster (pre EKS), and
yaml files defining kubernetes resources that we could edit directly to configure a new deployment.  We had one 
production environment, and the developer team tested
individual microservices locally.
By the time I left the center we ran dozens of
production, staging, and qa environments; and
each developer had her own prod-like kubernetes dev environment in the cloud.
We developed a gitops deployment process where a project
manager could push new code versions to production via a pull request (PR).
That PR would run through integration tests in a qa environment
administered by Jenkins and
code review before being merged and deployed.  The `gen3` automation scripts (https://github.com/uc-cdis/cloud-automation/blob/master/doc/README.md) have
evolved into an entire suite of tools with many contributors,
and continue to evolve as users' needs increase in complexity.
I am proud of the part I played in establishing this system
that developer and devops teams rely on in their daily work.

I had a similar experience working on the "global code"
for the Optimost project
at HP (who sold the product to OpenText in 2016 - https://techcrunch.com/2016/04/18/opentext-acquires-hp-customer-experience-content-management-for-170-million/).  Optimost (https://www.opentext.com/products-and-solutions/products/customer-experience-management/opentext-marketing-optimization/opentext-optimost)
was a SaaS platform for designing, deploying, and analyzing tests on web sites (A/B and mutlivariable tests).  The SaaS software 
platform was primarily used by our team of consultants 
who would work with a customer's marketing and web site optimization teams to design and run experiments.
Optimost integrated into a customer's web site by adding
a javascript tag to the site (similar to how Google Analytics and other systems work) - we called our tag "global code".
When a consultant was ready to deploy a new experiment
onto a particular page of a customer's site, then she would
manually modify the global code javascript to add rules
to trigger the experiment, and load the experiment's
execution code onto the page.  This was a tedious and 
error-prone process, and our lead consultant had been advocating for
years that we automate global code generation.  
That was one of the first projects that I took on when
I started at HP, and that system became a tool that the
entire consulting team relied on, and evolved over time
to take on more responsibilities.

The `gen3` and `global code` systems not only 
made their users more productive, but they also 
reduced the rate of errors, since we replaced
tedious error-prone manual processes with automated processes
that had extensive test suites and QA testing to 
ensure things worked reliably.


### How do you handle conflict?

https://www.livecareer.com/resources/interviews/questions/interview-question-how-do-you-handle-conflict

Disagreement is a natural and common occurrence in
a healthy team. 
If a team is functioning well, then its members know and trust
each other, and they can disagree and argue respectfully
without worrying about bruised egos. 
In that kind of team each member can 
assume the good intentions of all parties,
accept the probability that he is wrong, and 
explore opportunities to reach a better solution.

The best outcome of an argument 
is when the team reaches consensus.
Often conflicts arise due to differences in priorities -
deciding what to do next, and what to put off for another day.
Often there is not an obvious right or wrong answer -
should the team spend the next quarter paying down
technical debt, or start on a new feature?
Should a new service try a new NOSQL database, or
should it use the SQL database that the team is familiar with?
Ideally data drives the discussion - for example, if
feature A is more frequently used than feature B, then
work on feature A should take priority.

It is easy for an organization to set up
unhealthy processes between teams.
For example - a developer team might function
well within itself, but when representatives
of the dev team meet with leaders from the marketing
team to discuss strategy with the product manager -
the resulting team of leaders might not share the
same good will that the separate dev and marketing
teams develop internally through daily work.
One stakeholder (marketing and sales) might want more
features while engineering wants to work on architectural
changes to the platform - which priority should take
precedence?  It is easy for an adversarial dynamic to develop,
and the "culture" of the company (systems of rewards or upper management values and background) might mean that marketing always wins (or vice versa).  Shadow systems can arise where
team leaders individually lobby the product manager over
lunch.  It is up to management to 
ensure that the concerns of different stakeholders are
balanced in accordance with a transparent value system,
and to force the use of data in decision-making when possible.
In the example above, 
if a cost estimate can be put on delaying technical work
(decreased stability, scalability limits, operator time)
and compared to the cost of delaying a feature
(how much more revenue would the feature drive),
then the data can drive the discussion.

### Tell me how you handled a difficult situation at work.

https://www.livecareer.com/resources/interviews/questions/tell-me-how-you-handled-a-difficult-situation

I usually find a situation difficult if it negatively affects
me or my team, and I do not have the power to provide a remedy.
For example, during the pandemic the University of Chicago 
froze salaries and discontinued matching contributions 
to retirement accounts to help whether the
financial crisis.  This was understandable,
and would have been fine with me if
it were not for the fact that the center I worked for 
(under the university) was flush with
cash from new contracts, and was 
recruiting new hires.  This situation where our
management simultaneously celebrated the center's
success while asking us to work for less
pay than the previous year made the
center's management appear hypocritical. 
I expressed this sentiment clearly and respectfully
to my managers, and
also indirectly to our upper management via
a question submission channel that was available to us.
In the end the center's management was powerless to
change the university-level policy, and was not
willing to entertain alternative forms of compensation,
so I was left with the choice to either accept the
temporary pay cut or leave the center.
I chose to accept the pay cut.

Situations like this come up in
most workplaces.  I have been frustrated on occasion
with things like external consultants and team
layoffs; once, the product I worked on got sold.
I think the best I can do in these situations is
to clearly and respectfully express my concerns and
questions to my boss, then hope for the best, and finally
accept that some bad things happen despite peoples' best effort,
and that is ok if
good things are the norm.


### What are your long range career goals?

https://www.livecareer.com/resources/interviews/questions/what-are-your-long-range-career-goals

I intend to continue as an individual contributor
for as long as possible.
I enjoy the challenge and comraderie of working with
a team to design and implement every
aspect of a system - user experience,
API, backend architecture, operations model,
testing and qa - it's all interesting
and challenging and constantly changing.

I am not well suited for many
managerial tasks - evaluating teammates,
hiring and firing,
tracking task burndown and schedules, reporting
and meeting across the organization hierarchy.


### What are your strengths and weaknesses?

https://www.livecareer.com/resources/interviews/questions/interview-question-what-are-your-strengths-and-weaknesses

I like to think that I am good
at looking at a system's design holistically - from
the user experiences to the tools that implement those
experiences to the API's that the tools build on to 
the infrastructure implementing the API's.
It is easy for developers to fall into the trap of
designing features that merely extend the existing
system, and miss or avoid other approaches
that provide a better end user experience at the cost of
more development work.

I also try to develop code and systems that are easy
to test, deploy, and operate.  I did devops work
at my last job where I saw the value of code that 
is easy to configure, has good test coverage,
allows different versions
to safely co-exist, delivers structured logs, and publishes
monitoring metrics.

I am probably too conservative in some respects.
I expect systems to fail.
I expect tasks to take longer than others' estimates.
I expect difficult problems to arise in any
ambitious project.

I can also improve the way I communicate ideas.
I have a tendency to believe that if an idea is obviously good,
then all I need to do is share it with the group,
and we will quickly reach a consensus.
In fact many ideas take time
for a team to embrace, and may require resources that
are not available.  Sometimes a campaign of
persuasion and advocacy is necessary to sell an idea
to a team over time - 
discussing the idea with managers one-on-one, 
recruiting allies,
and preparing formal presentations that show costs and benefits.
