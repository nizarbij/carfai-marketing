# CARFAI — comptes sociaux en ligne

> Créés le 2026-08-23. Un seul courriel : `carfai.info@gmail.com`.
> Portée actuelle : **anglais uniquement**. FR / ES / AR différés —
> voir `references/markets.md` § Trigger for adding a market.

## Comptes

| Plateforme | Handle | URL | Type | Statut |
|---|---|---|---|---|
| Facebook Page | `carfai.official` | https://www.facebook.com/carfai.official/ | Page · App Page | ✅ vérifié |
| Instagram | `carfai.app` | https://www.instagram.com/carfai.app/ | Business | ✅ vérifié |
| TikTok | `carfai.app` | https://www.tiktok.com/@carfai.app | Business | ✅ vérifié |

**Pourquoi Facebook diffère** : Facebook refuse les noms d'utilisateur contenant
une extension de domaine (`.app`) — règle anti-hameçonnage. `carfai.app` a été
refusé, `carfai.official` pris à la place. TikTok et Instagram l'ont accepté.
L'incohérence se limite à l'URL de la Page Facebook, la moins visible des trois.

## À finir (non bloquant)

| Élément | Plateforme | Cause | Quand réessayer |
|---|---|---|---|
| Lien externe grisé | Instagram | Restriction anti-spam compte neuf | Après 2–3 publications, ou 24–72 h |
| Champ site web introuvable | TikTok | Idem + champ souvent absent du web | Depuis l'app mobile, après quelques publications |

**Contournement en place** : l'URL `carfai.app` est écrite en texte dans les
deux bios. Non cliquable mais visible, et le site redirige vers le Play Store.

## Liens de destination

| Plateforme | Cible | Raison |
|---|---|---|
| TikTok | Play Store direct | Conversion la plus courte ; c'est le moteur de trafic |
| Instagram | `carfai.app` | Le site route vers le bon store ; rien à changer quand iOS sortira |
| Facebook | `carfai.app` | Idem |

## Quand iOS sera approuvé

1. Renseigner `apple` dans `carfai-marketing/app/[locale]/_lib/install-urls.ts`
2. Basculer le lien TikTok du Play Store vers `carfai.app`
3. Mettre à jour le tableau « live status » dans `references/brand-and-voice.md`
