# Kenji's Bizarre Portfolio

Portfolio BTS SIO (option SLAM) de **Kenji Chapuis--Voisain**, support de l'épreuve E5.
Univers inspiré de *JoJo's Bizarre Adventure*, avec une interface de menu façon jeu vidéo,
hyper animée et pilotable au clavier.

## Stack

100 % **HTML / CSS / JavaScript vanilla** — aucun framework, aucune étape de build.

- `index.html` : squelette (fond animé, intro, calque de transitions, lecteur BGM, modale)
- `css/style.css` : design system, animations (clip-path, keyframes), responsive
- `js/data.js` : **tout le contenu** (profil, CV, projets, expériences, veille, passions, certifs, contact)
- `js/app.js` : routeur par hash (`#/cv`, `#/projets/siatel`…), vues et navigation clavier
- `js/bg.js` : fond canvas (lignes de vitesse rotatives + « ゴゴゴ » flottants)
- `js/audio.js` : effets sonores et musique de fond **synthétisés en Web Audio** (aucun fichier audio)
- `assets/img`, `assets/docs` : images optimisées (WebP) et attestations PDF

## Rubriques

| Menu | Style | Contenu |
| --- | --- | --- |
| À propos | barres + panneau de révélation incliné | identité, formation, objectif |
| CV | cartes « RANG » + panneau détail | fiche de Stand (radar de stats), formation, langages, outils, sécurité, langues |
| Projets | journal de missions | Hôtel Siatel, Tower Defense, modèles 3D (viewer 360°), portfolio, SIO2 |
| Expériences | cartes « PART » | modeleur 3D, stage SIO1 Siatel, stage SIO2 |
| Certifs | barres « party » + documents | ANSSI, CNIL (6 modules), PIX |
| Veille tech | journal | démarche, axe IA, axe web léger, fiches de lecture, bilan |
| Passions | journal | JoJo, Berserk, Haikyu!!, jeux vidéo, volleyball, Yosekan Budo |
| Contact | barres « party » | email, téléphone, CV PDF |

## Commandes

`↑ ↓` naviguer · `Entrée` confirmer / révéler · `Échap` ou `←` retour au menu · `Tab` changer de colonne (Certifs, Contact).
Le panneau **BGM** (en bas à gauche) active la musique, règle le volume et coupe les effets sonores.

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

## Déploiement

Site statique : GitHub Pages, Netlify ou Vercel en pointant sur `index.html`.

## Mettre à jour le contenu

Tout se modifie dans `js/data.js` : ajouter un projet = ajouter un objet dans `PROJECTS`.
