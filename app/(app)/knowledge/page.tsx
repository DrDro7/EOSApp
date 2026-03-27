"use client";

import { useState } from "react";
import { Search, BookOpen, ChevronRight, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { KnowledgeArticle } from "@/types";

const ARTICLES: KnowledgeArticle[] = [
  // ── EOS Fundamentals ──────────────────────────────────────────────────────
  {
    id: "1",
    title: "What is EOS?",
    slug: "what-is-eos",
    category: "EOS Fundamentals",
    content: `The Entrepreneur Operating System (EOS) is a complete set of simple concepts and practical tools that help entrepreneurs get what they want from their businesses. Developed by Gino Wickman and detailed in his book Traction, EOS has been used by over 200,000 companies worldwide.

EOS is built on the belief that most business problems stem from three core issues: lack of vision alignment, people in the wrong seats, and poor execution discipline. The system addresses all three through a consistent set of tools run on a 90-day cycle called the Quarterly Pulse.

At its core, EOS asks leadership teams to answer three questions: Are we all seeing the same thing? Do we have the right people? Are we getting things done? The entire framework is designed to make the answer to all three a confident "yes."

EOS works best for companies with 10–250 employees led by entrepreneurial leadership teams willing to be open, honest, and disciplined. It is not a software tool or a consulting engagement — it is an operating system you run yourself, optionally supported by an EOS Implementer.`,
    tags: ["eos", "overview", "fundamentals", "traction", "wickman"],
    readTime: 5,
  },
  {
    id: "2",
    title: "The 6 Key Components of EOS",
    slug: "six-components",
    category: "EOS Fundamentals",
    content: `EOS organises every business challenge into six interdependent components. Mastering all six is what creates a truly healthy, growing organisation.

**1. Vision** — Everyone in the company must be 100% on the same page about where the organisation is going and how it plans to get there. This is captured in the Vision/Traction Organizer (V/TO).

**2. People** — You need the right people in the right seats. Right people share your core values. Right seats means they Get it, Want it, and have the Capacity to do it (the GWC filter).

**3. Data** — Run your business on facts and numbers, not feelings and opinions. This means a weekly Scorecard with 5–15 measurable KPIs, each with a weekly goal and an owner.

**4. Issues** — All businesses have problems. EOS gives you a discipline for surfacing, prioritising, and solving issues permanently using the IDS process (Identify, Discuss, Solve).

**5. Process** — Documenting your core processes creates consistency, scalability, and freedom. EOS calls these your "Way" — the Hiring Way, the Marketing Way, the Operations Way.

**6. Traction** — Vision without execution is hallucination. Traction is about discipline and accountability. It is built through Rocks (90-day priorities) and the Level 10 Meeting rhythm.

Strengthening all six components simultaneously is what the EOS journey is about. The Six-Component Assessment helps teams identify their weakest links.`,
    tags: ["eos", "components", "vision", "people", "data", "issues", "process", "traction"],
    readTime: 6,
  },
  {
    id: "3",
    title: "The Vision/Traction Organizer (V/TO)",
    slug: "vto-explained",
    category: "EOS Fundamentals",
    content: `The V/TO is a two-page strategic plan that captures everything the leadership team needs to be aligned on. It replaces 40-page strategic plans that nobody reads.

**Side 1 — Vision** answers the question "where are we going?"

- **Core Values** (3–7): the rules of your culture — non-negotiable behaviours you hire, fire, review, and reward on.
- **Core Focus**: your Niche (what you do best) and your Purpose/Cause/Passion (why you exist).
- **10-Year Target**: a big, bold, single number or statement that paints a picture of the future.
- **Marketing Strategy**: your Target Market, Three Uniques, Proven Process, and Guarantee.
- **3-Year Picture**: what does the business look like in three years? Describe it in vivid detail with 5–15 measurable goals.
- **1-Year Plan**: 3–7 SMART goals that represent the most important things to accomplish this year.

**Side 2 — Traction** answers "how do we get there?"

- **Quarterly Rocks** (3–7 per person): the most important 90-day priorities for the company and each leader.
- **Issues List**: the long-term issues that don't belong in a weekly meeting but need attention.

The V/TO should be a living document. It is reviewed and updated every quarter at the Quarterly Meeting and formally revisited every year at the Annual Meeting.`,
    tags: ["vto", "vision", "strategy", "core-values", "10-year-target"],
    readTime: 7,
  },
  {
    id: "4",
    title: "Core Values: Finding and Living Them",
    slug: "core-values",
    category: "EOS Fundamentals",
    content: `Core values are the 3–7 rules of your culture. They are not aspirational — they describe behaviours that already exist in your best people. They are the DNA of your organisation.

**How to discover your core values:**
1. Think of three people in your company who, if you could clone them, would make the business perfect.
2. List 5–10 attributes those people share.
3. Cluster similar attributes and find the common thread.
4. Give each cluster a simple name — ideally 1–4 words with a short descriptor.

**How to use them:**
- **Hiring**: screen candidates against each value using behavioural interview questions.
- **Firing**: when someone consistently violates a core value, that is grounds for exit regardless of performance.
- **Reviews**: the People Analyser scores every person against each value quarterly.
- **Recognition**: call out great examples of core values in action publicly.

**Common mistakes:**
- Choosing values you wish were true rather than values that already exist.
- Having too many (more than 7 becomes noise).
- Never reinforcing them — values must be spoken weekly, not posted annually.

Strong core values make every people decision easier. When someone does not share your values, no amount of talent makes them a fit.`,
    tags: ["core-values", "culture", "hiring", "people"],
    readTime: 5,
  },
  {
    id: "5",
    title: "Rocks: Executing Your 90-Day Priorities",
    slug: "rocks-explained",
    category: "EOS Fundamentals",
    content: `Rocks are the 3–7 most important things that must be accomplished in the next 90 days. The name comes from Steven Covey's metaphor: if you fill a jar with sand first, there is no room for rocks — but if you place the rocks first, everything else settles around them.

**Why 90 days?**
Research shows that humans can maintain focus and urgency for about 90 days. Shorter cycles lack strategic weight; longer cycles lose momentum. The quarterly cadence matches the EOS meeting rhythm.

**Rock criteria — SMART:**
- Specific: one clear deliverable, not a vague theme.
- Measurable: you can answer "is this done?" with yes or no.
- Attainable: stretch goals that are realistic.
- Relevant: directly tied to the 1-Year Plan.
- Time-bound: a clear due date (end of quarter).

**Company Rocks vs. Individual Rocks:**
The leadership team sets 3–7 Company Rocks first, then each leader owns 3–7 of their own Rocks. Every Rock must have a single owner — shared ownership is no ownership.

**Rock status:**
Every week in the Level 10 Meeting, each owner reports their Rock as "On Track" or "Off Track." Off-Track Rocks become Issues. On Track does not mean the Rock is done — it means the owner is confident it will be done by the quarter end.

**Common mistakes:**
- Too many Rocks (more than 7 per person creates paralysis).
- Rocks that are really ongoing tasks, not projects.
- No weekly check-in, so problems surface too late.`,
    tags: ["rocks", "priorities", "execution", "90-day", "quarterly"],
    readTime: 6,
  },
  {
    id: "6",
    title: "The Accountability Chart",
    slug: "accountability-chart",
    category: "EOS Fundamentals",
    content: `The Accountability Chart is EOS's version of an org chart, but with one critical difference: it shows accountability (who owns what outcomes), not just reporting lines.

**Structure:**
The chart has three seats at the top — Visionary, Integrator, and (optionally) a third seat for companies that need it. Below that, each major function of the business (Sales, Marketing, Operations, Finance, HR) has its own seat.

**Visionary vs. Integrator:**
The Visionary is typically the founder — big ideas, external focus, culture, relationships. The Integrator runs the company day-to-day — executes the vision, resolves conflicts, manages the leadership team. In most companies, one person is trying to do both, and that creates chaos.

**Right Seats:**
For each seat, you define the 5 major Roles (responsibilities) and whether the current person in that seat Gets it, Wants it, and has the Capacity to do it (GWC). A person who GWCs a seat is in the right seat.

**How to build one:**
1. Draw the structure the business needs to succeed (ignore current people).
2. List the 5 roles for each seat.
3. Place names in seats only after the structure is right.
4. One person can hold multiple seats in a small company — but each seat still needs a clear accountability.

Every person in the company should be able to draw the Accountability Chart from memory and point to their own seat.`,
    tags: ["accountability-chart", "org-structure", "visionary", "integrator", "seats"],
    readTime: 6,
  },

  // ── Scorecard & Meetings ──────────────────────────────────────────────────
  {
    id: "7",
    title: "Building Your Weekly Scorecard",
    slug: "scorecard-setup",
    category: "Scorecard & Meetings",
    content: `Your Scorecard is a weekly snapshot of 5–15 numbers that give you an objective pulse on your business. It replaces opinion-based status updates with data.

**What belongs on the scorecard:**
- Activity metrics: calls made, proposals sent, jobs started, appointments booked.
- Result metrics: revenue collected, units shipped, new customers signed.
- Health metrics: customer satisfaction score, on-time delivery rate, support ticket backlog.

**Scorecard rules:**
1. Each number has a single owner — the person accountable, not just responsible.
2. Each number has a weekly goal — a number that represents healthy performance.
3. Numbers are entered weekly before the L10 Meeting.
4. Any number that misses goal for two consecutive weeks is dropped into the Issues List.

**What does NOT belong:**
- Lagging indicators you can't act on weekly (annual revenue, long-term retention).
- Vanity metrics that make you feel good but don't drive decisions.
- Metrics with no clear owner.

**Designing the right numbers:**
Work backwards from your 1-Year Plan. If your annual goal is 500 new customers, your weekly new-customer number should be ~10. If it is 7 for three weeks running, that is an early warning signal — not a crisis discovered in month 11.

Review the entire Scorecard quarterly. Numbers that are consistently green should be replaced by metrics that challenge the business to improve further.`,
    tags: ["scorecard", "kpis", "metrics", "weekly", "l10"],
    readTime: 6,
  },
  {
    id: "8",
    title: "The Level 10 Meeting (L10)",
    slug: "level-10-meeting",
    category: "Scorecard & Meetings",
    content: `The Level 10 Meeting is EOS's weekly leadership team meeting. It runs 90 minutes every week, same day, same time, same agenda. When teams run it well, they rate it a 10 out of 10 — hence the name.

**The L10 Agenda (90 minutes):**

1. **Segue** (5 min): Each person shares one personal and one business good news. Transitions the team from individual contexts into the meeting.

2. **Scorecard review** (5 min): Each owner reports their number. Anything off goal for 2+ weeks drops to Issues.

3. **Rock review** (5 min): Each Rock owner says "On Track" or "Off Track." Off-track Rocks drop to Issues.

4. **Customer/Employee headlines** (5 min): Any notable feedback — good or bad — about customers or employees.

5. **To-Do list review** (5 min): Review last week's to-dos. Each one is "Done" or "Not Done." Not Done items become Issues.

6. **IDS — Issues Solving** (60 min): The most important part. The team works through the Issues List using the IDS method (Identify → Discuss → Solve).

7. **Conclude** (5 min): Recap to-dos created, rate the meeting 1–10, and cascade any messages to the wider team.

**Keys to a great L10:**
- Start on time, end on time — every week.
- Separate reporting from solving (the agenda enforces this).
- Trust is required to surface real issues. If the team avoids putting real problems on the list, the meeting will not work.`,
    tags: ["l10", "meetings", "agenda", "weekly-meeting", "ids"],
    readTime: 7,
  },
  {
    id: "9",
    title: "IDS: Identify, Discuss, Solve",
    slug: "ids-process",
    category: "Scorecard & Meetings",
    content: `IDS is the issue-solving process at the heart of every EOS meeting. It is deceptively simple and reliably effective when followed with discipline.

**Identify:**
State the real issue — not the symptom. The presenting problem is rarely the root cause. Ask "what is really going on here?" before jumping to solutions. Write the issue in one sentence on the Issues List. The person who identified it states it clearly; the team confirms they all understand what is being discussed.

**Discuss:**
Open dialogue — all relevant facts, perspectives, and context on the table. No solutions yet. The facilitator's job is to keep discussion focused on the issue, not drift into adjacent topics. Most issues resolve themselves at this stage once the team has the same information.

**Solve:**
Agree on the solution and assign a to-do. A to-do must have: one owner, one action, one due date (usually next week). If a to-do is not enough — if the issue will recur — it becomes a Rock for the next quarter.

**Common failure modes:**
- Jumping to Solve before everyone has the same information (skipping Discuss).
- Solving the symptom rather than the root cause.
- Creating a to-do with multiple owners — that is no owner.
- Never crossing an issue off the list because the team can not commit to a solution.

Good IDS discipline means the same issues do not keep reappearing on the list month after month.`,
    tags: ["ids", "issues", "problem-solving", "meetings"],
    readTime: 5,
  },
  {
    id: "10",
    title: "Quarterly and Annual EOS Meetings",
    slug: "quarterly-annual-meetings",
    category: "Scorecard & Meetings",
    content: `Beyond the weekly L10, EOS prescribes two other meeting types that drive the 90-day rhythm.

**The Quarterly Meeting (1 day, off-site):**

1. Review previous quarter's Rocks — celebrate wins, learn from misses.
2. Review and update the V/TO — is the 3-Year Picture still right? Does the 1-Year Plan need adjusting?
3. Identify and solve the top 3–7 company-wide Issues.
4. Set Rocks for the coming quarter.
5. Review the Accountability Chart — are all seats filled with the right people?

The off-site format matters. Being away from the office signals that this is strategic time, not operational time.

**The Annual Meeting (2 days, off-site):**

1. Review the previous year's goals.
2. Revisit every section of the V/TO — Core Values, Core Focus, 10-Year Target, Marketing Strategy.
3. Build a detailed 3-Year Picture and 1-Year Plan for the coming year.
4. Reset Rocks for Q1.
5. Review the People component — who has grown, who is struggling, what seats need to change.

**Why off-site matters:**
The environment changes the conversation. Being outside the building makes it easier to think long-term, challenge assumptions, and have difficult people conversations.

Most teams that skip the quarterly cadence find themselves drifting — solving the same issues repeatedly and failing to execute on the annual goals they set.`,
    tags: ["quarterly", "annual", "meetings", "off-site", "planning"],
    readTime: 6,
  },

  // ── KPI Frameworks ────────────────────────────────────────────────────────
  {
    id: "11",
    title: "Choosing the Right KPIs for Your Business",
    slug: "choosing-kpis",
    category: "KPI Frameworks",
    content: `Most companies track too many metrics and act on too few. Good KPIs are not just data points — they are decision triggers.

**The three criteria for a good KPI:**
1. **Actionable**: when the number moves, you know what to do. If you look at a number and shrug, it does not belong on your scorecard.
2. **Leading**: prefer metrics that predict future outcomes over metrics that report past results. New leads this week is leading; closed deals this month is lagging.
3. **Owned**: one person is accountable for each number. No shared ownership.

**The KPI hierarchy:**
- **Company KPIs** (3–5): the numbers that define success for the whole business. Revenue, customer count, NPS, on-time delivery rate.
- **Departmental KPIs** (3–7 per department): the numbers each team uses to manage its own health.
- **Individual KPIs** (1–3 per person): the specific activities or outcomes each person owns.

**Common KPI mistakes:**
- Tracking vanity metrics (social followers, page views) that feel good but do not drive decisions.
- Picking metrics that are easy to measure rather than metrics that matter.
- Not reviewing the list quarterly — stale KPIs create false confidence.
- Setting goals without historical baseline data.

**Starting from scratch:**
If you are new to KPIs, start with five: revenue, new customers, customer satisfaction, gross margin, and one activity metric for your biggest constraint. Add complexity only after you have mastered the basics.`,
    tags: ["kpis", "metrics", "measurement", "scorecard", "leading-indicators"],
    readTime: 6,
  },
  {
    id: "12",
    title: "SaaS Metrics: The Complete Guide",
    slug: "saas-metrics",
    category: "KPI Frameworks",
    content: `SaaS businesses have a unique financial model that requires a specific set of metrics. Understanding these numbers is essential for evaluating health and making investment decisions.

**Revenue metrics:**
- **MRR (Monthly Recurring Revenue)**: the predictable, normalised monthly revenue from subscriptions. The north star for SaaS growth.
- **ARR (Annual Recurring Revenue)**: MRR × 12. Used for fundraising and benchmarking.
- **ARPU (Average Revenue Per User)**: MRR ÷ active customers. Tracks monetisation efficiency over time.
- **Expansion MRR**: revenue from upsells and upgrades in a given month.

**Growth metrics:**
- **MRR Growth Rate**: (New MRR + Expansion MRR − Churned MRR) ÷ Beginning MRR. Healthy early-stage SaaS grows 10–20% month-over-month.
- **New Logo Growth**: new paying customers added per month.

**Retention metrics:**
- **Gross Churn Rate**: (Cancelled MRR ÷ Beginning MRR) × 100. Best-in-class is under 2% monthly.
- **Net Revenue Retention (NRR)**: (Beginning MRR + Expansion − Contraction − Churn) ÷ Beginning MRR × 100. NRR above 100% means you grow from existing customers alone.
- **Logo Churn**: % of customers (not revenue) who cancel. Can differ significantly from revenue churn.

**Unit economics:**
- **CAC (Customer Acquisition Cost)**: total sales and marketing spend ÷ new customers acquired.
- **LTV (Lifetime Value)**: ARPU × Gross Margin % ÷ Monthly Churn Rate.
- **LTV:CAC ratio**: the health ratio of your go-to-market engine. 3:1 or higher is sustainable. Under 1:1 means you lose money on every customer.
- **CAC Payback Period**: CAC ÷ (ARPU × Gross Margin %). Should be under 12 months for B2C, under 18 months for B2B.

**Engagement metrics:**
- **DAU/MAU ratio**: daily active users ÷ monthly active users. Above 20% signals strong habit formation.
- **Feature Adoption Rate**: % of customers using a specific feature.`,
    tags: ["saas", "mrr", "arr", "churn", "ltv", "cac", "nrr", "metrics"],
    readTime: 9,
  },
  {
    id: "13",
    title: "The Pirate Metrics Framework (AARRR)",
    slug: "pirate-metrics",
    category: "KPI Frameworks",
    content: `The AARRR framework — coined by Dave McClure — organises every metric into five stages of the customer journey. It is called "Pirate Metrics" because of its acronym.

**Acquisition** — How do people find you?
Track: visitors by channel, cost per lead, organic vs paid mix. Focus on the channels with the lowest CAC and highest conversion.

**Activation** — Do people have a good first experience?
The "aha moment" — the point at which a user first experiences the core value of your product. Track: trial-to-paid conversion, onboarding completion rate, time to first value.

**Retention** — Do people come back?
Track: DAU, WAU, MAU, cohort retention curves. A leaky bucket (high churn) makes every acquisition dollar wasteful.

**Revenue** — How do you make money?
Track: MRR, ARPU, expansion revenue, conversion from free to paid. Revenue is not the goal at every stage — in early growth, activation and retention come first.

**Referral** — Do users tell others?
Track: Net Promoter Score, referral programme conversion, viral coefficient (K-factor). The most capital-efficient growth lever.

**How to use it:**
1. Identify your weakest stage (usually the biggest drop in your funnel).
2. Run experiments specifically on that stage.
3. Do not work on Acquisition if you have a Retention problem — you will fill the bucket faster, but it still leaks.

Most companies over-invest in Acquisition and under-invest in Activation and Retention.`,
    tags: ["aarrr", "pirate-metrics", "growth", "funnel", "activation", "retention"],
    readTime: 7,
  },
  {
    id: "14",
    title: "Operational KPIs for Service Businesses",
    slug: "operational-kpis",
    category: "KPI Frameworks",
    content: `Service businesses — agencies, consultancies, professional services — have different KPIs from product companies. The key drivers are utilisation, project profitability, and client retention.

**Utilisation and capacity:**
- **Billable Utilisation Rate**: billable hours ÷ available hours × 100. Target varies by role and model, but 65–75% is typical for consultancies. Above 85% signals burnout risk.
- **Capacity by Role**: tracking available capacity per role helps with hiring and project staffing decisions.

**Revenue metrics:**
- **Revenue per Employee**: total revenue ÷ headcount. Tracks the leverage of your team as you grow.
- **Effective Hourly Rate**: total revenue ÷ total billable hours. Shows whether pricing and scope management are holding up.
- **Project Profitability**: (Project Revenue − Direct Costs) ÷ Project Revenue. Fixed-fee projects need this tracked weekly against hours burned.

**Client health:**
- **Client Retention Rate**: % of clients who renew or buy again year over year. Above 80% is strong for most service businesses.
- **Net Revenue Retention**: are existing clients growing their spend with you?
- **Average Engagement Length**: longer engagements typically mean higher satisfaction.

**Pipeline and sales:**
- **Proposals Won Rate**: won proposals ÷ total proposals sent. Below 25% usually signals pricing, positioning, or qualification issues.
- **Average Deal Size**: are you moving upmarket or downmarket over time?
- **Sales Cycle Length**: days from first contact to signed contract.

Track 5–8 of these weekly. The right set depends on your business model — but always include at least one utilisation metric, one client health metric, and one revenue metric.`,
    tags: ["service-business", "agency", "utilisation", "project-profitability", "operational"],
    readTime: 7,
  },
  {
    id: "15",
    title: "E-Commerce Metrics That Drive Decisions",
    slug: "ecommerce-metrics",
    category: "KPI Frameworks",
    content: `E-commerce businesses need a blend of marketing, operations, and financial metrics. The goal is to understand the full customer lifecycle from first click to repeat purchase.

**Conversion and traffic:**
- **Conversion Rate**: orders ÷ sessions × 100. Industry average is 1–3%. Improvements here have compounding returns.
- **Sessions by Channel**: understand where your traffic is coming from and how each channel converts.
- **Cart Abandonment Rate**: % of customers who add to cart but do not buy. Above 70% is normal; reducing it by even 5% can meaningfully impact revenue.

**Order metrics:**
- **Average Order Value (AOV)**: total revenue ÷ number of orders. Increasing AOV through bundles and upsells is often more efficient than acquiring more traffic.
- **Units per Transaction**: are customers buying more items per order over time?

**Customer metrics:**
- **Repeat Purchase Rate**: % of customers who buy more than once. Above 30% signals strong product-market fit.
- **Customer Lifetime Value (LTV)**: the total revenue expected from a customer over their relationship with you.
- **LTV:CAC ratio**: as above — aim for 3:1 or better.

**Fulfilment and operations:**
- **On-Time Shipment Rate**: % of orders shipped by the promised date.
- **Return Rate**: returns ÷ orders shipped. High return rates signal product quality or description issues.
- **Inventory Turnover**: how quickly you sell through stock. Low turnover ties up cash.

**Financial:**
- **Gross Margin by SKU**: know which products make money and which erode it.
- **Blended ROAS**: total revenue ÷ total ad spend. Tracks whether your paid advertising is profitable in aggregate.`,
    tags: ["ecommerce", "conversion-rate", "aov", "ltv", "repeat-purchase", "fulfilment"],
    readTime: 8,
  },

  // ── Growth Systems ────────────────────────────────────────────────────────
  {
    id: "16",
    title: "Building a Growth Dashboard",
    slug: "growth-dashboard",
    category: "Growth Systems",
    content: `A growth dashboard consolidates the metrics that matter most for scaling a business into a single, actionable view. The goal is not to show everything — it is to show the right things.

**What to include:**

*Top-line health:* Revenue (MRR or monthly revenue), new customers, churn, and NPS as KPI cards. These give the "vital signs" view at a glance.

*Trend visibility:* A 12-month MRR or revenue trend line shows whether growth is accelerating, decelerating, or flat. This is the most important chart for most businesses.

*Acquisition funnel:* A bar or funnel chart showing leads → qualified leads → proposals → customers. Spots where the funnel is leaking.

*Retention cohorts:* If you have the data, a month-by-month cohort table shows exactly which customer groups are retaining and which are churning early.

*Channel breakdown:* A pie chart showing revenue or customers by acquisition channel. Tells you where to invest more.

**Design principles:**
- 8–12 widgets is the sweet spot. More creates noise.
- Put the most important metric top-left — that is where eyes go first.
- Use colour deliberately: green = on track, red = issue. Do not use colour decoratively.
- Date ranges should be consistent across all widgets (same 30-day window, not a mix).

**Updating frequency:**
Weekly for activity metrics, monthly for cohort and retention data, quarterly for LTV and CAC. Automate where possible through live integrations.`,
    tags: ["growth", "dashboard", "metrics", "design", "retention"],
    readTime: 6,
  },
  {
    id: "17",
    title: "OKRs vs EOS Rocks: Understanding the Difference",
    slug: "okrs-vs-rocks",
    category: "Growth Systems",
    content: `OKRs (Objectives and Key Results) and EOS Rocks both structure priorities, but they work differently and suit different types of organisations.

**EOS Rocks:**
- 3–7 priorities per person per quarter.
- Each Rock is binary: done or not done.
- Rocks cascade from company → department → individual.
- Designed for execution discipline in small-to-midsize businesses.
- No built-in measurement beyond completion — the Rock itself defines the outcome.

**OKRs:**
- 3–5 Objectives, each with 2–5 measurable Key Results.
- Key Results are scored 0–1.0, not binary.
- Teams set their own OKRs aligned to company objectives.
- Designed for ambitious, aspirational goal-setting. The target is 70% attainment — 100% means the goal was not bold enough.
- Popularised by Google, best known in tech companies.

**Key differences:**

| | EOS Rocks | OKRs |
|---|---|---|
| Success definition | Done / Not Done | 0–1.0 score |
| Goal ambition | Realistic | Aspirational (70% = success) |
| Ownership | Individual | Team or individual |
| Review cadence | Weekly (On/Off track) + Quarterly | Monthly check-ins + Quarterly |
| Best fit | SMB execution discipline | Innovation-focused teams |

**Which should you use?**
If you are running EOS, use Rocks. They complement the rest of the system. If your team is already running OKRs, you can map Rocks to OKR Key Results — a Rock completion contributes to a Key Result score.

Do not try to run both simultaneously without a clear mapping. That creates confusion about what "success" means.`,
    tags: ["okrs", "rocks", "goal-setting", "strategy", "frameworks"],
    readTime: 6,
  },
  {
    id: "18",
    title: "The Rule of 40 for SaaS",
    slug: "rule-of-40",
    category: "Growth Systems",
    content: `The Rule of 40 is a widely used benchmark for evaluating the balance between growth and profitability in a SaaS business.

**The formula:**
Rule of 40 Score = Revenue Growth Rate % + EBITDA (or Free Cash Flow) Margin %

A score of 40 or above is considered healthy. For example:
- Growing at 60% with a -20% margin = 40 ✓
- Growing at 20% with a 25% margin = 45 ✓
- Growing at 15% with a 10% margin = 25 ✗

**Why it matters:**
Early-stage SaaS companies typically sacrifice margin for growth. Later-stage or public SaaS companies are expected to be profitable. The Rule of 40 acknowledges that either strategy is valid as long as the combined score is strong.

**How to use it:**
- As a quarterly health check: is your score improving over time?
- For fundraising conversations: investors benchmark against it.
- For strategic decisions: should you invest more in growth (reducing margin) or optimise for profitability?

**Limitations:**
- It is a single number that hides complexity — a 40% growth company with -30% margins has very different risk than a 10% growth company with 30% margins.
- Works best for companies above $10M ARR. Below that, unit economics (LTV:CAC) matter more.
- Does not account for capital efficiency — how much funding was consumed to achieve that growth.

Track your Rule of 40 score quarterly alongside your CAC Payback Period and Net Revenue Retention. Together, these three metrics tell you whether your business is capital-efficient and sustainable.`,
    tags: ["rule-of-40", "saas", "profitability", "growth", "ebitda"],
    readTime: 5,
  },

  // ── People & Hiring ───────────────────────────────────────────────────────
  {
    id: "19",
    title: "The People Analyser: Right People, Right Seats",
    slug: "people-analyser",
    category: "People & Hiring",
    content: `The People Analyser is an EOS tool for evaluating every person in your organisation against two dimensions: Core Values fit and GWC (Gets it, Wants it, has the Capacity to do it).

**The Core Values evaluation:**
Rate each person against each of your company's core values using a simple + / - / +/- system.
- (+): consistently demonstrates this value.
- (-): consistently violates or lacks this value.
- (+/-): inconsistent — sometimes demonstrates, sometimes does not.

Anyone with more than one (-) is likely not a cultural fit, regardless of their performance.

**The GWC evaluation:**

*Gets it* — Does this person intuitively understand the role, the team dynamics, and what success looks like? Getting it is not something you can teach — it is an intuitive understanding of the role.

*Wants it* — Does this person genuinely want to do this work? Not because they feel they should, but because they are energised by it.

*Capacity* — Do they have the mental, physical, and emotional capacity to perform the role at the level required? Capacity includes time, skills, and bandwidth.

A "No" to any single GWC disqualifies someone from a seat — even if they score high on the other two.

**Running a People Analyser session:**
Once a quarter, the leadership team reviews every person on the Accountability Chart against both dimensions. The goal is not to fire people — it is to surface misalignments early so you can address them before they become expensive.

The most common action after a People Analyser is a direct conversation with someone who is in the wrong seat but could thrive in a different one.`,
    tags: ["people", "hiring", "gwc", "core-values", "accountability", "people-analyser"],
    readTime: 7,
  },
  {
    id: "20",
    title: "Hiring for Core Values: A Practical Guide",
    slug: "hiring-core-values",
    category: "People & Hiring",
    content: `Hiring people who share your core values is the single most important thing you can do to protect and strengthen your culture. Skills can be trained; values cannot.

**Build values into every stage of your process:**

*Job description:* explicitly state your core values and describe what they look like in action. Candidates who do not share them will self-select out.

*Application stage:* ask a values-related question in your application form. "Describe a time you went beyond what was asked of you" screens for a Work Ethic value, for example.

*Interview stage:* use STAR behavioural questions for each core value. "Tell me about a time you disagreed with a decision but executed it anyway" screens for the Trust value. Listen for energy and specificity — people who share your values talk about these things with enthusiasm and detail.

*Reference checks:* ask references directly about the values. "On a scale of 1–10, how would you rate Sarah on intellectual honesty? Can you give me an example?"

*Trial period:* observe values fit during a paid trial project or first 90 days. Many values issues do not surface in interviews — they show up in how someone handles ambiguity, pressure, and peer disagreement.

**The cost of a bad hire:**
Studies consistently estimate the cost of a mis-hire at 1.5–3× annual salary, accounting for recruitment costs, manager time, team morale impact, and ramp-up time for the replacement. For senior roles, the cost is higher.

Getting this right is the most leveraged thing a growing company can do.`,
    tags: ["hiring", "core-values", "culture", "interview", "recruiting"],
    readTime: 7,
  },
  {
    id: "21",
    title: "Managing Underperformance with EOS Tools",
    slug: "managing-underperformance",
    category: "People & Hiring",
    content: `EOS provides a clear framework for addressing underperformance that respects both the individual and the organisation.

**Step 1 — Clarify expectations:**
Most underperformance starts with unclear expectations. Before any performance conversation, confirm that the person understands: their Rocks, their Scorecard numbers, their Roles on the Accountability Chart, and what success looks like in 90 days.

**Step 2 — The 3 Strikes rule:**
EOS recommends a disciplined three-conversation process:
- *Strike 1*: point out the issue clearly. Confirm understanding. This is not a formal warning — it is a clarifying conversation.
- *Strike 2*: the issue has recurred. Now it is a formal conversation with specific expectations and a timeline.
- *Strike 3*: the issue has recurred again. Either the person moves to a different seat, or they leave the organisation.

**Step 3 — Seat vs. person:**
Before concluding someone is not a fit, ask: is this a people problem or a seat problem? Sometimes a person who is struggling in their current role would thrive in a different seat. The People Analyser helps distinguish the two.

**What EOS discourages:**
- Tolerating underperformance for "nice" reasons. Protecting a poor performer hurts the whole team.
- Hoping the problem resolves itself. It almost never does.
- Surprise exits. If you have run the 3-strike process, the exit should not be a shock to anyone.

The hardest part of building a great team is having honest conversations quickly. EOS gives you the language and structure to do it.`,
    tags: ["performance", "management", "underperformance", "3-strikes", "people"],
    readTime: 6,
  },

  // ── Integrations ──────────────────────────────────────────────────────────
  {
    id: "22",
    title: "Connecting Google Sheets as a Data Source",
    slug: "google-sheets-guide",
    category: "Integrations",
    content: `Google Sheets is one of the most flexible data sources available. Whether you are tracking sales pipeline, support tickets, or weekly Scorecard numbers manually, you can pull that data directly into your dashboard.

**Before you connect:**
- Ensure your sheet has a clear header row in row 1.
- Date columns should be consistently formatted (YYYY-MM-DD works best).
- Number columns should contain only numbers — no currency symbols or comma formatting.
- Remove merged cells before importing.

**Steps to connect:**
1. Go to **Integrations** in the left sidebar.
2. Click **Connect Google Sheets** and authenticate with your Google account.
3. When authorising, grant access to the specific spreadsheet (not your entire Drive unless needed).
4. Navigate to **Data Sources** and click **Add Google Sheets Source**.
5. Enter your Spreadsheet ID (visible in the URL), Sheet name, and cell range (e.g., "A1:G100").
6. Click **Connect** — the system will fetch the data and infer column types.

**Building widgets from your sheet:**
Once connected, create a new widget and select your sheet as the data source. Choose the column to use as your X axis (typically a date or category), and the column to aggregate for your Y axis.

**Keeping data fresh:**
The system re-syncs your sheet data periodically. For time-sensitive data, ensure your sheet is updated before your weekly L10 Meeting.

**Common issues:**
- "Column not found": check that your header row exactly matches what you entered.
- Blank data: verify the range covers the rows that contain data.
- Wrong types: if a number column is being treated as text, check for spaces or letters in any cell in that column.`,
    tags: ["google-sheets", "integration", "data-source", "guide"],
    readTime: 6,
  },
  {
    id: "23",
    title: "Understanding Your Stripe Revenue Data",
    slug: "stripe-revenue-guide",
    category: "Integrations",
    content: `Connecting Stripe gives you live access to your most important revenue metrics without any manual data entry. Once connected, EOS pulls the following data automatically.

**What gets pulled:**
- **Gross Revenue**: total charge volume by month, before refunds and fees.
- **Net Revenue**: gross revenue minus refunds and Stripe processing fees.
- **MRR**: calculated from active subscriptions. Upgraded, downgraded, and churned subscriptions are reflected immediately.
- **ARR**: MRR × 12, calculated from live subscription data.
- **New MRR**: MRR added from new subscriptions this period.
- **Expansion MRR**: additional MRR from upgrades and add-ons.
- **Churned MRR**: MRR lost from cancellations and downgrades.
- **Active Subscriptions**: count of all active, past-due, and trialling subscriptions.
- **Subscription Breakdown by Plan**: revenue and customer count per price/plan.

**What you need:**
A Stripe Secret Key ("sk_live_...") with read-only permission. You can create a restricted key in the Stripe dashboard under Developers → API Keys → Create restricted key. Grant read access to: Customers, Subscriptions, Charges, Payment Intents.

**Important limitations:**
- One-time charges are included in revenue but excluded from MRR calculations.
- Stripe data has a short processing delay for very recent charges.
- Multi-currency accounts: all values are converted to your Stripe account's default currency.

**Recommended widgets:**
- MRR trend (line chart, 12 months)
- Net Revenue by Month (bar chart, 6 months)
- Revenue by Plan (pie chart)
- Churn Rate KPI card
- Active Subscribers KPI card`,
    tags: ["stripe", "revenue", "mrr", "integration", "subscriptions"],
    readTime: 6,
  },
  {
    id: "24",
    title: "Using CSV Uploads for Custom Data",
    slug: "csv-upload-guide",
    category: "Integrations",
    content: `CSV uploads let you bring any tabular data into your dashboard — sales pipeline exports, CRM reports, HR data, custom survey results, or any spreadsheet not already supported by a native integration.

**Preparing your CSV:**
- Row 1 must be headers. Use clear, descriptive names without special characters.
- Each column should contain only one data type — do not mix numbers and text.
- Date columns: use ISO format (YYYY-MM-DD) or MM/DD/YYYY consistently.
- Encoding: UTF-8 is required. Save from Excel using "CSV UTF-8 (Comma delimited)".
- File size: up to 10 MB per upload.

**Steps to upload:**
1. Go to **Integrations → CSV Upload**.
2. Give the data source a name (e.g., "Q3 Sales Pipeline").
3. Drag and drop your file or click to browse.
4. Preview the inferred column types and correct any misidentifications.
5. Click **Upload** — the data is stored securely in S3 and processed.

**Updating CSV data:**
CSV uploads are point-in-time snapshots. To update a data source, upload a new file to the same data source. The previous data is replaced.

For data that changes frequently, consider switching to a Google Sheets integration — it allows the same flexibility with automatic refresh.

**Widget building tips:**
- **Trend over time**: if your CSV has a date column, use it as the X axis on a line or bar chart.
- **Category breakdown**: use a pie or bar chart for any column with 3–8 distinct values.
- **Totals and aggregates**: use a KPI card with SUM, AVG, or COUNT aggregation on numeric columns.
- **Row-level data**: the table widget shows raw rows — useful for account-level or transaction-level data.`,
    tags: ["csv", "upload", "data-source", "guide", "integration"],
    readTime: 5,
  },
  {
    id: "25",
    title: "Setting Up a Custom API Data Source",
    slug: "custom-api-guide",
    category: "Integrations",
    content: `The Custom API integration lets you pull data from any HTTP endpoint — your own backend, third-party services, or data APIs — and visualise it in your dashboard.

**What you need:**
- A publicly accessible URL that returns JSON data.
- Optional: API key, Bearer token, or Basic Auth credentials (passed as custom headers).
- The endpoint should return an array of objects, or a nested object containing an array.

**Configuration:**
1. Go to **Integrations → Custom API**.
2. Enter the endpoint URL.
3. Select the HTTP method (GET or POST).
4. Add any required headers (e.g., "Authorization: Bearer your-token").
5. If using POST, add the request body in JSON format.
6. Set the **Response Data Path** if your data is nested — e.g., "data.results" for {"data": {"results": [...]}}.
7. Click **Test Connection** to verify the endpoint responds with data.

**Security note:**
API credentials you enter are encrypted at rest. They are never sent to the client — they are used only on the server when syncing data. Never use admin-level credentials; create a read-only token where possible.

**Supported response formats:**
- Array at root level: [{"date": "2024-01-01", "value": 100}, ...].
- Nested under a key: {"data": [...]} — use Response Data Path "data".
- Deeply nested: {"results": {"items": [...]}} — use dot notation "results.items".

**Limitations:**
- Authentication flows (OAuth, multi-step auth) are not supported — you need a static token or API key.
- Real-time streaming is not supported — data is fetched on a polling schedule.
- Maximum 10,000 rows per sync.`,
    tags: ["custom-api", "api", "integration", "data-source", "json"],
    readTime: 6,
  },
  {
    id: "26",
    title: "Google Analytics 4: Connecting Your Traffic Data",
    slug: "ga4-guide",
    category: "Integrations",
    content: `Connecting Google Analytics 4 brings website and app traffic data into your dashboard alongside your revenue and operational metrics.

**What data is available:**
- **Sessions by date**: track traffic trends over time.
- **Sessions by channel**: see how much traffic comes from Organic Search, Paid Search, Direct, Social, Email, and Referral.
- **Active Users (DAU, WAU, MAU)**: engagement metrics for apps and content-heavy products.
- **Conversion Events**: any conversion you have set up in GA4 (form submissions, purchases, sign-ups).

**Prerequisites:**
- A Google Analytics 4 property (not Universal Analytics).
- Your GA4 Property ID (found in GA4 → Admin → Property Settings). Format: "123456789".
- Google account connection authorised from the Integrations page.

**Setup steps:**
1. Connect your Google account under **Integrations → Google**.
2. Go to **Data Sources → Add Google Analytics Source**.
3. Enter your GA4 Property ID.
4. Select a default date range (7, 30, or 90 days).
5. Click **Connect** — the system will pull your traffic data.

**Recommended widgets:**
- Sessions trend (line chart, 30 days) — shows traffic momentum.
- Sessions by channel (pie chart) — shows acquisition mix.
- Top conversion event (KPI card) — tracks your primary conversion goal.

**Limitations:**
- GA4 data is sampled for large properties. Reports on very high-traffic sites may not match GA4 UI exactly.
- Attribution models in GA4 differ from what you may be used to in Universal Analytics.
- Data processing delay: GA4 data can lag 24–48 hours.`,
    tags: ["google-analytics", "ga4", "traffic", "sessions", "integration"],
    readTime: 5,
  },

  // ── Dashboard Tips ────────────────────────────────────────────────────────
  {
    id: "27",
    title: "Dashboard Design Principles",
    slug: "dashboard-design",
    category: "Dashboard Tips",
    content: `A well-designed dashboard communicates the right information at the right time with minimal cognitive load. A poorly designed one adds noise rather than clarity.

**Principle 1 — Start with the question, not the data:**
Every dashboard should answer a specific question: "Is the business growing?" "Are we on track for the quarter?" "Which customers are at risk?" Design the dashboard to answer that question in the first five seconds of looking at it.

**Principle 2 — The hierarchy of importance:**
Place the most important metric top-left. Western readers scan top-left to bottom-right — this is where the eye goes first. KPI cards should precede charts, which should precede tables.

**Principle 3 — Consistent time ranges:**
All metrics on a dashboard should use the same time window unless there is a deliberate reason to differ. Mixing a 7-day metric next to a 30-day metric creates false comparisons.

**Principle 4 — Context makes data meaningful:**
A number without context is trivia. $47,850 MRR means nothing without: the previous period ($42,630), the goal ($50,000), and the trend (growing, flat, declining). Always show comparison data.

**Principle 5 — Colour with intention:**
Use green for on-target, red for off-target, and grey/neutral for informational. Do not use colour decoratively — it trains viewers to ignore it as signal.

**Principle 6 — Less is more:**
8–12 widgets is the sweet spot for an operational dashboard. Beyond that, the critical metrics get lost. If you feel like you need 20 widgets, you probably need two dashboards.

**Principle 7 — Name things as questions:**
"Monthly Recurring Revenue" is a label. "Are we on track to hit $600K ARR?" is a question. Where possible, frame widget titles as the question the widget answers.`,
    tags: ["dashboard", "design", "principles", "visualisation", "ux"],
    readTime: 6,
  },
  {
    id: "28",
    title: "Choosing the Right Chart Type",
    slug: "chart-types",
    category: "Dashboard Tips",
    content: `The wrong chart type can actively mislead. Choosing the right one for your data and question is a foundational data literacy skill.

**Line Chart — use when:**
- Showing change over time with continuous data.
- Comparing two or more time-series (e.g., MRR vs. target).
- Revealing trends, momentum, or inflection points.
- *Avoid if:* you have fewer than 4 time periods (use a KPI card instead).

**Bar Chart — use when:**
- Comparing discrete categories (revenue by channel, customers by plan).
- Showing period-over-period comparisons side by side.
- Ranking items (most customers to least).
- *Avoid if:* you have more than 12 bars — it becomes unreadable.

**Pie / Donut Chart — use when:**
- Showing how parts make up a whole (part-to-whole relationship).
- You have 3–6 segments with meaningfully different sizes.
- *Avoid if:* segments are similar in size (impossible to compare), or you have more than 6 segments (use a bar chart instead).

**KPI Card — use when:**
- A single number with its context (trend, goal, change %) is sufficient.
- The metric is important enough to stand alone.
- You want fast, scannable status checks.
- *Works best for:* current MRR, active users, NPS, churn rate.

**Table — use when:**
- You need row-level detail (top accounts, individual transactions).
- The audience needs to look up specific items.
- There are many dimensions simultaneously (account name, plan, MRR, health score).
- *Avoid if:* you are trying to show a trend — use a chart instead.`,
    tags: ["charts", "visualisation", "line-chart", "bar-chart", "pie-chart", "table"],
    readTime: 5,
  },
  {
    id: "29",
    title: "Running Your L10 with a Dashboard",
    slug: "l10-with-dashboard",
    category: "Dashboard Tips",
    content: `A live dashboard projected during your Level 10 Meeting transforms the Scorecard and Rock review steps from a reporting exercise into a data-driven conversation.

**Setup:**
- Create a dedicated "Weekly L10" dashboard with your Scorecard numbers as KPI cards.
- Add your Rock owners and Rock titles as a table or summary section.
- Keep it to 6–10 widgets — this is a meeting aid, not an analytics tool.

**During the Scorecard review (5 minutes):**
Instead of reading numbers from a spreadsheet, each owner points to their KPI card. Red numbers go straight to the Issues List — no discussion, just identification.

**During the Rock review (5 minutes):**
If you track Rock completion in a spreadsheet or project tool, have that open alongside the dashboard. The dashboard provides the business context (is the number moving in the right direction?) while the Rock status provides the execution context.

**During IDS (60 minutes):**
When solving an issue, being able to click into a chart and see the trend often provides the context needed for a better solution. "Our support ticket backlog has been growing for six weeks" is more actionable than "it feels like support is struggling."

**After the meeting:**
Keep the dashboard visible on a shared screen or TV in the office between meetings. A visible scorecard creates accountability without requiring a meeting — team members can see whether numbers are on track at any time.

**What not to do:**
- Do not spend the meeting analysing charts. Save that for 1:1s and department reviews.
- Do not include operational charts that are not relevant to the whole leadership team.
- Do not let the dashboard become a crutch for avoiding difficult conversations.`,
    tags: ["l10", "dashboard", "meetings", "scorecard", "accountability"],
    readTime: 5,
  },

  // ── Financial Literacy ────────────────────────────────────────────────────
  {
    id: "30",
    title: "Understanding Your P&L for Business Leaders",
    slug: "pl-for-leaders",
    category: "Financial Literacy",
    content: `Every business leader needs to read a Profit and Loss statement fluently. You do not need an accounting degree — but you do need to understand what is driving the numbers.

**The structure of a P&L:**

*Revenue (top line)*: total money earned from selling products or services. Gross revenue before any deductions.

*Cost of Goods Sold (COGS)*: the direct costs to deliver your product or service. For software: hosting, third-party APIs, customer success. For services: contractor costs, materials. Revenue − COGS = Gross Profit.

*Gross Margin* = Gross Profit ÷ Revenue × 100. This is one of the most important health metrics. SaaS companies typically target 70–85%. Service businesses often run 30–50%.

*Operating Expenses (OpEx)*: costs not directly tied to delivery — sales, marketing, G&A (finance, legal, admin), R&D. These are the investments you make to grow the business.

*EBITDA*: Earnings Before Interest, Taxes, Depreciation, and Amortisation. The closest thing to "operating profit." A positive EBITDA means the business generates cash from operations before financing costs.

*Net Income (bottom line)*: what is left after all expenses, interest, and taxes. Positive net income means profitability.

**Red flags to watch:**
- Gross margin declining quarter over quarter (cost to deliver is rising faster than revenue).
- Operating expenses growing faster than revenue (you are spending more to grow less efficiently).
- Revenue growth with declining net income (you may be buying growth unsustainably).

**Dashboard integration:**
Track Gross Margin %, EBITDA Margin %, and Revenue as KPI cards. Trend them monthly. These three numbers, combined with MRR and churn, tell the full financial story.`,
    tags: ["finance", "pl", "gross-margin", "ebitda", "financial-literacy"],
    readTime: 7,
  },
  {
    id: "31",
    title: "Cash Flow vs. Profit: Why They Are Different",
    slug: "cash-flow-vs-profit",
    category: "Financial Literacy",
    content: `More businesses fail from cash flow problems than from unprofitability. Understanding the difference between profit and cash flow is critical for any business leader.

**The core difference:**
Profit is an accounting concept. Cash flow is reality. A business can be profitable on paper and still run out of money.

**How this happens:**
- You sell $100K of services in March. You invoice the client. They pay in May. In April, you have a profit on paper but no cash.
- You pay suppliers in 30 days but collect from customers in 90 days. The gap is funded by your cash reserves or credit line.
- You invest in inventory or pre-pay annual contracts. Both reduce cash without immediately reducing profit.

**Key cash flow concepts:**

*Operating Cash Flow*: cash generated from the core business. This should be positive for any sustainable business.

*Free Cash Flow*: Operating Cash Flow − Capital Expenditure. What is left after maintaining and growing the business.

*Cash Runway*: current cash balance ÷ monthly net cash burn. How many months can you operate without raising new money or reaching profitability?

*Working Capital*: current assets − current liabilities. Positive working capital means you can pay near-term obligations.

**For subscription businesses:**
Annual subscriptions paid upfront are great for cash flow but create a deferred revenue liability on the balance sheet — you have the cash but have not yet "earned" it. Understand this distinction when reading your balance sheet.

**Dashboard tip:**
Add a Cash Runway KPI card to your financial dashboard. If it is declining quarter over quarter, that is an issue to solve before it becomes a crisis.`,
    tags: ["cash-flow", "profit", "runway", "working-capital", "finance"],
    readTime: 6,
  },
  {
    id: "32",
    title: "Unit Economics: The Foundation of a Scalable Business",
    slug: "unit-economics",
    category: "Financial Literacy",
    content: `Unit economics describe the direct revenues and costs associated with a single "unit" of your business — typically one customer. If the unit economics are healthy, scaling makes you more profitable. If they are unhealthy, scaling makes losses bigger.

**The core equation:**
LTV > CAC is the fundamental requirement. You must earn more from a customer over their lifetime than it costs you to acquire them.

**LTV (Lifetime Value) calculation:**
LTV = ARPU × Gross Margin % ÷ Monthly Churn Rate

Example: ARPU = $50, Gross Margin = 75%, Monthly Churn = 2%
LTV = $50 × 0.75 ÷ 0.02 = $1,875

**CAC (Customer Acquisition Cost) calculation:**
CAC = Total Sales & Marketing Spend ÷ New Customers Acquired

Example: $50K spent on S&M in a month, 200 new customers → CAC = $250

**LTV:CAC ratio:**
$1,875 LTV ÷ $250 CAC = 7.5:1 — excellent. The benchmark is 3:1 or higher. Below 1:1 means you are losing money on every customer.

**CAC Payback Period:**
CAC ÷ (ARPU × Gross Margin %) = months to recover acquisition cost.
$250 ÷ ($50 × 0.75) = 6.7 months — very good. Under 12 months is healthy for most B2C; under 18 months for B2B.

**What breaks unit economics:**
- High churn (reduces LTV dramatically — even a 1% change in monthly churn has an outsized impact).
- Increasing CAC without corresponding LTV improvement (paid channels saturate and get more expensive over time).
- Declining gross margins (often from over-discounting or increased support costs).

Improving unit economics almost always involves either increasing retention or reducing CAC — both require clear measurement to manage.`,
    tags: ["unit-economics", "ltv", "cac", "payback-period", "scalability", "finance"],
    readTime: 7,
  },
  {
    id: "33",
    title: "Budgeting for Growth: The FP&A Basics",
    slug: "budgeting-basics",
    category: "Financial Literacy",
    content: `Financial planning and analysis (FP&A) sounds like a CFO concern — but every leader making hiring or investment decisions benefits from understanding the basics.

**The annual budget process:**
1. Start with your revenue forecast (bottom-up from pipeline and retention data, top-down from market assumptions).
2. Set headcount plans: who do you need to hire, and when?
3. Model OpEx: marketing spend, software, rent, other fixed costs.
4. Project gross margin based on revenue forecast and current COGS structure.
5. Calculate the resulting EBITDA and cash flow.
6. Compare against target: if the number is not where you want it, adjust inputs.

**Rolling forecasts vs. annual budgets:**
Traditional annual budgets become stale quickly. A rolling 12-month forecast, updated quarterly, is more useful for operational decisions. You always have a 12-month view, and it reflects current reality rather than January's assumptions.

**Headcount planning:**
- Fully-loaded cost of an employee = base salary × 1.25–1.35 (accounts for benefits, payroll taxes, equipment).
- New hires typically take 3–6 months to reach full productivity.
- Hire ahead of need, not in response to crisis — but do not over-hire in anticipation of growth that may not come.

**Working with your finance team:**
If you have a finance function, the best collaboration model is: leadership team sets goals and trade-offs, finance models the scenarios, leadership decides. Finance should be a strategic partner, not just a scorekeeper.

**One number to know:**
Your monthly cash burn rate. Even profitable businesses on accrual accounting can have negative cash months. Know this number at all times.`,
    tags: ["budgeting", "fpa", "financial-planning", "headcount", "forecast"],
    readTime: 7,
  },
];

const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)));

function ArticleContent({ content }: { content: string }) {
  // Render basic markdown-like formatting: **bold**, numbered lists, bullet lists
  const lines = content.split("\n");
  return (
    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return null;

        // Heading (starts with **)
        if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
          return (
            <p key={i} className="font-semibold text-foreground mt-4 first:mt-0">
              {line.slice(2, -2)}
            </p>
          );
        }

        // Table row (contains |)
        if (line.startsWith("|") && line.endsWith("|")) {
          const cells = line.split("|").filter(Boolean).map((c) => c.trim());
          const isDivider = cells.every((c) => /^-+$/.test(c));
          if (isDivider) return null;
          return (
            <div key={i} className="grid gap-1 text-xs font-mono" style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}>
              {cells.map((cell, j) => (
                <span key={j} className="truncate px-1">{cell}</span>
              ))}
            </div>
          );
        }

        // Inline bold within a line
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
            : part
        );

        return <p key={i}>{rendered}</p>;
      })}
    </div>
  );
}

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<KnowledgeArticle | null>(null);

  const filtered = ARTICLES.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q));
    const matchesCategory = !activeCategory || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {ARTICLES.length} articles covering EOS fundamentals, KPI frameworks, integrations, and business finance
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !activeCategory
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({ARTICLES.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = ARTICLES.filter((a) => a.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <Separator />

      {openArticle ? (
        <div className="space-y-5">
          <button
            onClick={() => setOpenArticle(null)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            ← Back to articles
          </button>
          <div>
            <Badge variant="outline" className="mb-3 text-xs">{openArticle.category}</Badge>
            <h2 className="text-2xl font-bold">{openArticle.title}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {openArticle.readTime} min read
              </span>
            </div>
          </div>
          <Separator />
          <ArticleContent content={openArticle.content} />
          <div className="flex gap-2 flex-wrap pt-2">
            {openArticle.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs gap-1">
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">No articles found for &ldquo;{search}&rdquo;</p>
          ) : (
            filtered.map((article) => (
              <button
                key={article.id}
                onClick={() => setOpenArticle(article)}
                className="w-full text-left flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors group"
              >
                <div className="space-y-1 min-w-0 pr-4">
                  <p className="text-sm font-medium">{article.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.readTime} min
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </button>
            ))
          )}
          {filtered.length > 0 && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {activeCategory ? ` in ${activeCategory}` : ""}
              {search ? ` matching "${search}"` : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
