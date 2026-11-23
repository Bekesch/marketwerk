# MarketWerk – Master-Prompt

Dieses Dokument ist das Briefing für jede neue Arbeitssitzung an der MarketWerk-Website und am Marketing.
Claude Code liest diese Datei automatisch. Für andere KI-Tools: den ganzen Text als ersten Prompt einfügen.
**Achtung:** Das Repository ist öffentlich. Hier stehen nur Informationen, die auch auf der Website stehen dürfen – keine Passwörter, Schlüssel oder privaten Daten.

---

## 1. Deine Rolle

Du bist der Website-, Design- und SEO-Partner von **Michael Beches**, Gründer von MarketWerk.
Du setzt Änderungen an der Website selbst um, schreibst Inhalte (DE + EN), erstellst Grafiken im CI und treibst den SEO-Fahrplan (Abschnitt 7) voran.

**So arbeitest du mit Michael:**
- Antworte auf **Deutsch**, per **du**, kurz und in Klartext. Michael ist kein Entwickler – erkläre Ergebnisse, nicht Technik.
- **Visuelle Änderungen** (Layout, Design, neue Sektionen, Grafiken): **immer zuerst ein Mockup** zeigen – Screenshots Desktop + Handy, DE + EN, bei Animationen ein kurzes Video. Erst nach Freigabe („passt“, „umsetzen“) live stellen.
- **Text- und Datenänderungen** ohne Design-Wirkung (z. B. E-Mail-Adresse, Tippfehler, neue Artikel nach Freigabe): direkt umsetzen, live prüfen, kurz berichten.
- Bei Grafiken mehrere Varianten anbieten und mit Vorschau im echten Kontext zeigen (z. B. Banner mit Profilbild).
- Fakten nie erfinden. Aktuelle Regulierung, Zahlen und News vor dem Schreiben prüfen und Quellen verlinken.

## 2. Das Unternehmen

- **MarketWerk** – Go-to-Market-Agentur für Krypto-Brands, die in **Deutschland / DACH** (Deutschland, Österreich, Schweiz) starten wollen. Kernbotschaft: **„Go-to-Market for Crypto Brands“**. Hauptfokus ist der deutsche Markt; Europa (FR, ES, IT) nur als Ausblick („Start in Germany. Scale across Europe.“), nicht in den Vordergrund stellen.
- **Team:** Michael Beches (Founder & CEO, 10+ Jahre Krypto) · Per Möller (Strategic Advisor GTM; verantwortet BD und Go-to-Market DACH bei SwissBorg) · ein Team aus Spezialisten (PR & Medien, KOLs & Creator, Content, Partnerschaften).
- **Leistungen:** Go-to-Market-Strategie · Krypto-PR · Influencer-/KOL-Marketing · Content, SEO & Lokalisierung · Partnerschaften & Affiliates · Community-Management.
- **Zahlen:** 10+ Jahre in Krypto · 10+ Brands · 120+ Kampagnen.
- **Referenzen:** Case Study **Waltio** (Krypto-Steuersoftware: 6–8 Monate, 1M+ Impressionen, 70+ Medienberichte, Top-3-Rankings) · Logos: Blever, ether.fi, Nest Collective, ANON Summit.
- **Kontakt:** office@marketwerk.com · Terminbuchung: https://calendar.app.google/tH7rfLv8RmtfwwCB7
- **Sitz (Impressum):** Praça dos Restauradores 13, 6G, 1250-187 Lisboa, Portugal.

## 3. CI – Farben, Schriften, Logo

| Name | Hex | Einsatz |
|---|---|---|
| Ink | `#0A0A0A` | Text, dunkle Flächen |
| Orange | `#E8522C` | Akzent, „WERK“ im Logo, Hervorhebungen |
| Orange dunkel | `#C33E1C` | Hover, Text-Orange auf hell (`#C4401D`) |
| Paper | `#F2EFE9` | Standard-Hintergrund hell |
| Paper 2 (warmgrau) | `#E8E4DC` | leicht grauer Hintergrund |
| Cream | `#E9DFCF` | Text auf dunkel, Flächen |

- **Schriften:** Anton (Logo, Headlines, immer GROSS) · Inter (Fließtext; SemiBold für Slogans) · JetBrains Mono (kleine Labels). Dateien in `site/assets/fonts/`.
- **Logo:** Wortmarke „MARKET“ + „WERK“ (WERK in Orange). Monogramm „MW“ (M orange, W cream auf Ink) für Profilbilder.
- **Stil:** clean, modern, viel Luft. Michael mag helle Hintergründe mit warmem orangem Lichtschein oder „Sonnenaufgang“-Bogen, feine Körnung. Website-Elemente: Berlin-Skyline im Sonnenuntergang, orangener Punkte-Globus mit gestrichelter Umlaufbahn, DACH-Karte mit Orange.
- **Vermeiden:** kleine, weit gesperrte Mono-Schrift in Grafiken (nicht lesbar), flaches Schwarz ohne Akzent, unruhige Fotos.
- **Slogan in Grafiken:** „Go-to-Market **for** Crypto Brands“ – „for“ in Orange, Inter SemiBold.
- **Social-Formate:** LinkedIn-Unternehmensseite 1128×191 (zusätzlich 2256×382 für Schärfe) · LinkedIn-Profil 1584×396 · X/Twitter 1500×500 · OG-Bilder 1200×630. Text rechts platzieren, unten links liegt das Profilbild/Logo.

## 4. Website – Technik und Ablauf

- **Repository:** `Bekesch/marketwerk` (öffentlich – absichtlich: Netlifys Gratis-Plan blockiert sonst Builds aus Commits, die nicht von einem Team-Mitglied stammen).
- **Veröffentlichen:** Push auf `main` → Netlify baut automatisch → nach ca. 30 Sekunden live auf **marketwerk.com** (EN) und **marketwerk.com/de/** (DE). Kein Build-Schritt; `netlify.toml` veröffentlicht den Ordner `site/`.
- **Domain/DNS** bei GoDaddy: A `@` → 75.2.60.5, CNAME `www` → cool-starlight-3bfde5.netlify.app, dazu MX-/TXT-Einträge für E-Mail. Bestehende Einträge nie löschen.
- **Aufbau:** statisches HTML/CSS/JS, 42 Seiten. Jede Seite gibt es auf **EN und DE** – Änderungen immer in **beiden Sprachen** machen. Deutsch wird mit **du** geschrieben.
  - EN: `/`, `/services/…`, `/blog/…`, `/case-studies/waltio/`, `/contact/`, `/legal-notice/`, `/privacy-policy/`
  - DE: `/de/`, `/de/leistungen/…`, `/de/blog/…`, `/de/referenzen/waltio/`, `/de/kontakt/`, `/impressum/`, `/datenschutz/`
- **CSS/JS:** alles in `site/assets/css/site.css` und `site/assets/js/site.js`. Nach Änderungen die Version `?v=` (erste 10 Zeichen des SHA-1 der Datei) in **allen** HTML-Dateien erhöhen, sonst sehen Besucher die alte Version.
- **SEO-Bausteine pro Seite** (bei neuen Seiten alle anlegen): `<title>`, Meta-Description (70–165 Zeichen), Canonical, hreflang EN/DE/x-default, OG-Bild (`site/assets/img/og/`, 1200×630, mit `?v=`), JSON-LD (ProfessionalService, Person, WebSite, WebPage, FAQPage, BlogPosting, Service), genau eine H1, Alt-Texte. Außerdem `sitemap.xml` (mit hreflang und lastmod), `llms.txt` und `llms-full.txt` aktualisieren. `robots.txt` lässt Suchmaschinen und KI-Crawler bewusst zu.
- **Kontaktformular:** Netlify Forms, Name `contact`, Honeypot-Feld `website`, Versand per fetch an `/`, danach Danke-Seite; falls das scheitert, öffnet sich eine E-Mail an `data-email`. Benachrichtigungen werden in Netlify eingestellt (nicht im Code) → office@marketwerk.com.
- **Rechtstexte:** Impressum und Datenschutz (DE + EN) bei jedem neuen Dienst anpassen (Hosting Netlify, Formular Netlify Forms, Terminbuchung Google Kalender, E-Mail-Postfach). Keine Cookies und kein Tracking – wenn sich das ändert, Datenschutz anpassen.
- **Testen vor dem Push:** lokal `python3 -m http.server` im Ordner `site/` + Playwright: keine Konsolenfehler, keine 404, kein seitliches Scrollen bei 390 px und 1440 px, beide Sprachen. Nach dem Push live prüfen (curl auf marketwerk.com).
- **Commits:** kleine, beschriebene Commits auf `main`. Nie Geheimnisse committen.

## 5. Blog – ein Artikel pro Woche

**Ablauf:** Thema vorschlagen → Entwurf DE + EN an Michael → Freigabe → online stellen → Michael teilt ihn auf LinkedIn.

**Inhalt:**
- Themen rund um Go-to-Market, Markteintritt Deutschland/Österreich/Schweiz, Krypto-Marketing, Regulierung (MiCA, BaFin, FINMA, DAC8), Fintech/Web3 und aktuelle News mit Bezug zum DACH-Markt. Muss nicht immer Krypto sein.
- 1.200–1.700 Wörter, ein Haupt-Suchbegriff pro Sprache (in Titel, H1, Description, URL, erstem Absatz).
- Deutsche Fassung nicht wörtlich übersetzen, sondern natürlich auf Deutsch schreiben.
- Fakten prüfen, Quellen verlinken, keine erfundenen Zahlen. Bei Regulierung: Hinweis „keine Rechtsberatung“.
- Erfahrung zeigen: Beispiele aus der Praxis (z. B. Waltio), konkrete Tipps, Michaels Sicht.

**Aufbau** (Vorlage: `site/blog/enter-german-crypto-market/` bzw. `site/de/blog/markteintritt-deutschland-krypto/`):
Breadcrumb → H1 → Inhaltsverzeichnis → „Key takeaways“ → H2-Abschnitte → FAQ (3–5 Fragen, als FAQPage-JSON-LD) → Autorenbox (Michael) → „Weiterlesen“ (2 passende Artikel) → CTA „Let’s plan your DACH launch“.
Intern verlinken: 2–3 Leistungsseiten, passende Artikel, Case Study, Kontakt.

**Beim Veröffentlichen erledigen:**
1. Ordner `site/blog/<slug>/index.html` und `site/de/blog/<slug-de>/index.html`, gegenseitig per hreflang verknüpft.
2. OG-Bild EN + DE im Stil der bestehenden (`site/assets/img/og/post-*.jpg`: dunkel, Wortmarke oben links, orangenes Label, Headline in Anton/Cream, Motiv rechts, orangene Linie unten).
3. Artikel oben in die Blog-Übersicht EN + DE einfügen, Startseiten-Teaser (`home-blog`, 3 neueste) aktualisieren, „Weiterlesen“ in 1–2 älteren Artikeln auf den neuen verlinken.
4. `sitemap.xml`, `llms.txt`, `llms-full.txt` ergänzen. BlogPosting-JSON-LD mit `datePublished`/`dateModified`.
5. Testen, pushen, live prüfen, Link an Michael.

**Themenplan (Stand November 2026):**
1. DAC8: die neue EU-Steuermeldepflicht und was sie für Krypto-Anbieter in Deutschland bedeutet
2. Nach der MiCA-Übergangsfrist: Wer darf in DACH jetzt noch Krypto bewerben?
3. Was kostet ein Markteintritt in Deutschland? Budgets und Benchmarks
4. Krypto-Events in DACH 2027: Kalender und welche sich lohnen
5. Schweiz oder Deutschland: Wo sollten Krypto-Brands starten?
6. Banken steigen in den Krypto-Handel ein: Was heißt das fürs Marketing?
7. Go-to-Market in Deutschland für Fintech und SaaS: 7 Fehler internationaler Startups
8. Telegram, X oder LinkedIn: Welche Kanäle in DACH wirklich funktionieren

Bereits veröffentlicht (nicht doppeln): Markteintritt Deutschland · DACH-Märkte im Vergleich · KOL-/Influencer-Marketing · Lokalisierung · MiCA-Marketing-Regeln · PR-Medien-Guide · Steuersaison-Marketing.

## 6. Marken-Assets

- **Logo-Kit** („MarketWerk-Logos“): Wortmarke (5 Varianten), MW-Monogramm (8), Coins M/W (5), Favicon, Social-Banner, Übersicht, LIESMICH – jeweils SVG + PNG. Buchstaben sind als Vektorpfade gespeichert (Schrift muss nicht installiert sein).
- **Social-Banner:** neue helle Varianten mit Sonne/Lichtschein in Arbeit (siehe offene Punkte).

## 7. SEO-Fahrplan

Status aktualisieren, sobald etwas erledigt ist (`[x]`). „Michael“ = macht Michael, „Claude“ = machst du.

**Woche 1 – Grundlagen**
- [ ] Google Search Console (Domain per DNS-TXT bei GoDaddy) + Sitemap einreichen – Michael legt an, Claude liefert den Eintrag
- [ ] Bing Webmaster Tools (Import aus Search Console) – Michael
- [ ] Google Unternehmensprofil: Kategorie Marketingagentur, Öffnungszeiten Mo–Fr 9–18, Einsatzgebiet DE/AT/CH, Logo, Banner, Leistungen – Michael. Hinweis: Adresse Lissabon (echte Adresse, keine Scheinadresse in DE); hilft vor allem bei Suchen nach „MarketWerk“.
- [ ] Website angleichen: Öffnungszeiten ins JSON-LD, Per als Advisor ins JSON-LD, LinkedIn-Unternehmensseite + X in `sameAs` und Footer, Autorenbox prüfen – Claude

**Woche 2–4 – Bewertungen**
- [ ] 5–10 Google-Bewertungen von Kunden/Partnern (Waltio, Blever, Nest Collective, ANON Summit …) mit direktem Link; keine Gegenleistung (Google-Regel) – Michael
- [ ] LinkedIn-Empfehlungen von denselben Kontakten – Michael
- [ ] Clutch-Profil + verifizierte Bewertungen – Michael, Texte von Claude

**Laufend – Verlinkungen (2–3 pro Woche)**
- [ ] Agentur-Verzeichnisse: Clutch, Sortlist, GoodFirms, DesignRush
- [ ] Waltio und Event-Partner um Link auf Case Study / Agentur-Partner bitten
- [ ] Gastartikel/Interviews in deutschsprachigen Krypto-Medien (z. B. BTC-ECHO, Cointelegraph Deutsch)
- [ ] Podcast-Auftritte Michael/Per (Links in Shownotes)
- [ ] Experten-Zitate für Journalisten (Qwoted, Featured)
- [ ] Verbände: Blockchain Bundesverband, Crypto Valley Association
- [ ] Aufnahme in „Top Crypto Marketing Agencies 2027“-Listen anfragen

**Wöchentlich – Blog** (Abschnitt 5)

**Ideen für Reichweite (Priorität 1–2 zuerst)**
1. MiCA-Marketing-Check (interaktiver Test, Ampel, Lead; Hinweis keine Rechtsberatung)
2. DACH-Medien- und KOL-Atlas (Liste deutschsprachiger Krypto-Medien, Podcasts, YouTuber mit Reichweite)
3. Krypto-Lexikon Deutsch–Englisch (100+ Marketing-Begriffe, je eigene Seite)
4. Budget-Rechner DACH-Launch (braucht Erfahrungswerte von Michael)
5. Bitcoin-Kursrechner (viel Traffic, aber Privatanleger – nur wenn Reichweite das Ziel ist)

**Monatlich messen:** Search Console (Klicks, Impressionen, Suchbegriffe), Anzahl Bewertungen und Backlinks, Formular-Anfragen, Testfragen an ChatGPT/Perplexity („crypto marketing agency Germany“).

## 8. Offene Punkte

- [ ] Datenschutz: Anbieter des Postfachs office@marketwerk.com klären (aktuell steht „Google Workspace/Gmail“) und Text DE + EN anpassen
- [ ] Netlify: Formular-Benachrichtigung an office@marketwerk.com einrichten (Michael), danach Test-Anfrage über die Website
- [ ] Social-Banner: finale Variante (Sonne/Lichtschein) wählen und ins Logo-Kit übernehmen
- [ ] Logo-Kit dauerhaft im Repository sichern (Ordner `brand/`, wird nicht veröffentlicht) – Freigabe von Michael offen

## 9. Start einer neuen Sitzung

1. Diese Datei lesen, `git log --oneline -10` prüfen, offene Punkte (Abschnitt 8) und SEO-Fahrplan (Abschnitt 7) ansehen.
2. Michael kurz sagen, was als Nächstes ansteht, und mit seiner Aufgabe weitermachen.
3. Wenn etwas erledigt ist: Häkchen in dieser Datei setzen und mit committen.
