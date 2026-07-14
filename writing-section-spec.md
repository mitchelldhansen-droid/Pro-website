# Spec: "Writing" Section + Post Pages for Portfolio Site

**Repo:** Pro-website (GitHub Pages, hand-rolled HTML/CSS)
**Goal:** Add a featured-writing section to the homepage and a reusable post page template, so blog pieces have a permanent home that LinkedIn posts can link to.
**Design rule for everything below:** reuse the site's existing CSS variables, fonts, card patterns, and section header styles. Match the dark theme (`#0f1419` background). Nothing in this spec should introduce a new visual language — it should look like the site always had it.

---

## 1. File structure

```
/writing/
  index.html                      ← "See all" page (build now, keep simple)
  time-of-the-indie-dev.html      ← first post
  _template.html                  ← copy-paste template for future posts (not linked anywhere)
/images/writing/
  indie-dev-og.jpg                ← 1200x630 social card image for post #1
```

## 2. Homepage changes

### Nav
Add one item between "Engineering" and "Teams":
```html
<a href="#writing">Writing</a>
```

### New section
Insert a `#writing` section **after "What I Build" and before "Trusted by my Teams"**. Same section header treatment as the others.

- **Section title:** `Writing`
- **Subtitle (one line under the title):** `Field notes on production, engineering, and the state of the industry — from inside a small team.`
- **Layout:** grid of cards, max 3 across on desktop, stacking on mobile. Reuse the existing project-card styling.

### Card anatomy (each card links to its post page)
```
[TAG]                        ← small pill: "Industry" | "Dev Log" | "Production Craft"
Post Title                   ← h3, link styling on hover
One-sentence hook.           ← muted text, the post's og:description works here
Jul 2026 · 5 min read        ← small, muted metadata row
```

### First card content
- **Tag:** Industry
- **Title:** The Time of the Indie Dev
- **Hook:** AAA's math broke. A $20 indie needs 50,000 sales to recoup — and that changes who gets to take creative risks.
- **Meta:** Jul 2026 · 5 min read

While there's only one post, render the single card plus a subtle "More coming — follow along on LinkedIn" placeholder card (muted, non-clickable, links nowhere) so the grid doesn't look abandoned. Remove the placeholder once there are 2+ real posts.

## 3. Post page template (`_template.html`)

Full standalone HTML page, same `<head>` assets as the homepage. Structure:

```
Sticky/simple top bar: "← Mitchell Hansen" (links to /Pro-website/) + "Writing" (links to /writing/)

<article> (max-width ~720px, centered, generous line-height for reading)
  [TAG pill]
  <h1>Post Title</h1>
  Date · X min read

  ...post body: h2 subheads, paragraphs, blockquote style for pull quotes...

  <hr>
  SIGNATURE BLOCK (identical on every post):
    "I'm building a 3D cozy builder at Napkin Sketch Games and writing about
     what AAA production discipline looks like at indie scale.
     I'm open to Producer / Technical Producer roles — reach me at
     mitchell.d.hansen@gmail.com or on LinkedIn."
     (link LinkedIn + email; reuse button or link styling from homepage contact section)
</article>

Footer: same as homepage footer.
```

### Required `<head>` per post (this is what makes LinkedIn previews work)
```html
<title>The Time of the Indie Dev | Mitchell Hansen</title>
<meta name="description" content="{one-sentence hook}">
<link rel="canonical" href="https://mitchelldhansen-droid.github.io/Pro-website/writing/time-of-the-indie-dev.html">

<meta property="og:type" content="article">
<meta property="og:title" content="The Time of the Indie Dev">
<meta property="og:description" content="{one-sentence hook}">
<meta property="og:url" content="{canonical URL}">
<meta property="og:image" content="https://mitchelldhansen-droid.github.io/Pro-website/images/writing/indie-dev-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta property="article:published_time" content="2026-07-14">
<meta name="author" content="Mitchell Hansen">
```

### OG image for post #1
1200x630. Dark background matching the site theme, post title in large type, "Mitchell Hansen — Producer & Production Engineer" small at the bottom. Generate with HTML/CSS screenshot or any image tool; keep the pattern reusable per post.

## 4. `/writing/index.html`

Minimal: same top bar and footer as post pages, page title "Writing", then the same card grid as the homepage section (this becomes the full archive as posts accumulate). One source of truth for card markup — keep homepage strip limited to the 3 most recent.

## 5. Post #1 content

Body text comes from the Google Doc "Blog Draft — The Time of the Indie Dev" (final edited version — copy from the doc, not from any earlier draft). Formatting notes:
- Pull quote treatment for: "You can't treat something that relies on fun like a piggy bank."
- Keep the Jason Schreier link as an inline hyperlink.
- Suggested h2 subheads if the wall of text needs breaking: "Why AAA broke first" / "Now run the indie math" / "What it demands from small teams".

## 6. Acceptance checklist

- [ ] Nav "Writing" link scrolls to the new section
- [ ] Section sits between What I Build and testimonials; matches site styling on desktop + mobile
- [ ] Card links to the post page; post page renders cleanly on mobile
- [ ] Back-links on post page return to homepage and /writing/
- [ ] Paste the post URL into a LinkedIn draft (or opengraph.xyz) — preview card shows title, description, and image
- [ ] Signature block present with working mailto + LinkedIn links
- [ ] og:image loads at the absolute URL (GitHub Pages is case-sensitive — check the path)
- [ ] Lighthouse/manual pass: text readable, contrast OK, no horizontal scroll on mobile
