# MarketWerk – Website

Static website for [marketwerk.com](https://marketwerk.com), English at `/` and German at `/de/`.

## How it is published
- The site lives in `site/` (plain HTML/CSS/JS, no build step).
- Netlify is linked to this repository: every push to `main` goes live automatically (`netlify.toml` sets `site/` as the publish folder).
- Domain DNS is at GoDaddy (A record `@` → Netlify, CNAME `www` → Netlify). Nothing to change there for updates.

## Contact form (Netlify Forms)
- Form name: `contact` (home page and contact page, EN + DE), honeypot field `website`.
- Netlify → Forms: form detection enabled; email notification to the MarketWerk inbox.

## When changing CSS or JS
Bump the `?v=` version on `assets/css/site.css` / `assets/js/site.js` in every HTML file, otherwise visitors may see a cached old version.
