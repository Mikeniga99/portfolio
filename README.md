# Portfolio Angular · Mikel Shrödinguer Sossou

Reproduction fidèle du portfolio "Animated 3D Portfolio" en **Angular 18** (standalone components), avec les mêmes animations 3D/HUD/cyberpunk que la version d'origine (React + Framer Motion), reconstruites ici en Angular pur + CSS + un peu de JS (IntersectionObserver, requestAnimationFrame) — donc **aucune dépendance à Framer Motion**.

## 🚀 Démarrage

```bash
npm install
npm start
```
Puis ouvrez `http://localhost:4200`.

Build de production :
```bash
npm run build
```
Les fichiers sortent dans `dist/mikel-sossou-portfolio/`.

## 🧩 Ce qui a été ajouté par rapport à la version d'origine

1. **Compétences créatives & marketing** (section "Profil") :
   Design Graphique, Community Manager, Visibilité Google Maps, Gestion des réseaux
   sociaux pour entreprise, Conception d'affiche, Conception de logo, Conception de
   carte de visite, Conception de porte-clé.
   → Fichier : `src/app/components/about/about.component.ts` (tableau `creativeSkills`).

2. **Images sur chaque carte projet** :
   Des visuels de remplacement (SVG) au style cyberpunk ont été générés pour illustrer
   chaque réalisation, dans `src/assets/images/projects/`. **Remplacez-les simplement
   par vos propres visuels** (mêmes noms de fichiers, ou changez le champ `image` dans
   `src/app/components/projects/projects.component.ts`).

3. **Nouveau projet : Site DIGIVERSE Technologie**
   Ajouté en tête de la liste des réalisations — Vue.js, lien
   https://digiversebenin.vercel.app/

4. **Lien Marathon Commercial de Cotonou** ajouté :
   https://marathon-commercial-de-cotonou.vercel.app/

5. **Projets sans lien fourni** → badge « 🔒 Projet privé — accès sur demande » affiché
   au dos de la carte à la place du bouton de lien (Radio SRTB, ArchiDoc GED,
   Clinique & Pharmacie, Site Tramarq, Fondation ORE-OFE). Ajoutez le champ `link`
   dans `projects.component.ts` dès que vous avez l'URL publique.

## 🎬 Animations reproduites (fidèles à l'original)

- **Hero** : tilt 3D de la mise en page qui suit la souris, parallaxe au scroll,
  cubes wireframe en rotation 3D infinie, grille "Tron" au sol en perspective,
  scanline animée, particules flottantes, glitch RGB sur le nom "SOSSOU",
  brackets HUD façon interface de jeu.
- **About** : barres de compétences façon "jauge de jeu vidéo" avec compteur animé,
  segments, lueur, effet de balayage (shimmer) ; barres de langues ; badges qui
  apparaissent en cascade au scroll.
- **Experience** : ligne de temps qui se dessine au scroll, carte en tilt 3D,
  puces qui glissent une à une.
- **Projects** : cartes **flip 3D au survol** (recto/verso, `rotateY(180deg)`),
  image de couverture en zoom léger au survol, glow d'accent, badge de statut clignotant.
- **Education / Contact** : cartes en tilt 3D à l'entrée dans le viewport, lignes
  d'accent qui se dessinent, chips animés.

Toute la logique d'apparition au scroll passe par une directive réutilisable,
`InViewDirective` (`src/app/directives/in-view.directive.ts`), qui reproduit le
comportement `whileInView` + `viewport={{ once: true }}` de Framer Motion avec un
simple `IntersectionObserver`, combinée aux classes utilitaires `.reveal`,
`.reveal-line-x`, `.reveal-line-y`, `.reveal-w` définies dans `src/styles.scss`.

## 🎨 Personnalisation rapide

- **Couleurs / thème** → variables CSS dans `src/styles.scss` (`--primary`,
  `--secondary`, `--accent`, `--background`, etc.)
- **Textes** → directement dans chaque composant (`*.component.ts`, propriété `template`).
- **Photos de projets** → `src/assets/images/projects/*.svg` (remplaçables par des `.jpg`/`.png`,
  pensez à mettre à jour le champ `image` correspondant).

## 📦 Structure

```
src/
  app/
    app.component.ts          → shell + footer
    app.config.ts
    directives/in-view.directive.ts
    components/
      nav/        → barre de navigation + barre de progression de scroll
      hero/        → section d'accueil animée en 3D
      about/       → profil, compétences, langues, compétences créatives
      experience/  → parcours professionnel (timeline)
      projects/    → cartes flip 3D des réalisations
      education/   → formation académique
      contact/     → coordonnées + call-to-action
  assets/images/projects/  → visuels des projets (SVG placeholders)
  styles.scss    → thème global + keyframes d'animation
```
