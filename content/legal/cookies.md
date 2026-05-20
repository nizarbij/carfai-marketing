# CarFai Cookie Policy (web)

**Effective date**: 2026-05-20

This Cookie Policy explains how `CarFai` ("CarFai", "we") uses cookies and similar technologies on the CarFai marketing website (`carfai.app`).

## What are cookies

Cookies are small text files placed on your device by websites you visit. They are used to make websites work, improve user experience, and provide information to website owners.

Similar technologies covered by this Policy include:
- Local storage / sessionStorage (browser-side data)
- Web beacons / pixel tags
- Server-side session identifiers

## What we use cookies for

CarFai's marketing website uses cookies in these categories:

### 1. Strictly necessary

These cookies are essential for the site to function. They cannot be disabled.

| Cookie | Purpose | Retention |
|---|---|---|
| `carfai_session` | Maintains your session on `/contact` form submission, `/support` portal | Session-only (deleted when you close the browser) |
| Cloudflare / hosting CDN cookies | Distributed-denial-of-service protection, region-routing | Up to 30 days |

### 2. Analytics (subject to consent)

These cookies help us understand how visitors use the marketing site. We will request your consent before setting them.

| Cookie | Purpose | Retention |
|---|---|---|
| PostHog `ph_*` cookies | Anonymous page-view analytics, conversion tracking on the `/pricing` → `/signup` funnel | Up to 90 days |

### 3. Functional preferences (subject to consent)

| Cookie | Purpose | Retention |
|---|---|---|
| `carfai_locale` | Remembers your language preference (`en`, `fr`, `es`, `ar`) | 1 year |
| `carfai_consent` | Remembers your cookie consent choices | 1 year |

### 4. NOT used

We do **not** use:
- Third-party advertising cookies (no Google Ads, Facebook Pixel, etc.)
- Cross-site tracking cookies
- Behavioral profiling for advertising

## Your choices

When you first visit `carfai.app`, a cookie consent banner asks for your preference. You can:
- **Accept all** — strictly necessary + analytics + functional
- **Reject non-essential** — strictly necessary only
- **Customize** — pick categories individually

You can change your preferences any time at `https://carfai.app/cookies/preferences` (link in the footer).

You can also block or delete cookies via your browser settings:
- [Chrome](https://support.google.com/chrome/answer/95647)
- [Safari](https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac)
- [Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox)
- [Edge](https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)

Blocking strictly-necessary cookies will prevent some site features (contact form, support portal) from working. We won't track you for blocking them.

## Mobile app

The **CarFai mobile application** (iOS + Android) does NOT use cookies. The app uses platform-native secure storage for authentication tokens and user preferences:
- iOS: Keychain (via `@react-native-async-storage/async-storage`)
- Android: encrypted AsyncStorage

These are NOT cookies and are governed by the [Privacy Policy](/privacy), not this Policy.

## Updates

We may update this Policy. Material changes will be notified via the cookie consent banner re-prompt. The "Effective date" at the top reflects the most recent revision.

## Contact

- General privacy: privacy@carfai.app
- Postal: `CarFai, address available on request via privacy@carfai.app`

---

## Revision history

| Version | Date | Notes |
|---|---|---|
| v1 | 2026-05-20 | Initial publication. |
