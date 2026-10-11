# Analyse et validation — Portfolio Maxime Lemal

## Composant ShapeWaves

`src/components/ShapeWavesWebGPU.tsx` contient la source TypeScript officielle React Bits avec sa dépendance `vgpu`. `src/components/ShapeWaves.tsx` la charge de façon différée lorsqu’un adaptateur WebGPU est disponible, et place la source officielle au-dessus du Canvas 2D animé de `ShapeWavesCanvasFallback.tsx`. Le Canvas démarre immédiatement, reste visible pendant le démarrage GPU et demeure affiché si le GPU est indisponible ou échoue. La notice de licence React Bits est conservée dans `LICENSE-REACT-BITS.md`.

Dans `src/pages/Index.tsx`, le fond utilise `backgroundColor="#0A0A0A"`, `color="#C5A059"`, `hoverColor="#ffffff"`, `interactive={true}` et une opacité globale `0.30`. Le rendu GPU est transparent tant qu’il n’est pas prêt, puis se place au-dessus du Canvas; l’ensemble reste derrière le contenu de la Hero Section.

Dans l’environnement de prévisualisation, le Canvas 2D assure immédiatement l’animation puisque le navigateur ne fournit pas d’adaptateur WebGPU. Sur un navigateur compatible, la source officielle prend automatiquement le relais et répond au mouvement de la souris. Le nom et les textes du portfolio restent au premier plan.

## Badge Lanyard React Bits

`src/components/Lanyard.jsx` et son CSS reprennent le code fourni, avec Three.js ajouté comme dépendance et chargement différé pour ne pas alourdir le premier bundle. Le recto utilise la photo existante `src/assets/profile.jpg`. Le verso est `src/assets/lanyard-back.svg` : fond #0A0A0A, monogramme ML et accents dorés #C5A059, nom, E-Business et QR code local en correction d’erreur H. Le QR pointe vers le profil déjà renseigné dans le portfolio : `https://www.linkedin.com/in/maxime-lemal-770bb12a0`.

Le badge est interactif (`interactive`, prise/rotation/retournement au clic) et utilise une finition mate et des attaches dorées. Un lien LinkedIn accessible au clavier complète le canvas décoratif.

## Logo Loop React Bits

`src/components/LogoLoop.tsx` est l’adaptation TypeScript du composant fourni, avec ses styles dans `src/components/LogoLoop.css`. La section **Compétences & Outils** conserve les 12 outils déjà présentés, désormais affichés dans une boucle horizontale continue (54 px/s), avec espacement régulier, fondu sur fond sombre, pause au survol et léger agrandissement des cartes. Le conteneur plein débordement suit les marges responsives de `section-padding` et rejoint exactement les deux bords visibles du viewport.

## Lisibilité et titres de section

La ligne descriptive sous le nom et le message de contact utilisent le même `glass-card` que la bio HEPL, avec un flou d’arrière-plan de 16 px. La classe partagée `.section-title` harmonise la typographie, le poids et les tailles des titres **À propos**, **Mes Projets**, **Compétences & Outils**, **Centres d’intérêt** et **Me contacter** ; le dégradé et la lueur dorés sont accordés au titre principal. Les titres sont positionnés au-dessus des fonds (z-index 10), restent sélectionnables et acceptent les interactions de pointeur.

## Aimants Magnet

`src/components/Magnet.tsx` reprend le comportement fourni dans une version TypeScript réutilisable. Il enveloppe les trois CTA de la Hero Section (**Me contacter**, **Mon CV**, **Voir mes projets**) ainsi que les liens **LinkedIn** et **Email** du pied de page. Les CTA utilisent `padding={36}` et `strength={3}` ; les icônes utilisent `padding={28}` et `strength={3}`. Les éléments d’origine restent des liens HTML accessibles et cliquables.

## Fichiers importés et liens

Les cinq fichiers de l’archive reçue sont installés directement à la racine de `public/` :

- `cv-maxime-lemal.pdf`
- `Audit-UX-Neuhaus.pdf`
- `Strategie-Digitale-PME.pdf`
- `Startup-Studio-Bougies-Belges.pdf`
- `Projet-Web-Scuderia-Ferrari.mp4`

Le bouton **Mon CV** et les fiches des quatre projets disponibles ouvrent ces fichiers locaux avec `target="_blank"` et `rel="noopener noreferrer"`. Le bouton **Voir mes projets** ouvre la section locale des projets dans un nouvel onglet. Les destinations Google Drive et Figma ont été retirées. Aucun fichier local pour les projets E-Commerce de Luxe ou App Développement ne figurait dans l’archive ; leurs fiches ne redirigent donc vers aucun service externe.

## Structure du projet

- Entrées React : `src/main.tsx`, `src/App.tsx`.
- Pages : `src/pages/Index.tsx`, `src/pages/NotFound.tsx`.
- Composants portfolio : navigation, hero, badge Lanyard 3D, sections À propos/Projets/Compétences/Intérêts, footer, curseur, Magnet, LogoLoop et fond animé.
- Composants UI : `src/components/ui/`.
- Styles : Tailwind, styles globaux dans `src/index.css`, fond `ShapeWaves.css` et boucle `LogoLoop.css`.
- Médias : assets de marque et d’illustration dans `src/assets/`; CV et travaux dans `public/`.
- Outils : React 18, TypeScript, Vite 5, Tailwind 3, Three.js, Vitest, ESLint, `vgpu` et Canvas 2D.

## Contrôles

| Vérification | Résultat |
|---|---|
| TypeScript (`npx tsc --noEmit -p tsconfig.app.json`) | Réussi |
| Tests Vitest | 1 test réussi |
| Build Vite de production | Réussi |
| Réponses locales des cinq fichiers | HTTP 200, type MIME attendu |
| Prévisualisation du portfolio | HTTP 200 ; nom et textes visibles |
| Animation ShapeWaves | Canvas 2D animé immédiatement ; couche officielle WebGPU optionnelle |
| Badge Lanyard | Canvas WebGL2 rendu (384 × 500) ; recto photo et verso visible après retournement |
| QR LinkedIn | QR local en correction H intégré au SVG du verso ; lien du profil personnel confirmé |
| LogoLoop | 12 compétences ; boucle continue confirmée par mesure du transform dans le navigateur |
| Pleine largeur LogoLoop | Rectangle mesuré x=0 à x=1265, égal à la largeur visible du document |
| Cartes et titres UI | `backdrop-filter: blur(16px)` confirmé sur Hero/contact ; cinq titres avec une typographie uniforme |
| Sélection des titres | Texte sélectionnable ; point de clic résolu sur le titre, z-index 10 et pointer-events actifs |
| Survol interactif | Réponse Canvas confirmée avec la teinte blanche au déplacement de la souris |
| Magnet | Déplacement confirmé sur les 3 CTA et les 2 icônes sociales |
| Liens CV et projets | Chemins locaux, nouvel onglet, attributs de sécurité présents |
| Lint ciblé Magnet/Hero/Footer | Réussi |
| Lint ciblé LogoLoop et sections UI | Réussi |
| Lint complet du projet | 4 erreurs préexistantes dans d’autres fichiers |

Le build de production réussit. Three.js et le composant Lanyard sont chargés séparément : le chunk Lanyard fait 580 Ko minifié (environ 151 Ko gzip), tandis que l’entrée principale reste à 350 Ko (environ 113 Ko gzip). Vite affiche un avertissement de taille pour ce chunk, sans bloquer la compilation.

Le lint signale encore des problèmes préexistants dans `AnimatedBackground.tsx`, `components/ui/command.tsx`, `components/ui/textarea.tsx` et `tailwind.config.ts`. Ils ne bloquent ni le typage, ni les tests, ni le build.
