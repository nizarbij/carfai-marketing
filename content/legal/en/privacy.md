# CarFai Privacy Policy

**Effective date**: 2026-05-20
**Last updated**: 2026-05-20

This Privacy Policy describes how **CarFai** ("CarFai", "we", "us", "our") collects, uses, shares, and protects information when you use the CarFai mobile application and any related services (collectively, the "Service").

By using the Service you agree to the collection and use of information in accordance with this Policy. If you do not agree, do not use the Service.

## 1. Information we collect

### 1.1 Information you provide directly

- **Account information** — email address, password (stored as a hash never visible to us), display name, language preference, country/region, optional profile photo.
- **Authentication identifiers from third-party providers** — when you sign in with Apple, Google, or Microsoft, we receive your name, email, and a stable provider-issued identifier. We never receive your provider password.
- **Vehicle information** — make, model, year, trim, color, VIN, registration number, mileage, purchase price/date, condition, modifications, optional photos. For B2B fleet accounts: vehicle organization assignments and assigned drivers.
- **Documents** — invoices, registration documents, insurance documents, repair receipts, and other vehicle-related documents you choose to upload. We extract structured information (amount, vendor, date, category) using AI processing as described in Section 4.
- **Subscription data** — your subscription tier and status, retrieved from RevenueCat which interfaces with Apple App Store / Google Play. We do **not** store your payment card details — those are held only by Apple/Google.
- **Communications** — feedback, support requests, and any messages you send us.

### 1.2 Information collected automatically

- **Usage data** — features accessed, screens viewed, time-on-screen, error events. Used to improve the product and diagnose issues. We do not build behavioral advertising profiles.
- **Device information** — device model, operating system version, language, region, app version, mobile network operator (coarse).
- **Crash and performance data** — when the app crashes or hits a performance issue, we collect a stack trace and device context (no document or vehicle data is included).
- **OBD2 data** (only if you connect a Bluetooth OBD2 adapter to the Service) — diagnostic trouble codes (DTCs), engine sensor readings, trip data. Stored on your device and (with your consent) synced to our servers for analytics and the AI Advisor's use.
- **AI Advisor conversation data** — the prompts you send to the in-app AI Advisor and the responses returned. Used to provide the service and to improve the prompt quality. See Section 4.

### 1.3 Information we do NOT collect

- We do **not** request continuous GPS / precise location from your device. We do **not** ask for or use the iOS / Android location permission.
- However, **OBD2 trip data you choose to sync may indirectly contain location-inferable information**. OBD2 vehicles report sensor readings (speed, fuel rate, RPM, mileage delta) over time. When stored, those time-series can be reverse-engineered into approximate position-over-time even though we never query GPS. If you connect an OBD2 adapter and enable trip sync, treat the synced data as location-inferable. You can disable OBD2 sync at any time in Settings.
- We do **not** access your phone's microphone or contacts.
- We do **not** read your SMS, email, or messaging apps.
- We do **not** use the Android Advertising ID (`AD_ID`); the permission is explicitly blocked.

## 2. How we use information

We use the information we collect to:

- Provide and maintain the Service, including authentication, vehicle and document management, and AI-powered features.
- Process subscription transactions and manage your subscription state.
- Send transactional communications (welcome email, subscription receipts, password reset, security alerts). You cannot opt out of these without losing access to the Service. We do not send marketing communications without your explicit opt-in.
- Diagnose technical issues and improve product quality (crash reports, anonymized usage analytics).
- Comply with legal obligations and respond to valid government requests.
- Detect, prevent, and respond to fraud, security incidents, and abuse.

We do **not** sell your personal information to third parties. We do **not** use your data to train third-party AI models on our behalf — see Section 4.

## 3. Third-party processors (sub-processors)

The Service is built on top of several third-party processors. Each is bound by contractual data protection obligations consistent with this Policy. The list as of the effective date:

| Processor | Purpose | Data shared | Region | Privacy link |
|---|---|---|---|---|
| **Anthropic, PBC** | AI processing (Claude API) for AI Advisor, document classification, maintenance recommendations | Vehicle metadata, document text/images, conversation prompts, OBD2 readings (when relevant to a query) | United States | https://www.anthropic.com/legal/privacy |
| **Supabase Inc.** | Database, authentication, storage (your account, vehicles, documents) | All data described in Section 1 except payment card details | United States (provisioned region as of 2026-05-20) | https://supabase.com/privacy |
| **RevenueCat, Inc.** | Subscription state management (interfaces with Apple/Google) | Subscription tier, purchase history, an opaque ID linking you to Apple/Google | United States | https://www.revenuecat.com/privacy |
| **Resend Inc.** | Transactional email delivery (welcome, receipts, password reset) | Email address, language preference, transactional content | United States | https://resend.com/legal/privacy-policy |
| **Sentry (Functional Software, Inc.)** | Crash and error reporting (mobile + edge functions) | Stack traces, device context, opaque user ID — never document or vehicle data | United States | https://sentry.io/privacy/ |
| **PostHog Inc.** | Product analytics (screens viewed, time-on-screen, activation events) | Anonymized usage events, opaque user ID | United States | https://posthog.com/privacy |
| **Apple Inc.** | App Store distribution, In-App Purchase processing (iOS) | Subscription state, IAP events; payment card details remain with Apple | United States | https://www.apple.com/legal/privacy/ |
| **Google LLC** | Play Store distribution, Play Billing processing (Android), OAuth sign-in | Subscription state, IAP events, OAuth identity (if used); payment card details remain with Google | United States | https://policies.google.com/privacy |
| **Microsoft Corp.** | OAuth sign-in (if used) | OAuth identity | United States | https://privacy.microsoft.com |

We will notify you (via email and in-app banner) at least 30 days before adding any sub-processor that processes your Personal Data, with the opportunity to terminate your account before the change takes effect.

## 4. AI processing — special disclosure

CarFai uses **Anthropic's Claude** (a large language model) to power:
- The AI Advisor (questions about your vehicle, maintenance recommendations, valuation analysis).
- Document classification and structured extraction (when you scan a receipt, invoice, or registration document).
- Maintenance calendar generation.
- Multi-vehicle / fleet analysis (B2B tiers).

When you use these features:
- We send Anthropic the relevant context: your question, the vehicle metadata (make/model/year/mileage etc.), document content (text and images), and OBD2 readings when relevant to your query.
- Anthropic processes the request under their **Commercial Customer Terms**, which prohibit them from using the data to train their models.
- We do **not** send Anthropic your authentication credentials, payment information, or contact details (other than your opaque user ID).
- Anthropic may temporarily retain prompts and outputs for safety classification, abuse detection, and operational diagnostics. See Anthropic's Privacy Policy for retention specifics.

**Outputs from the AI Advisor are AI-generated and may be incorrect, incomplete, or out of date.** Treat them as informational guidance, not professional advice. See `/ai-disclosure` for the full caveat.

### 4.1 Three-layer data strategy for AI features

When the AI Advisor answers a question (especially a value, cost, or comparison question), it draws from THREE distinct data layers in priority order:

1. **Your own vehicle data** — the vehicle metadata, documents, OBD2 readings, and conversation history you have personally added to CarFai. Highest signal, fully under your control. Stored in your private account; never shared with other users.

2. **Anonymous community benchmarks** — aggregate statistics across all CarFai users with the same make/model/year/region. Examples: median purchase price, average insurance cost, typical maintenance interval. Retrieved via SECURITY DEFINER SQL functions (`get_carfai_market_data`, `get_carfai_financial_benchmark`) that **return aggregates only** — never individual rows, prices, or user identifiers. **Anonymization standard**: aggregate functions return statistical roll-ups at the make / model / year / region cohort level only; individual user records, prices, or identifiers are never returned in API responses. We apply minimum cohort-size thresholds and statistical-disclosure controls intended to prevent re-identification from aggregate responses, consistent with Quebec Law 25 s. 28 anonymization requirements. You CANNOT be re-identified from a benchmark response.

3. **Web search content** (when relevant) — for time-sensitive context (e.g., current fuel prices, recent recalls, market shifts), the AI Advisor may retrieve a small number of public web pages via Anthropic's Claude web search tool. The fetched content is processed under the same Commercial Customer Terms as the rest of our Anthropic usage (no model training; standard operational-log retention) and is treated as untrusted input (per Section L.2 prompt-injection defenses) — never written to your CarFai account.

You may opt out of contributing to the community benchmark layer (#2) at any time in Settings → Privacy. Your data will be excluded from future benchmark queries on a best-effort basis (existing snapshots in benchmark caches expire within 30 days).

### 4.2 Anonymous community benchmarks — what is shared

If you do **not** opt out, CarFai uses your vehicle metadata + financial fields to compute aggregate statistics that other users querying the same make/model/year/region can read. Specifically:

| Field used in aggregates | What is shared |
|---|---|
| Make, Model, Year, Country | Used as the cohort key; not visible alone |
| `purchase_price`, `purchase_date` | Aggregated into median/average/min/max for the cohort |
| `current_mileage` | Aggregated into average for cohort |
| `monthly_insurance`, `monthly_loan_payment`, `monthly_parking`, `monthly_fuel_estimate`, `yearly_registration_fee` | Each aggregated separately into median/average for cohort |
| `reliability_rating` | Aggregated into average |

Outputs are returned as aggregate JSON like `{ avg_price, median_price, sample_size, ... }`. Your individual values are never exposed in API responses.

### 4.3 Manager performance scoring (B2B fleet accounts)

Manager performance scoring is being introduced in CarFai v1 for B2B fleet accounts. The full algorithm specification (weighted categories, inputs, output range, visibility scope), the Quebec Law 25 s. 12.1 automated-decision notice, and the human-review request flow will be added to this Policy — and surfaced in the in-app B2B onboarding — before the feature is enabled for any account. Until that update is published, no manager performance scoring takes place and no manager-scoring outputs are produced.

### 4.4 Right to request human review of AI decisions

For users in Quebec (Law 25 s. 12.1) and the EEA / UK (GDPR Art. 22), you have the right not to be subject to a solely-automated decision with legal or significant effects on you. The AI Advisor's outputs in CarFai are **informational** (recommendations, valuations, maintenance suggestions) — they are not legally binding decisions. However, if you believe an AI Advisor output materially affected a decision you made, you may request human review by contacting carfai.info@gmail.com with the analysis identifier (visible at the bottom of every Detailed Analysis output).

We will respond within 30 days. The review is performed by CarFai personnel (the founder, in v1; the support team thereafter).

## 5. Legal bases for processing (GDPR / UK GDPR / Swiss FADP)

For users in the EEA / UK / Switzerland, the legal bases on which we rely:
- **Performance of a contract** — operating your account, providing the features you've asked for.
- **Legitimate interests** — diagnosing crashes, improving product quality, fraud prevention. We weight these against your fundamental rights and offer opt-out where reasonable.
- **Consent** — for any optional features that require it (e.g., enabling OBD2 trip syncing).
- **Compliance with legal obligations** — responding to valid legal process.

You may withdraw consent for consent-based processing at any time without affecting the lawfulness of prior processing.

## 6. Data retention

| Data category | Retention |
|---|---|
| Account information | While the account is active + 30 days after deletion request, then permanently deleted (with backup purge within an additional 30 days) |
| Vehicle and document data | While the account is active + 30 days after deletion request |
| Subscription history | 7 years (tax / accounting compliance) |
| AI conversation logs | 90 days (then deleted, except aggregated non-identifiable usage statistics) |
| Crash and performance data | 90 days |
| Communications with support | 3 years (warranty / dispute resolution) |
| Audit logs (security, B2B org actions) | 2 years |

You can request immediate deletion of your account and data at any time via the in-app "Delete account" flow (Section 7).

## 7. Your rights

Depending on your jurisdiction, you have some or all of the following rights:

- **Access** — request a copy of the personal data we hold about you. Available in-app via "Export my data" (returns a signed JSON bundle).
- **Rectification** — correct inaccurate data. Most fields are editable in-app; for fields that aren't, contact us.
- **Erasure ("right to be forgotten")** — delete your account and data. Available in-app via "Delete account".
- **Restriction** — temporarily limit our processing pending a dispute.
- **Portability** — receive your data in a machine-readable format (the "Export my data" bundle is JSON).
- **Objection** — object to processing based on legitimate interests.
- **Withdraw consent** — for any consent-based processing.
- **Not be subject to solely-automated decisions with legal effect** — we do not make solely-automated decisions with legal or similarly significant effects on you. The AI Advisor provides information, not legally-binding decisions.
- **Lodge a complaint with a supervisory authority** — your local data protection regulator (e.g., ICO in the UK, CNIL in France, EDPB in the EU).

**California residents (CCPA/CPRA)** also have the right to know what categories of personal information are collected, the categories of sources, the purposes of use, and the categories of third parties with whom data is shared (covered above), and the right to opt out of "sale" or "sharing" of personal information. **CarFai does not sell or share personal information for cross-context behavioral advertising.** You can confirm this and exercise the related opt-out at any time from **Settings → About → Do Not Sell or Share My Personal Information**.

**Other US state residents (added 2026-05-18 — M1.10)** — Texas (TDPSA, eff. 2024), Colorado (CPA), Connecticut (CTDPA), Virginia (VCDPA), Utah (UCPA), Oregon (OCPA), Montana (MTCDPA), Indiana (INCDPA), Tennessee (TIPA), Iowa (ICDPA), Delaware (DPDPA), New Hampshire (NHPA), New Jersey (NJDPL) and other state comprehensive privacy laws confer substantially the same rights as the EU baseline above: access, deletion, correction, portability, and opt-out of targeted advertising / sale / profiling for significant decisions. **CarFai does not engage in targeted advertising, does not sell personal information, and does not use personal information for profiling with legal or similarly significant effects.** To exercise any of these rights, contact carfai.info@gmail.com or use the in-app **Settings → About → Do Not Sell or Share My Personal Information** entry.

**UAE PDPL / Saudi PDPL / Egypt DPL** — equivalent rights to access, rectification, deletion, and objection apply. We comply with the local supervisory authority's requirements in each country.

To exercise any right, contact carfai.info@gmail.com. We respond within 30 days (or the period required by your jurisdiction's law if shorter).

## 8. International data transfers

CarFai's primary servers are located in the **United States** (region us-east-1, via Supabase) and Anthropic's API is also US-hosted. If you access the Service from outside the United States, your data will be transferred to and processed in the US.

For users in the EEA / UK / Switzerland, we rely on:
- The European Commission's **Standard Contractual Clauses (SCCs)** with our US sub-processors, supplemented by appropriate technical and organizational measures.
- The **UK Addendum** to the SCCs for UK data subjects.
- The **Swiss FADP** equivalent assessment.

CarFai currently uses US-based infrastructure exclusively. If we provision dedicated EU regional infrastructure in the future, this Policy will be updated and EEA users routed accordingly.

## 9. Security

We implement reasonable technical and organizational measures appropriate to the sensitivity of the data, including:
- Encryption in transit (TLS 1.2+) and at rest (provider-managed encryption on Supabase).
- Row-level security (RLS) on all multi-tenant data; users can only access their own data and (in B2B mode) their organization's data per role-based access controls.
- Production access logged and audited; secrets rotated per `docs/SECRETS_ROTATION.md`.
- Pre-launch security review and ongoing dependency vulnerability scanning.
- Designed against the OWASP Mobile Top 10 risks.

No security control is perfect. If we become aware of a personal data breach affecting your data, we will notify you and the relevant supervisory authority within the timeframes required by law (72 hours under GDPR for high-risk breaches).

## 10. Children's privacy

CarFai is **not directed at children under 13** (or the equivalent age of consent in your jurisdiction). We do not knowingly collect personal information from children under that age. If you believe a child has provided us with personal information, contact us and we will delete it.

## 11. Cookies (web only)

The CarFai mobile app does not use cookies. The CarFai marketing website (`carfai.app` and any subdomains) uses essential cookies for site operation. See the separate Cookie Policy at `https://carfai.app/cookies`.

## 12. Third-party links

The Service may contain links to third-party websites (e.g., to Apple/Google subscription management). We are not responsible for the privacy practices of those sites. Review their policies separately.

## 13. Changes to this Policy

We may update this Policy from time to time. The "Last updated" date at the top will reflect any changes. For material changes affecting your rights, we will notify you via email and require re-acceptance in-app before continuing to use the Service.

## 14. Contact

- **General privacy inquiries**: carfai.info@gmail.com
- **Data Protection Officer (GDPR)**: carfai.info@gmail.com
- **Quebec Privacy Officer (Loi 25 s. 3.1)**: Nizar Bijjou — carfai.info@gmail.com
- **Postal address**: `CarFai, address available on request via carfai.info@gmail.com`
- **EEA representative (GDPR Article 27)**: not yet designated. EEA data subjects may contact CarFai directly at carfai.info@gmail.com for any privacy inquiry.
- **UK representative (UK GDPR Article 27)**: not yet designated. UK data subjects may contact CarFai directly at carfai.info@gmail.com for any privacy inquiry.

---

## Revision history

| Version | Date | Notes |
|---|---|---|
| v1 | 2026-05-20 | Initial publication. |
