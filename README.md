# SummitBuild Construction Website

A simple, modern, multi-page responsive website for a small construction company.

Default version is set as BG-ready structure (lang="bg") so you can add your own Bulgarian content directly.

## Pages

- Home
- Services
- Projects
- Contact
- EN Home (`en-index.html`)
- EN Services (`en-services.html`)
- EN Projects (`en-projects.html`)
- EN Contact (`en-contact.html`)

## Tech

- HTML5
- CSS3
- Vanilla JavaScript

## Run Locally

Use one of these options:

1. Open `index.html` directly in a browser.
2. Start a local static server from this folder.

Example with Python:

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Notes

- The contact form is front-end only and not connected to a backend.
- Replace company text, contact details, and project examples with real data before publishing.
- Service cards auto-link to matching project cards on the Projects page.
- Replace placeholder images in assets/images/services and assets/images/projects with your real photos.
- Home pages include a small slideshow; replace placeholder images in assets/images/hero.
