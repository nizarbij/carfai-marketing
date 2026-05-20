# CarFai AI Disclosure

> ⚠️ **v0 DRAFT — NOT FOR PUBLICATION.** For lawyer review only.

**Effective date**: [Effective Date]

This AI Disclosure supplements the CarFai Privacy Policy and Terms of Service. It explains how CarFai uses artificial intelligence and the limits you should keep in mind.

## 1. We use Anthropic Claude

CarFai uses **Claude**, an AI system developed by **Anthropic, PBC**, to power several features:

| Feature | What Claude does |
|---|---|
| AI Advisor (chat) | Answers questions about your vehicle in natural language |
| AI Advisor (Detailed Analysis) | Generates structured analysis: condition score, recommendations, KPIs |
| Document scanner | Reads invoices, receipts, registration documents and extracts structured fields (amount, vendor, date, category) |
| Maintenance calendar | Generates a 12-month service calendar based on your vehicle and usage |
| Multi-vehicle / fleet analysis (B2B) | Cross-vehicle insights for fleet operators |
| Vehicle valuation (when implemented) | Estimates resale value combining cross-user data and market signals |

## 2. What we send Claude

For each AI request, we send Claude:
- **Vehicle metadata you've entered** (make, model, year, mileage, etc.)
- **Document content** (text + image when you scan a document) — only the document you're acting on
- **Your specific question or prompt**
- **Recent OBD2 readings** (when relevant to a maintenance or diagnostic query)
- **An opaque user ID** (a UUID — not your name, email, phone, or address)

We do **not** send Claude:
- Your password or any authentication credential
- Your payment card information (CarFai never has this)
- Your contacts, photos library, microphone, or location
- Other users' data — every request is scoped to your data only (B2B: scoped to your organization based on your role)

## 3. How Anthropic uses your data

Anthropic processes our requests under **Commercial Customer Terms**. Under those terms:
- Anthropic does **not** train its models on our customer data.
- Anthropic may temporarily retain prompts and outputs for safety classification, abuse detection, and operational diagnostics.
- Standard retention is up to 30 days for operational logs, with shorter retention for the prompt content itself.

For Anthropic's full privacy practices, see https://www.anthropic.com/legal/privacy.

## 4. AI outputs are not advice — important caveats

**The AI Advisor produces informational content, not professional advice.**

AI-generated outputs may:
- **Contain factual errors** ("hallucinations") that look authoritative.
- **Be out of date** with respect to recalls, regulations, prices, or model-specific issues.
- **Miss vehicle-specific exceptions** (a generic answer that doesn't apply to your specific trim, region, or model year).
- **Be biased** based on the training data and the way you phrase a question.

**Do not rely on the AI Advisor as the sole basis for:**
- Driving safety decisions ("is this car safe to drive?")
- Medical, legal, financial, tax, or insurance advice
- Vehicle purchase, sale, trade-in, or insurance valuations
- Decisions where an error could cause material harm or loss

**Always verify** AI Advisor responses against:
- Your vehicle's owner's manual and manufacturer service bulletins
- A qualified mechanic for safety / mechanical questions
- Authoritative regulatory sources (EPA, NHTSA, equivalents in your country) for regulatory questions
- A licensed appraiser, accountant, lawyer, or financial advisor for valuations and other professional matters

## 5. Vehicle valuation disclaimer

**[FORTHCOMING WHEN VALUATION FEATURE SHIPS — see RELEASE_PLAN.md Section K]**

When the AI Advisor estimates a vehicle's value, the output is an **estimate** based on:
- Aggregate purchase prices from CarFai users with the same make/model/year
- Market context fetched from public sources
- Vehicle condition information you provide (mileage, damage history, options)

The estimate is **not a formal appraisal**. Actual transaction prices may differ materially. Do not use AI valuations as the sole basis for sale, purchase, insurance, financing, or tax decisions.

## 6. Prompt injection and adversarial input

The AI Advisor is hardened against common prompt-injection attacks (system / user prompt separation, untrusted-content tagging, output validation, pattern pre-screening). Despite these defenses, no AI system is completely immune to adversarial input. If you encounter:
- An AI response that appears to leak data from another user
- A response that ignores its instructions or behaves out of character
- Any unusual or alarming behavior

Please report it to `[Email: security@carfai.app]` immediately. We treat such reports seriously and respond within 24 hours.

## 7. Your rights regarding AI processing

- **Opt-out** — you may opt out of AI features by not using the AI Advisor / scanner. Free-tier features that don't depend on AI continue to work.
- **Deletion** — when you delete your account, we delete your AI conversation history per the Privacy Policy retention schedule.
- **Access** — your AI conversation history is included in the "Export my data" bundle (Privacy Policy §7).
- **Object to AI use** — under GDPR Article 22, you have the right not to be subject to solely-automated decisions with legal effects. CarFai's AI features provide information, not legally binding decisions; if you have a specific concern, contact `[Email: privacy@carfai.app]`.

## 8. Updates

This Disclosure will be updated as our AI use evolves (new features, new models, new third-party AI providers). Material changes will be notified via email and require re-acceptance.

## 9. Contact

- General AI questions: `[Email: support@carfai.app]`
- Privacy: `[Email: privacy@carfai.app]`
- Security: `[Email: security@carfai.app]`

---

## Revision history

| Version | Date | Notes |
|---|---|---|
| v0 (DRAFT) | [Effective Date] | First lawyer-review draft. Not yet published. |
