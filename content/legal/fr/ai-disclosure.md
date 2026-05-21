> ⚠ Cette traduction est générée par IA et fournie à titre informatif uniquement. La version anglaise officielle prévaut en cas de divergence.

# Déclaration sur l'IA de CarFai

> ⚠️ **PROJET v0 — NON DESTINÉ À LA PUBLICATION.** Pour examen juridique uniquement.

**Date d'entrée en vigueur** : 2026-05-20

La présente Déclaration sur l'IA complète la Politique de confidentialité et les Conditions d'utilisation de CarFai. Elle explique comment CarFai utilise l'intelligence artificielle et les limites dont vous devez tenir compte.

## 1. Nous utilisons Anthropic Claude

CarFai utilise **Claude**, un système d'IA développé par **Anthropic, PBC**, pour alimenter plusieurs fonctionnalités :

| Fonctionnalité | Ce que fait Claude |
|---|---|
| AI Advisor (chat) | Répond aux questions sur votre véhicule en langage naturel |
| AI Advisor (Analyse détaillée) | Génère une analyse structurée : score d'état, recommandations, indicateurs clés de performance (KPI) |
| Scanner de documents | Lit les factures, les reçus, les documents d'immatriculation et en extrait des champs structurés (montant, fournisseur, date, catégorie) |
| Calendrier d'entretien | Génère un calendrier d'entretien sur 12 mois en fonction de votre véhicule et de votre utilisation |
| Analyse multi-véhicules / de flotte (B2B) | Informations inter-véhicules pour les gestionnaires de flotte |
| Évaluation du véhicule (lorsque la fonctionnalité sera mise en œuvre) | Estime la valeur de revente en combinant les données inter-utilisateurs et les signaux du marché |

## 2. Ce que nous envoyons à Claude

Pour chaque requête d'IA, nous envoyons à Claude :
- **Les métadonnées du véhicule que vous avez saisies** (marque, modèle, année, kilométrage, etc.)
- **Le contenu du document** (texte + image lorsque vous numérisez un document) — uniquement le document sur lequel vous agissez
- **Votre question ou instruction (prompt) spécifique**
- **Les relevés OBD2 récents** (lorsque cela est pertinent pour une demande d'entretien ou de diagnostic)
- **Un identifiant utilisateur opaque** (un UUID — pas votre nom, votre adresse électronique, votre numéro de téléphone ou votre adresse)

Nous n'envoyons **pas** à Claude :
- Votre mot de passe ou tout autre identifiant d'authentification
- Les informations de votre carte de paiement (CarFai ne les détient jamais)
- Vos contacts, votre photothèque, votre microphone ou votre localisation
- Les données d'autres utilisateurs — chaque requête est limitée à vos seules données (B2B : limitée à votre organisation en fonction de votre rôle)

## 3. Comment Anthropic utilise vos données

Anthropic traite nos requêtes conformément à ses **Conditions pour les clients commerciaux**. Selon ces conditions :
- Anthropic n'entraîne **pas** ses modèles sur les données de nos clients.
- Anthropic peut conserver temporairement les instructions (prompts) et les résultats à des fins de classification de sécurité, de détection d'abus et de diagnostic opérationnel.
- La durée de conservation standard est de 30 jours maximum pour les journaux opérationnels, avec une durée de conservation plus courte pour le contenu de l'instruction (prompt) lui-même.

Pour connaître l'intégralité des pratiques de confidentialité d'Anthropic, consultez https://www.anthropic.com/legal/privacy.

## 4. Les résultats de l'IA ne constituent pas des conseils — mises en garde importantes

**L'AI Advisor produit un contenu à titre informatif, et non des conseils professionnels.**

Les résultats générés par l'IA peuvent :
- Contenir des erreurs factuelles (« hallucinations ») qui semblent faire autorité.
- Être obsolètes en ce qui concerne les rappels, les réglementations, les prix ou les problèmes spécifiques à un modèle.
- Omettre des exceptions spécifiques au véhicule (une réponse générique qui ne s'applique pas à votre version, région ou année de modèle spécifique).
- Être biaisés en fonction des données d'entraînement et de la manière dont vous formulez une question.

**Ne vous fiez pas à l'AI Advisor comme unique fondement pour :**
- Les décisions relatives à la sécurité de conduite (« cette voiture est-elle sûre à conduire ? »)
- Des conseils médicaux, juridiques, financiers, fiscaux ou en matière d'assurance
- L'évaluation d'un véhicule en vue d'un achat, d'une vente, d'une reprise ou d'une assurance
- Les décisions pour lesquelles une erreur pourrait causer un préjudice ou une perte matériels

**Vérifiez toujours** les réponses de l'AI Advisor en les comparant avec :
- Le manuel du propriétaire de votre véhicule et les bulletins de service du fabricant
- Un mécanicien qualifié pour les questions de sécurité ou de mécanique
- Des sources réglementaires faisant autorité (EPA, NHTSA ou leurs équivalents dans votre pays) pour les questions de réglementation
- Un évaluateur, un comptable, un avocat ou un conseiller financier agréé pour les évaluations et autres questions professionnelles

## 5. Avis de non-responsabilité concernant l'évaluation du véhicule

**[À VENIR LORS DU LANCEMENT DE LA FONCTIONNALITÉ D'ÉVALUATION — voir la section K de RELEASE_PLAN.md]**

Lorsque l'AI Advisor estime la valeur d'un véhicule, le résultat est une **estimation** basée sur :
- Les prix d'achat agrégés des utilisateurs de CarFai ayant la même marque/le même modèle/la même année
- Le contexte du marché obtenu de sources publiques
- Les informations sur l'état du véhicule que vous fournissez (kilométrage, historique des dommages, options)

L'estimation n'est **pas une expertise officielle**. Les prix de transaction réels peuvent différer de manière significative. N'utilisez pas les évaluations de l'IA comme unique fondement pour les décisions de vente, d'achat, d'assurance, de financement ou fiscales.

## 6. Injection de prompt et entrées malveillantes

L'AI Advisor est renforcé contre les attaques courantes par injection de prompt (séparation des prompts système/utilisateur, marquage du contenu non fiable, validation des résultats, présélection des motifs). Malgré ces défenses, aucun système d'IA n'est complètement immunisé contre les entrées malveillantes. Si vous rencontrez :
- Une réponse de l'IA qui semble divulguer des données d'un autre utilisateur
- Une réponse qui ignore ses instructions ou se comporte de manière anormale
- Tout comportement inhabituel ou alarmant

Veuillez le signaler immédiatement à carfai.info@gmail.com. Nous traitons ces signalements avec le plus grand sérieux et répondons dans les 24 heures.

## 7. Vos droits concernant le traitement par l'IA

- **Droit de retrait** — vous pouvez vous retirer des fonctionnalités d'IA en n'utilisant pas l'AI Advisor / le scanner. Les fonctionnalités du niveau gratuit qui ne dépendent pas de l'IA continueront de fonctionner.
- **Suppression** — lorsque vous supprimez votre compte, nous supprimons l'historique de vos conversations avec l'IA conformément au calendrier de conservation de la Politique de confidentialité.
- **Accès** — l'historique de vos conversations avec l'IA est inclus dans l'ensemble de données « Exporter mes données » (Politique de confidentialité §7).
- **Opposition à l'utilisation de l'IA** — en vertu de l'article 22 du GDPR, vous avez le droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé produisant des effets juridiques. Les fonctionnalités d'IA de CarFai fournissent des informations, et non des décisions juridiquement contraignantes ; si vous avez une préoccupation spécifique, contactez carfai.info@gmail.com.

## 8. Mises à jour

La présente Déclaration sera mise à jour à mesure que notre utilisation de l'IA évolue (nouvelles fonctionnalités, nouveaux modèles, nouveaux fournisseurs d'IA tiers). Les modifications importantes seront notifiées par courrier électronique et nécessiteront une nouvelle acceptation.

## 9. Contact

- Questions générales sur l'IA : carfai.info@gmail.com
- Confidentialité : carfai.info@gmail.com
- Sécurité : carfai.info@gmail.com

---

## Historique des révisions

| Version | Date | Notes |
|---|---|---|
| v1 | 2026-05-20 | Publication initiale. |
