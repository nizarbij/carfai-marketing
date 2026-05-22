> ⚠ Cette traduction est générée par IA et fournie à titre informatif uniquement. La version anglaise officielle prévaut en cas de divergence.

# Politique de confidentialité de CarFai

**Date d'entrée en vigueur** : 2026-05-20
**Dernière mise à jour** : 2026-05-20

La présente Politique de confidentialité décrit la manière dont **CarFai** (« CarFai », « nous », « notre », « nos ») collecte, utilise, partage et protège les informations lorsque vous utilisez l'application mobile CarFai et tout service connexe (collectivement, le « Service »).

En utilisant le Service, vous consentez à la collecte et à l'utilisation des informations conformément à la présente Politique. Si vous n'êtes pas d'accord, n'utilisez pas le Service.

## 1. Informations que nous collectons

### 1.1 Informations que vous nous fournissez directement

- **Informations de compte** — adresse courriel, mot de passe (stocké sous forme de hachage jamais visible par nous), nom d'affichage, préférence linguistique, pays/région, photo de profil facultative.
- **Identifiants d'authentification de fournisseurs tiers** — lorsque vous vous connectez avec Apple, Google ou Microsoft, nous recevons votre nom, votre adresse courriel et un identifiant stable émis par le fournisseur. Nous ne recevons jamais le mot de passe de votre fournisseur.
- **Informations sur le véhicule** — marque, modèle, année, version, couleur, NIV, numéro d'immatriculation, kilométrage, prix/date d'achat, état, modifications, photos facultatives. Pour les comptes de flotte B2B : affectations des véhicules à l'organisation et conducteurs assignés.
- **Documents** — factures, documents d'immatriculation, documents d'assurance, reçus de réparation et autres documents relatifs au véhicule que vous choisissez de téléverser. Nous extrayons des informations structurées (montant, fournisseur, date, catégorie) à l'aide d'un traitement par IA, comme décrit à la Section 4.
- **Données d'abonnement** — votre niveau et statut d'abonnement, récupérés auprès de RevenueCat qui s'interface avec l'App Store d'Apple / Google Play. Nous ne stockons **pas** les détails de votre carte de paiement — ceux-ci sont conservés uniquement par Apple/Google.
- **Communications** — commentaires, demandes de soutien et tout message que vous nous envoyez.

### 1.2 Informations collectées automatiquement

- **Données d'utilisation** — fonctionnalités consultées, écrans visualisés, temps passé à l'écran, événements d'erreur. Utilisées pour améliorer le produit et diagnostiquer les problèmes. Nous ne créons pas de profils de publicité comportementale.
- **Informations sur l'appareil** — modèle de l'appareil, version du système d'exploitation, langue, région, version de l'application, opérateur de réseau mobile (approximatif).
- **Données de plantage et de performance** — lorsque l'application plante ou rencontre un problème de performance, nous collectons une trace de la pile d'exécution et le contexte de l'appareil (aucune donnée de document ou de véhicule n'est incluse).
- **Données OBD2** (uniquement si vous connectez un adaptateur Bluetooth OBD2 au Service) — codes de diagnostic (DTC), lectures des capteurs du moteur, données de trajet. Stockées sur votre appareil et (avec votre consentement) synchronisées avec nos serveurs pour l'analyse et l'utilisation par l'AI Advisor.
- **Données de conversation de l'AI Advisor** — les requêtes que vous envoyez à l'AI Advisor dans l'application et les réponses retournées. Utilisées pour fournir le service et pour améliorer la qualité des requêtes. Voir la Section 4.

### 1.3 Informations que nous ne collectons PAS

- Nous ne demandons **pas** le GPS en continu / la localisation précise de votre appareil. Nous ne demandons **pas** et n'utilisons **pas** l'autorisation de localisation d'iOS / Android.
- Cependant, **les données de trajet OBD2 que vous choisissez de synchroniser peuvent contenir indirectement des informations permettant de déduire votre localisation**. Les véhicules OBD2 rapportent des lectures de capteurs (vitesse, débit de carburant, tr/min, delta de kilométrage) au fil du temps. Une fois stockées, ces séries temporelles peuvent être rétro-analysées pour obtenir une position approximative dans le temps, même si nous n'interrogeons jamais le GPS. Si vous connectez un adaptateur OBD2 et activez la synchronisation des trajets, traitez les données synchronisées comme permettant de déduire la localisation. Vous pouvez désactiver la synchronisation OBD2 à tout moment dans les Paramètres.
- Nous n'accédons **pas** au microphone ou aux contacts de votre téléphone.
- Nous ne lisons **pas** vos SMS, courriels ou applications de messagerie.
- Nous n'utilisons **pas** l'identifiant publicitaire Android (`AD_ID`) ; l'autorisation est explicitement bloquée.

## 2. Comment nous utilisons les informations

Nous utilisons les informations que nous collectons pour :

- Fournir et maintenir le Service, y compris l'authentification, la gestion des véhicules et des documents, et les fonctionnalités alimentées par l'IA.
- Traiter les transactions d'abonnement et gérer l'état de votre abonnement.
- Envoyer des communications transactionnelles (courriel de bienvenue, reçus d'abonnement, réinitialisation de mot de passe, alertes de sécurité). Vous ne pouvez pas vous désinscrire de celles-ci sans perdre l'accès au Service. Nous n'envoyons pas de communications marketing sans votre consentement explicite.
- Diagnostiquer les problèmes techniques et améliorer la qualité du produit (rapports de plantage, analyses d'utilisation anonymisées).
- Nous conformer aux obligations légales et répondre aux demandes gouvernementales valides.
- Détecter, prévenir et répondre à la fraude, aux incidents de sécurité et aux abus.

Nous ne vendons **pas** vos informations personnelles à des tiers. Nous n'utilisons **pas** vos données pour entraîner des modèles d'IA tiers en notre nom — voir la Section 4.

## 3. Processeurs tiers (sous-traitants)

Le Service repose sur plusieurs processeurs tiers. Chacun est lié par des obligations contractuelles de protection des données conformes à la présente Politique. La liste à la date d'entrée en vigueur est la suivante :

| Processeur | Finalité | Données partagées | Région | Lien de confidentialité |
|---|---|---|---|---|
| **Anthropic, PBC** | Traitement par IA (API Claude) pour l'AI Advisor, la classification de documents, les recommandations d'entretien | Métadonnées du véhicule, texte/images des documents, requêtes de conversation, lectures OBD2 (lorsque pertinent pour une requête) | États-Unis | https://www.anthropic.com/legal/privacy |
| **Supabase Inc.** | Base de données, authentification, stockage (votre compte, véhicules, documents) | Toutes les données décrites à la Section 1, à l'exception des détails de la carte de paiement | États-Unis (région provisionnée au 2026-05-20) | https://supabase.com/privacy |
| **RevenueCat, Inc.** | Gestion de l'état de l'abonnement (s'interface avec Apple/Google) | Niveau d'abonnement, historique d'achat, un identifiant opaque vous liant à Apple/Google | États-Unis | https://www.revenuecat.com/privacy |
| **Resend Inc.** | Livraison de courriels transactionnels (bienvenue, reçus, réinitialisation de mot de passe) | Adresse courriel, préférence linguistique, contenu transactionnel | États-Unis | https://resend.com/legal/privacy-policy |
| **Sentry (Functional Software, Inc.)** | Rapports de plantage et d'erreurs (mobile + fonctions edge) | Traces de pile, contexte de l'appareil, identifiant utilisateur opaque — jamais de données de document ou de véhicule | États-Unis | https://sentry.io/privacy/ |
| **PostHog Inc.** | Analyse de produit (écrans visualisés, temps passé à l'écran, événements d'activation) | Événements d'utilisation anonymisés, identifiant utilisateur opaque | États-Unis | https://posthog.com/privacy |
| **Apple Inc.** | Distribution sur l'App Store, traitement des achats intégrés (iOS) | État de l'abonnement, événements IAP ; les détails de la carte de paiement restent chez Apple | États-Unis | https://www.apple.com/legal/privacy/ |
| **Google LLC** | Distribution sur le Play Store, traitement de la facturation Play (Android), connexion OAuth | État de l'abonnement, événements IAP, identité OAuth (si utilisée) ; les détails de la carte de paiement restent chez Google | États-Unis | https://policies.google.com/privacy |
| **Microsoft Corp.** | Connexion OAuth (si utilisée) | Identité OAuth | États-Unis | https://privacy.microsoft.com |

Nous vous informerons (par courriel et par une bannière dans l'application) au moins 30 jours avant d'ajouter tout sous-traitant qui traite vos Données Personnelles, en vous donnant la possibilité de résilier votre compte avant que le changement ne prenne effet.

## 4. Traitement par IA — divulgation spéciale

CarFai utilise **Claude d'Anthropic** (un grand modèle de langage) pour alimenter :
- L'AI Advisor (questions sur votre véhicule, recommandations d'entretien, analyse de la valeur).
- La classification de documents et l'extraction structurée (lorsque vous numérisez un reçu, une facture ou un document d'immatriculation).
- La génération du calendrier d'entretien.
- L'analyse multi-véhicules / de flotte (niveaux B2B).

Lorsque vous utilisez ces fonctionnalités :
- Nous envoyons à Anthropic le contexte pertinent : votre question, les métadonnées du véhicule (marque/modèle/année/kilométrage, etc.), le contenu des documents (texte et images) et les lectures OBD2 lorsque cela est pertinent pour votre requête.
- Anthropic traite la demande conformément à ses **Conditions pour les clients commerciaux**, qui leur interdisent d'utiliser les données pour entraîner leurs modèles.
- Nous n'envoyons **pas** à Anthropic vos identifiants d'authentification, vos informations de paiement ou vos coordonnées (autres que votre identifiant utilisateur opaque).
- Anthropic peut conserver temporairement les requêtes et les résultats à des fins de classification de sécurité, de détection d'abus et de diagnostic opérationnel. Consultez la Politique de confidentialité d'Anthropic pour les détails sur la conservation.

**Les résultats de l'AI Advisor sont générés par IA et peuvent être incorrects, incomplets ou obsolètes.** Traitez-les comme des conseils informatifs, et non comme des avis professionnels. Consultez `/ai-disclosure` pour l'avertissement complet.

### 4.1 Stratégie de données à trois niveaux pour les fonctionnalités d'IA

Lorsque l'AI Advisor répond à une question (en particulier une question de valeur, de coût ou de comparaison), il puise dans TROIS couches de données distinctes par ordre de priorité :

1.  **Vos propres données de véhicule** — les métadonnées du véhicule, les documents, les lectures OBD2 et l'historique des conversations que vous avez personnellement ajoutés à CarFai. Signal le plus élevé, entièrement sous votre contrôle. Stockées dans votre compte privé ; jamais partagées avec d'autres utilisateurs.

2.  **Indicateurs de référence communautaires anonymes** — statistiques agrégées sur tous les utilisateurs de CarFai ayant la même marque/modèle/année/région. Exemples : prix d'achat médian, coût moyen de l'assurance, intervalle d'entretien typique. Récupérés via des fonctions SQL SECURITY DEFINER (`get_carfai_market_data`, `get_carfai_financial_benchmark`) qui **ne retournent que des agrégats** — jamais de lignes individuelles, de prix ou d'identifiants d'utilisateur. **Norme d'anonymisation** : [JURISDICTION-SPECIFIC: À DÉTERMINER — à définir conformément à l'art. 28 de la Loi 25 du Québec ; texte provisoire en attente de la Q5 dans `docs/legal/REVIEW_FINDINGS_2026-05-09.md`. Probablement k-anonymat avec une taille de cohorte d'agrégation minimale.] Vous NE POUVEZ PAS être ré-identifié à partir d'une réponse d'indicateur de référence.

3.  **Contenu de recherche Web** (lorsque pertinent) — pour un contexte sensible au temps (par ex., prix actuels du carburant, rappels récents, évolutions du marché), l'AI Advisor peut récupérer un petit nombre de pages Web publiques via [À DÉTERMINER — service de recherche selon Q8]. Le contenu récupéré est traité comme une entrée non fiable (conformément aux défenses contre l'injection de requêtes de la Section L.2) et n'est jamais écrit dans votre compte CarFai.

Vous pouvez refuser de contribuer à la couche d'indicateurs de référence communautaires (n° 2) à tout moment dans Paramètres → Confidentialité. Vos données seront exclues des futures requêtes d'indicateurs de référence sur la base du meilleur effort (les instantanés existants dans les caches d'indicateurs de référence expirent dans les 30 jours).

### 4.2 Indicateurs de référence communautaires anonymes — ce qui est partagé

Si vous ne vous y opposez **pas**, CarFai utilise les métadonnées de votre véhicule + les champs financiers pour calculer des statistiques agrégées que d'autres utilisateurs interrogeant la même marque/modèle/année/région peuvent lire. Spécifiquement :

| Champ utilisé dans les agrégats | Ce qui est partagé |
|---|---|
| Marque, Modèle, Année, Pays | Utilisé comme clé de cohorte ; non visible seul |
| `purchase_price`, `purchase_date` | Agrégé en médiane/moyenne/min/max pour la cohorte |
| `current_mileage` | Agrégé en moyenne pour la cohorte |
| `monthly_insurance`, `monthly_loan_payment`, `monthly_parking`, `monthly_fuel_estimate`, `yearly_registration_fee` | Chacun agrégé séparément en médiane/moyenne pour la cohorte |
| `reliability_rating` | Agrégé en moyenne |

Les résultats sont retournés sous forme de JSON agrégé comme `{ avg_price, median_price, sample_size, ... }`. Vos valeurs individuelles ne sont jamais exposées dans les réponses de l'API.

### 4.3 Notation de la performance des gestionnaires (comptes de flotte B2B)

La notation de la performance des gestionnaires n'est **pas une fonctionnalité de CarFai v1**. Si elle est introduite dans une version future, cette Politique sera mise à jour avec la spécification de l'algorithme, l'avis de décision automatisée de l'art. 12.1 de la Loi 25 du Québec, et le flux de demande de révision humaine avant que la fonctionnalité ne soit activée pour tout compte B2B.

### 4.4 Droit de demander une révision humaine des décisions de l'IA

Pour les utilisateurs au Québec (Loi 25, art. 12.1) et dans l'EEE / au Royaume-Uni (GDPR, art. 22), vous avez le droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé produisant des effets juridiques vous concernant ou vous affectant de manière significative. Les résultats de l'AI Advisor dans CarFai sont **informatifs** (recommandations, évaluations, suggestions d'entretien) — ce ne sont pas des décisions juridiquement contraignantes. Cependant, si vous estimez qu'un résultat de l'AI Advisor a affecté de manière significative une décision que vous avez prise, vous pouvez demander une révision humaine en contactant carfai.info@gmail.com avec l'identifiant de l'analyse (visible au bas de chaque résultat d'Analyse Détaillée).

Nous répondrons dans un délai de 30 jours. La révision est effectuée par le personnel de CarFai (le fondateur, dans la v1 ; l'équipe de soutien par la suite).

## 5. Bases légales du traitement (GDPR / UK GDPR / LPD suisse)

Pour les utilisateurs de l'EEE / du Royaume-Uni / de la Suisse, les bases légales sur lesquelles nous nous appuyons sont :
- **Exécution d'un contrat** — gérer votre compte, fournir les fonctionnalités que vous avez demandées.
- **Intérêts légitimes** — diagnostiquer les plantages, améliorer la qualité du produit, prévenir la fraude. Nous mettons ces intérêts en balance avec vos droits fondamentaux et offrons une possibilité de refus lorsque cela est raisonnable.
- **Consentement** — pour toute fonctionnalité facultative qui le requiert (par ex., l'activation de la synchronisation des trajets OBD2).
- **Respect des obligations légales** — répondre à une procédure judiciaire valide.

Vous pouvez retirer votre consentement pour le traitement fondé sur le consentement à tout moment, sans affecter la licéité du traitement antérieur.

## 6. Conservation des données

| Catégorie de données | Conservation |
|---|---|
| Informations de compte | Tant que le compte est actif + 30 jours après la demande de suppression, puis supprimées de manière permanente (avec purge des sauvegardes dans un délai supplémentaire de 30 jours) |
| Données de véhicule et de document | Tant que le compte est actif + 30 jours après la demande de suppression |
| Historique de l'abonnement | 7 ans (conformité fiscale / comptable) |
| Journaux de conversation de l'IA | 90 jours (puis supprimés, à l'exception des statistiques d'utilisation agrégées non identifiables) |
| Données de plantage et de performance | 90 jours |
| Communications avec le soutien | 3 ans (garantie / résolution des litiges) |
| Journaux d'audit (sécurité, actions de l'organisation B2B) | 2 ans |

Vous pouvez demander la suppression immédiate de votre compte et de vos données à tout moment via le processus « Supprimer le compte » dans l'application (Section 7).

## 7. Vos droits

Selon votre juridiction, vous disposez de tout ou partie des droits suivants :

- **Accès** — demander une copie des données personnelles que nous détenons à votre sujet. Disponible dans l'application via « Exporter mes données » (retourne un paquet JSON signé).
- **Rectification** — corriger les données inexactes. La plupart des champs sont modifiables dans l'application ; pour les champs qui ne le sont pas, contactez-nous.
- **Effacement (« droit à l'oubli »)** — supprimer votre compte et vos données. Disponible dans l'application via « Supprimer le compte ».
- **Limitation** — limiter temporairement notre traitement dans l'attente de la résolution d'un litige.
- **Portabilité** — recevoir vos données dans un format lisible par machine (le paquet « Exporter mes données » est au format JSON).
- **Opposition** — vous opposer au traitement fondé sur des intérêts légitimes.
- **Retrait du consentement** — pour tout traitement fondé sur le consentement.
- **Ne pas faire l'objet de décisions fondées exclusivement sur un traitement automatisé produisant des effets juridiques** — nous ne prenons pas de décisions fondées exclusivement sur un traitement automatisé ayant des effets juridiques ou d'importance similaire sur vous. L'AI Advisor fournit des informations, pas des décisions juridiquement contraignantes.
- **Déposer une plainte auprès d'une autorité de contrôle** — votre autorité locale de protection des données (par ex., l'ICO au Royaume-Uni, la CNIL en France, le CEPD dans l'UE).

**Résidents de Californie (CCPA/CPRA)** ont également le droit de savoir quelles catégories d'informations personnelles sont collectées, les catégories de sources, les finalités d'utilisation, et les catégories de tiers avec qui les données sont partagées (couvert ci-dessus), ainsi que le droit de refuser la « vente » ou le « partage » d'informations personnelles. **CarFai ne vend ni ne partage d'informations personnelles à des fins de publicité comportementale intercontextuelle.** Vous pouvez le confirmer et exercer le droit de refus correspondant à tout moment depuis **Paramètres → À propos → Ne pas vendre ni partager mes informations personnelles**.

**Résidents d'autres États américains (ajouté le 2026-05-18 — M1.10)** — Texas (TDPSA, eff. 2024), Colorado (CPA), Connecticut (CTDPA), Virginie (VCDPA), Utah (UCPA), Oregon (OCPA), Montana (MTCDPA), Indiana (INCDPA), Tennessee (TIPA), Iowa (ICDPA), Delaware (DPDPA), New Hampshire (NHPA), New Jersey (NJDPL) et d'autres lois étatiques complètes sur la protection de la vie privée confèrent des droits substantiellement similaires à la base de référence de l'UE ci-dessus : accès, suppression, correction, portabilité et refus de la publicité ciblée / de la vente / du profilage pour des décisions importantes. **CarFai ne pratique pas la publicité ciblée, ne vend pas d'informations personnelles et n'utilise pas d'informations personnelles pour du profilage ayant des effets juridiques ou d'importance similaire.** Pour exercer l'un de ces droits, contactez carfai.info@gmail.com ou utilisez l'entrée **Paramètres → À propos → Ne pas vendre ni partager mes informations personnelles** dans l'application.

**PDPL des EAU / PDPL saoudienne / DPL égyptienne** — des droits équivalents d'accès, de rectification, de suppression et d'opposition s'appliquent. Nous nous conformons aux exigences de l'autorité de contrôle locale de chaque pays.

Pour exercer l'un de ces droits, contactez carfai.info@gmail.com. Nous répondons dans un délai de 30 jours (ou dans le délai requis par la loi de votre juridiction, s'il est plus court).

## 8. Transferts internationaux de données

Les serveurs principaux de CarFai sont situés aux **États-Unis** (région us-east-1, via Supabase) et l'API d'Anthropic est également hébergée aux États-Unis. Si vous accédez au Service depuis l'extérieur des États-Unis, vos données seront transférées et traitées aux États-Unis.

Pour les utilisateurs de l'EEE / du Royaume-Uni / de la Suisse, nous nous appuyons sur :
- Les **Clauses Contractuelles Types (CCT)** de la Commission européenne avec nos sous-traitants américains, complétées par des mesures techniques et organisationnelles appropriées.
- L'**Addendum britannique** aux CCT pour les personnes concernées au Royaume-Uni.
- L'évaluation équivalente de la **LPD suisse**.

CarFai utilise actuellement exclusivement une infrastructure basée aux États-Unis. Si nous mettons en place une infrastructure régionale dédiée dans l'UE à l'avenir, cette Politique sera mise à jour et les utilisateurs de l'EEE seront acheminés en conséquence.

## 9. Sécurité

Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables et appropriées à la sensibilité des données, notamment :
- Le chiffrement en transit (TLS 1.2+) et au repos (chiffrement géré par le fournisseur sur Supabase).
- La sécurité au niveau des lignes (RLS) sur toutes les données multi-locataires ; les utilisateurs ne peuvent accéder qu'à leurs propres données et (en mode B2B) aux données de leur organisation, conformément aux contrôles d'accès basés sur les rôles.
- L'accès à la production est journalisé et audité ; les secrets sont renouvelés conformément à `docs/SECRETS_ROTATION.md`.
- Un examen de sécurité avant le lancement et une analyse continue des vulnérabilités des dépendances.
- Conçu pour contrer les risques du Top 10 mobile de l'OWASP.

Aucune mesure de sécurité n'est parfaite. Si nous prenons connaissance d'une violation de données personnelles affectant vos données, nous vous en informerons ainsi que l'autorité de contrôle compétente dans les délais requis par la loi (72 heures en vertu du GDPR pour les violations à haut risque).

## 10. Confidentialité des enfants

CarFai n'est **pas destiné aux enfants de moins de 13 ans** (ou l'âge de consentement équivalent dans votre juridiction). Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de cet âge. Si vous pensez qu'un enfant nous a fourni des informations personnelles, contactez-nous et nous les supprimerons.

## 11. Cookies (web uniquement)

L'application mobile CarFai n'utilise pas de cookies. Le site web marketing de CarFai (`carfai.app` et tout sous-domaine) utilise des cookies essentiels au fonctionnement du site. Consultez la Politique sur les cookies distincte à l'adresse `https://carfai.app/cookies`.

## 12. Liens vers des tiers

Le Service peut contenir des liens vers des sites web de tiers (par ex., vers la gestion des abonnements d'Apple/Google). Nous ne sommes pas responsables des pratiques de confidentialité de ces sites. Veuillez consulter leurs politiques séparément.

## 13. Modifications de cette Politique

Nous pouvons mettre à jour cette Politique de temps à autre. La date de « Dernière mise à jour » en haut de la page reflétera tout changement. Pour les modifications importantes affectant vos droits, nous vous en informerons par courriel et exigerons une nouvelle acceptation dans l'application avant que vous ne puissiez continuer à utiliser le Service.

## 14. Contact

- **Demandes générales sur la confidentialité** : carfai.info@gmail.com
- **Délégué à la protection des données (GDPR)** : carfai.info@gmail.com
- **Adresse postale** : `CarFai, adresse disponible sur demande via carfai.info@gmail.com`
- **Représentant dans l'EEE (Article 27 du GDPR)** : non encore désigné. Les personnes concernées dans l'EEE peuvent contacter CarFai directement à carfai.info@gmail.com pour toute demande relative à la vie privée.
- **Représentant au R.-U. (Article 27 du UK GDPR)** : non encore désigné. Les personnes concernées au R.-U. peuvent contacter CarFai directement à carfai.info@gmail.com pour toute demande relative à la vie privée.

---

## Historique des révisions

| Version | Date | Notes |
|---|---|---|
| v1 | 2026-05-20 | Publication initiale. |
