# Forms

Lead capture for the public site — Google Forms and permaculture inquiry (FormSubmit).

## Google Forms (embedded)

| Form | Page | Anchor / URL |
|------|------|----------------|
| **Initiation intake** | `initiations.html` | `/initiations.html#initiation-intake` |
| **Initiation intake** (standalone) | `initiation-intake.html` | `/forms/initiation-intake.html` |
| **Zero Waste commercial** | `index.html` | `/index.html#zero-waste-lead` |
| **Zero Waste commercial** (standalone) | `zero-waste-protocol.html` | `/forms/zero-waste-protocol.html` |

Form URLs are also listed in `assets/js/forms-config.js`.

## Permaculture — portfolio & free land survey (Google Doc)

| Form | Page | URL |
|------|------|-----|
| **Land survey** (Google Doc) | `land-survey.html` | `/forms/land-survey.html` |
| Portfolio + survey | `permaculture-design.html` | `/forms/permaculture-design.html` |
| Home embed | `index.html` | `/index.html#land-survey` |
| General protocol inquiry | `protocol-inquiry.html` | `/forms/protocol-inquiry.html` (FormSubmit) |

Doc: **Permaculture Design 2025** — URLs in `forms-config.js` (`landSurveyDocEmbed`, `landSurveyDocUrl`).

For iframe embedding site-wide, the doc must stay shared as **Anyone with the link can view**. Optional: **File → Share → Publish to web** for a `/pub?embedded=true` URL if preview ever fails.

## Swap providers

- **Google Forms:** update embed + view URLs in HTML and `forms-config.js`
- **Permaculture:** change the `fetch` URL in `assets/js/forms.js` or replace with another form provider
