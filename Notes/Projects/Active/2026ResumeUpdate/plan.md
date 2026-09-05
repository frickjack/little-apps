title:	update resume
state:	OPEN
author:	frickjack (Reuben Pasquini)
labels:	
comments:	0
assignees:	
projects:	
milestone:	
issue-type:	
parent:	
sub-issues:	
sub-issues-completed:	
blocked-by:	
blocking:	
number:	51
--
Here's my feedback on your resume with specific improvements to strengthen your appeal for principal software engineer roles.

## Overall Assessment

Your resume has solid content but reads more like a LinkedIn profile than a targeted resume. Principal SE roles demand evidence of technical leadership, system-scale thinking, and measurable impact. Right now it undersells both.

---

## High-Priority Improvements

**1. Replace the intro paragraph with a tighter summary**

The current intro is conversational. Rewrite it as 3-4 punchy sentences that establish seniority immediately:

```
Principal software engineer with 25+ years building distributed systems at scale — 
from data commons infrastructure serving genomic research to cloud ETL platforms 
onboarding enterprise customers. Specializes in Kubernetes-native architectures, 
developer tooling, and GitOps practices. Comfortable at every layer: system design, 
API contracts, CI/CD pipelines, and production observability.
```

**2. Add metrics and scope to your most recent roles**

Right now iManage says "I work with the customer-onboarding team to develop cloud-based ETL tools." That could describe a mid-level contributor. Answer: how many tenants? what scale? what impact?

Example rewrite:
```
Lead architect and developer for cloud-based ETL platform that onboards enterprise 
customers and migrates data from legacy systems into iManage's Kubernetes-hosted cloud. 
Reduced tenant onboarding time by X%. Established GitOps deployment patterns with 
ArgoCD. Integrated AI-assisted development (Claude Code) into team workflows.
```

If you don't have numbers handy, approximate — "dozens of enterprise tenants", "multi-TB migrations", etc.

**3. CTDS role needs the same treatment**

The gen3 story in your interview Q&A section is your strongest accomplishment. It's buried. Move the substance of that answer into the CTDS job entry itself:

```
Evolved the gen3 automation system from basic Terraform scripts into a full GitOps 
platform supporting 30+ production, staging, QA, and developer environments. Enabled 
project managers to deploy new versions via PR-driven workflows with automated 
integration testing. Contributed to what became a widely-adopted open-source 
infrastructure toolkit (cloud-automation, 500+ commits).
```

**4. Consolidate and reformat tech stacks**

Long strings of keywords buried in job entries are hard to scan. Either:
- Add a **Skills** section at the top with grouped categories (Languages, Infrastructure, Observability, etc.)
- Or move the tech lists to a subtle footnote style per role

Example Skills section:
```
Languages:      Java, TypeScript, Python, Go, Scala
Infrastructure: Kubernetes, Terraform, Helm, ArgoCD, AWS, Azure
Observability:  Prometheus, Grafana, Kibana, EFK stack
CI/CD:          GitHub Actions, Jenkins
Databases:      CosmosDB, PostgreSQL, Oracle, MySQL
```

---

## Medium-Priority Improvements

**5. Cut or significantly trim the Interview Q&A section**

This is unusual and risky. Most hiring managers and ATS systems won't know what to do with it. The genuine value in it (the gen3 story, your wholistic systems thinking) should be extracted and moved into the appropriate job entries or your summary. The conflict/failure/weakness answers belong in an interview, not a resume.

If you want to keep a version of this for your personal site (which is where this lives), that's fine — but a PDF/submitted version should omit it entirely.

**6. Strengthen the "Principal" signal throughout**

The title "principal software engineer" appears at iManage, but nothing else signals that level of seniority. Consider adding:
- Any mentions of mentoring or technical leadership
- Architectural decisions you drove
- Any cross-team influence (standards, tooling adopted by other teams)
- Any open-source contributions with meaningful usage

**7. Sony Pictures Imageworks deserves more**

You *led* development of render management, asset tracking, and workflow automation at a major VFX studio for 8 years. That's technically interesting and shows longevity. Even a brief expansion helps:

```
Led development of render farm management systems handling hundreds of concurrent jobs 
for feature film production. Built asset tracking and workflow automation tools used 
daily by production teams across multiple films.
```

---

## Minor Improvements

**8. Location and contact info**

Add your email address. GitHub and site are good, but no email is a friction point.

**9. OPEN SOURCE section**

"various repositories" with a GitHub link does nothing. Either list 2-3 specific projects with a one-line description, or cut it.

**10. The AI paragraph**

The current AI paragraph in your intro is thoughtful but reads as hedging ("recognize when to stop a bad idea"). For principal roles, lean into your actual experience with it — you list `claude-code` in your tech stack, which is genuinely differentiating right now. Make that specific.

---

## Structure Suggestion

```
Name + Location + Email + GitHub + Site
─────────────────────────────────────────
Summary (3-4 sentences, seniority-forward)
─────────────────────────────────────────
Skills (grouped, scannable)
─────────────────────────────────────────
Experience
  - iManage (expanded, metric-rich)
  - CTDS (expanded, gen3 story)
  - OpenText (current length is fine)
  - Earlier roles (condensed to 2-3 lines each)
─────────────────────────────────────────
Education
─────────────────────────────────────────
Open Source (2-3 named projects or remove)
```

The gen3 automation work and the iManage ETL platform are your two strongest technical stories. Both are currently undersold. Getting those right will make the biggest difference.
