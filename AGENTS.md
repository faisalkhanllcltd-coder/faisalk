# AGENTS.md — Persistent Project Rules

You are a senior frontend engineer building Faisal Khan's production portfolio
site. These rules apply to every task, every session, without exception. If a
request conflicts with these rules, flag the conflict in implementation_plan.md
instead of silently resolving it in either direction.

## Identity & goal
Portfolio for a web developer / digital marketer. The goal is qualified leads
(interviews, client inquiries) — not a tech demo. Every feature must trace back
to that goal or it doesn't ship.

## Stack — locked, do not substitute without written justification in a plan
- Next.js 16 (App Router), React 19.2, TypeScript strict
- Node 22 LTS
- Tailwind CSS v4
- 3D: @react-three/fiber v9 + @react-three/drei v10 + three.js — pin exact
  versions on install and verify peer-dependency compatibility with the
  installed React version before adding anything to this stack
- Motion: native CSS scroll-driven animations (`animation-timeline: view()`)
  as the default for entrance/reveal/parallax effects, with an
  IntersectionObserver fallback for unsupported browsers. Use a JS animation
  library (Motion/Framer Motion) ONLY for effects CSS genuinely cannot do
  (shared layout transitions, cursor-follow). Never add a second animation
  library alongside it.
- Micro-animation: dotLottie (`.lottie`), not raw Lottie JSON.
- Hosting: Vercel, connected to GitHub for automatic deploys.
- Content: MDX in-repo for case studies — no external CMS unless explicitly
  requested later.

## Install & build hygiene
- Always run `npm ci`, never `npm install`, once package-lock.json exists.
  Commit the lockfile in the very first commit.
- Set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` in this environment. Browser
  binaries download ONLY inside the GitHub Actions job (PART 3), where
  egress is open and the download is cached between runs — never as a
  local install step, disk space or not; that download is a network-bound
  step, not a disk-bound one, and stalling on it wastes time either way.
- Never run Lighthouse CI, or any command that fetches large binaries, as a
  background/default local step.
- If any command produces no new output for 3 minutes, treat it as stalled:
  kill it, capture the last 50 lines of output, report the failure. Never
  let anything run silently past that — that's what turned a solvable
  problem into an hour of nothing last time.
- Never fall back to `--legacy-peer-deps` to silence a peer conflict. Pin
  compatible versions or report the real incompatibility.

## Infrastructure automation — command line only, never a dashboard
You have terminal access. Use it for all of the following instead of ever
telling the human to open GitHub or Vercel's UI.

**Before running anything below**, check what's already available:
```bash
gh auth status
vercel whoami
```
If both are authenticated, proceed autonomously with every command below.
If either is missing, stop and report the exact single gap by name — do
not attempt an interactive login flow yourself, don't ask the human to
navigate a settings page. Name the one blocker and wait (PART 0 already
covers this for a fresh machine, so this should rarely fire).

**GitHub branch protection on `main`** (once CI in PART 3 exists and has run
at least once, so the `quality` check context is known to GitHub):
```bash
cat > /tmp/branch_protection.json << 'EOF'
{
  "required_status_checks": { "strict": true, "contexts": ["quality"] },
  "enforce_admins": true,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
gh api --method PUT \
  repos/faisalkhanllcltd-coder/faisalk/branches/main/protection \
  --input /tmp/branch_protection.json
```
Do not add required-reviewer rules — this is a solo project; the CI check
is the only gate that earns its place.

**Vercel project link + Git connection:**
```bash
vercel link --yes --project faisalk --scope team_CBsmeRxMObgnMsvBGeUZpOBA

vercel git connect \
  https://github.com/faisalkhanllcltd-coder/faisalk.git --yes
```

**Environment variables** (set via CLI once secret values exist as local
env vars — never hardcode a value into the command itself):
```bash
printf '%s' "$RESEND_API_KEY" | vercel env add RESEND_API_KEY production
printf '%s' "$SENTRY_DSN"     | vercel env add SENTRY_DSN     production
```
If `RESEND_API_KEY` / `SENTRY_DSN` aren't set locally yet, report that by
name at the point they're actually needed (Phase 5) — not before.

Do not add a `vercel deploy` step anywhere, including in ci.yml. Vercel's
Git integration deploys automatically on push/PR once connected above;
adding a second deploy path means two deployments racing the same commit.

## Hard budgets — verify before marking any task complete; report the
## measured number, don't self-report "should be fine"
- Initial route JS payload: <150KB gzipped, excluding the 3D chunk
- 3D bundle (three + r3f + drei + scene assets): code-split, lazy-mounted
  only on hero viewport entry or interaction, <300KB gzipped
- LCP < 2.5s and INP < 200ms, measured on throttled mobile emulation
  (mid-tier device / Slow 4G profile) — not desktop
- Lighthouse mobile Performance score ≥ 90 (enforced in CI, see PART 3)

## Accessibility & resilience — non-negotiable, not "nice to have"
- WCAG 2.2 AA baseline.
- `prefers-reduced-motion` disables both the 3D scene's animation and
  Lottie playback, falling back to a static image/poster.
- No-WebGL-support falls back to a static hero image — detect via feature
  check, never user-agent sniffing.
- Every piece of content inside the 3D canvas or an animation must also
  exist as real, crawlable DOM content elsewhere on the page.

## SEO — this is a digital marketer's own site; it has to walk the talk
- Every content page (About, Work, case studies, Contact) is server-rendered
  with real HTML — never populated client-side after hydration.
- schema.org Person + CreativeWork structured data, OpenGraph/Twitter cards,
  sitemap.xml, robots.txt.

## Repository hygiene
- Repo: https://github.com/faisalkhanllcltd-coder/faisalk.git — `main` is
  the only long-lived branch; feature work happens on short-lived branches
  merged via PR.
- Every PR must pass the CI workflow in PART 3 before merge.
- `.env*` files are gitignored, always. Environment variables live in
  Vercel project settings, never in the repo.

## Scope discipline — the most important rule in this file
- Do not add a feature, page, animation, dependency, or tooling step that is
  not explicitly listed in the CURRENT task's implementation_plan.md, even
  if you judge it an improvement.
- If you think of something worth adding mid-task, write it into a
  "Suggested for later" section of the plan and keep executing the approved
  scope.
- "Cutting-edge" and "premium" come from one thing executed exceptionally
  well per phase, not from maximum feature count. Default to doing less,
  better.

## Verification requirement
Every task ends in VERIFICATION mode. walkthrough.md must include: actual
Lighthouse scores from the CI run, a screenshot at desktop viewport, a
screenshot at throttled mobile viewport, and explicit confirmation that
prefers-reduced-motion and no-WebGL fallbacks were tested, not assumed.

## Content authenticity — non-negotiable
Every case study, bio line, employment fact, and statistic on this site
must trace to a fact in CONTENT.md at repo root. Never invent a company
name, client outcome, or metric to fill a gap. If a section needs
something not in CONTENT.md (a number, a screenshot, a quote), leave a
`[NEEDS: what's missing]` placeholder in the content file and flag it in
that task's walkthrough.md — do not fill it with a plausible-sounding
invention. This applies to every phase, not just the current content pass.

## Runtime version policy
Don't hardcode a specific Node major version in this file — it goes stale.
Use whatever is the current Active LTS at the time you're working (check
via `node --version` against nodejs.org's release schedule if unsure), and
note in implementation_plan.md which version you're building against.