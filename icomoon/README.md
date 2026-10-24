# Icônes personnalisées (IcoMoon)

Système séparé du composant `Icon` existant (`src/components/atoms/Icon/Icon.tsx`,
toujours utilisé partout dans l'app tel quel). Celui-ci sert à ajouter **vos
propres icônes** sans y toucher : un nouveau composant `IcomoonIcon`, alimenté
par un sprite SVG exporté depuis [icomoon.io/app](https://icomoon.io/app).

## Comment ça marche

- `icomoon/selection.json` — le fichier de projet IcoMoon (source de vérité).
  On le réimporte dans l'app IcoMoon pour continuer à éditer le même jeu
  d'icônes d'une session à l'autre.
- `public/icomoon/symbol-defs.svg` — le sprite SVG exporté, servi tel quel par
  Next.js (dossier `public/`). Chaque icône y est un `<symbol id="nom-icone">`.
- `src/components/atoms/IcomoonIcon/icomoon-icon-names.generated.ts` — fichier
  **généré**, ne pas éditer à la main. Donne le type `IcomoonIconName` (une
  union stricte des noms d'icônes réellement disponibles) au composant.
- `src/components/atoms/IcomoonIcon/IcomoonIcon.tsx` — le composant à utiliser :
  `<IcomoonIcon name="mon-icone" size={20} />`.

Un exemple `demo-plus` est inclus dans les 3 premiers fichiers, uniquement
pour prouver que toute la chaîne fonctionne. À supprimer dès que vous ajoutez
vos vraies icônes.

## Ajouter / mettre à jour des icônes

1. Aller sur [icomoon.io/app](https://icomoon.io/app).
2. **File → Import Icons** et sélectionner `icomoon/selection.json` (si c'est
   la première fois, créer un nouveau set vide suffit aussi).
3. Ajouter vos icônes (upload de SVG, ou librairies intégrées), les
   sélectionner (coche en haut à gauche de chaque icône).
4. Cliquer **Generate SVG & More** (icône en bas de l'écran).
5. Dans l'écran de génération :
   - Onglet **SVG** → vérifier que l'aperçu liste bien vos icônes.
   - **Important** : dans les réglages, laisser le **"Class prefix" vide**
     (sinon les `id` des symboles ne correspondront plus exactement aux noms
     d'icônes attendus par le composant).
6. Télécharger le zip, puis :
   - copier `symbol-defs.svg` → remplacer `public/icomoon/symbol-defs.svg`.
   - copier `selection.json` → remplacer `icomoon/selection.json`.
7. Régénérer les types : `npm run icons:generate`.
8. Utiliser la nouvelle icône : `<IcomoonIcon name="nom-de-votre-icone" />`.

## Pourquoi ce format (sprite SVG + `<use>`) plutôt qu'une police d'icônes

- Pas de police à charger (pas de flash de texte sans icône au chargement).
- Les icônes héritent `currentColor` — se recolorent comme n'importe quel
  texte, exactement comme le composant `Icon` existant.
- Aucune dépendance npm supplémentaire : `<use href="...#id">` est nativement
  supporté par le navigateur.
- Un seul fichier (`symbol-defs.svg`) mis en cache après le premier chargement,
  quel que soit le nombre d'icônes qu'il contient.
