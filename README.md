# SpaceCode

SpaceCode est une application éducative interactive d'apprentissage du code web (HTML, CSS, JavaScript) sous forme de jeu spatial. Les joueurs progressent à travers différents niveaux et cours en résolvant des exercices de code pour réparer des vaisseaux spatiaux et rallumer des étoiles.

## Architecture du projet

Le projet est structuré en deux applications distinctes communiquant via une API REST :

### Backend (API)
- **Répertoire :** `api/`
- **Technologies :** Node.js, Express, TypeScript, SQLite3
- **Fonctionnalités :**
  - Gestion des utilisateurs (CRUD, authentification JWT)
  - Gestion des exercices (lecture par niveau/cours)
  - Gestion des indices (par exercice)
  - Suivi de la progression (niveaux terminés)
  - Base de données SQLite avec clés étrangères

**Structure de l'API :**
```
api/
├── src/
│   ├── server.ts          # Point d'entrée Express
│   ├── utilsDb.ts         # Utilitaires base de données
│   ├── middleware/
│   │   └── auth.ts        # Middleware d'authentification
│   ├── routes/
│   │   └── routes.ts      # Définition des routes API
│   ├── DAO/               # Data Access Objects
│   │   ├── UserDAO.ts
│   │   ├── ExerciceDAO.ts
│   │   ├── IndiceDAO.ts
│   │   └── Niveau_termineDAO.ts
│   └── model/             # Modèles de données
│       ├── UtilisateurModel.ts
│       ├── ExerciceModel.ts
│       └── IndiceModel.ts
└── package.json
```

### Frontend (Interface)
- **Répertoire :** `spacecode/`
- **Technologies :** React, TypeScript, React Router, GSAP (animations)
- **Fonctionnalités :**
  - Interface de connexion/inscription
  - Page d'accueil avec navigation spatiale
  - Pages de cours (HTML, CSS, JavaScript)
  - Éditeur de code intégré (Monaco Editor)
  - Système d'indices interactif
  - Animations et effets visuels spatiaux

**Structure du Frontend :**
```
spacecode/
├── public/                 # Assets statiques
│   ├── assets/            # Images, icônes, SVG
│   └── index.html
└── src/
    ├── pages/             # Pages principales
    │   ├── Home/
    │   ├── Exercices/
    │   ├── Connection/
    │   ├── Register/
    │   ├── Introduction/
    │   ├── HTML/
    │   ├── Base/
    │   └── Animation/
    ├── components/        # Composants réutilisables
    │   ├── CodeStructure/ # Éditeur et validation de code
    │   ├── Indice/        # Système d'indices
    │   ├── Planet/        # Composants planétaires
    │   ├── Portail/       # Interface portail
    │   └── ...
    ├── services/          # Services API
    │   └── service-api.ts
    └── App.tsx            # Configuration des routes
```

### Base de données SQLite
- **Fichier :** `database/spacecode.sql`
- **Type :** SQLite3
- **Fichier de données :** `database/spacecode2.db` (généré automatiquement)
- **Tables :** Cours, Niveau, Exercices, Indices, Utilisateur, Niveaux_termines

## Lancer le projet

### Prérequis
- Node.js installé
- npm

### Commande de lancement

Depuis la racine du projet (`spacecode/`), exécutez :

```bash
npm start
```

Cette commande lance simultanément :
- L'API sur `http://127.0.0.1:8080/api`
- Le frontend React sur `http://localhost:3000`

## Accès distant (Université)

Pour accéder au serveur distant de l'université :

1. Connectez-vous au VPN de l'université de Nantes
   - Tutoriel : https://wiki.univ-nantes.fr/doku.php?id=personnels:eduvpn:client_lourd
2. Ouvrez un terminal (PowerShell sur Windows)
3. Connectez-vous via SSH :
```shell
ssh etudiants@172.26.83.12
```

4. Lancez le script de déploiement :
```shell
bash launchServeur.bash
```

## Initialisation de la base de données SQLite

### Fonctionnement

La base de données SQLite est gérée par le module `api/src/utilsDb.ts`. Elle utilise le fichier `database/spacecode.sql` pour la structure et les données initiales.

**Fichiers impliqués :**
- `database/spacecode.sql` - Script SQL de création des tables et insertion des données initiales
- `database/spacecode2.db` - Fichier de base de données SQLite (généré automatiquement au premier lancement)
- `api/src/utilsDb.ts` - Module de gestion de la base de données

### Initialisation automatique

La base de données est initialisée **automatiquement** au démarrage de l'API via la fonction `initDb()` dans `api/src/server.ts` :

```typescript
import { initDb } from './utilsDb'
// ...
initDb();
```

La fonction `initDb()` :
1. Crée ou ouvre le fichier `database/spacecode2.db`
2. Active les clés étrangères (`PRAGMA foreign_keys = ON`)
3. Lit et exécute le script SQL `database/spacecode.sql`
4. Crée les tables et insère les données initiales

### Initialisation manuelle

Si vous devez réinitialiser la base de données manuellement :

1. Supprimez l'ancien fichier de base de données :
```bash
rm database/spacecode2.db
```

2. Redémarrez l'API - le fichier sera recréé automatiquement

## Configuration

### Variables d'environnement (API)

Créez un fichier `.env` dans le répertoire `api/` :

```bash
PORT=8080
JWT_SECRET=votre_secret_jwt
```

## Fonctionnalités principales

- **Authentification :** Inscription, connexion avec JWT et cookies sécurisés
- **Système de progression :** Suivi des niveaux terminés par utilisateur
- **Exercices interactifs :** Éditeur de code avec validation automatique
- **Système d'indices :** Aides progressives pour chaque exercice
- **Interface immersive :** Thème spatial avec animations et planètes
- **Multi-cours :** HTML, CSS, JavaScript avec niveaux de difficulté

## Endpoints API principaux

### Utilisateurs
- `POST /api/utilisateur` - Créer un utilisateur
- `POST /api/utilisateur/login` - Connexion
- `GET /api/utilisateur/me` - Profil utilisateur (authentifié)
- `GET /api/utilisateurs` - Liste des utilisateurs

### Exercices
- `GET /api/exercices` - Tous les exercices
- `GET /api/exercice/:id` - Détails d'un exercice
- `GET /api/exercices/niveau/:id` - Exercices par niveau
- `GET /api/exercices/cours/:id` - Exercices par cours

### Indices
- `GET /api/indices` - Tous les indices
- `GET /api/indice/:id` - Détails d'un indice
- `GET /api/indice/exercice/:id` - Indices d'un exercice

### Progression
- `GET /api/dernier_niveau_termine/utilisateur/:id` - Dernier niveau d'un utilisateur

## Scripts disponibles (Référence)

### Racine
- `npm start` - Lance API et frontend simultanément
- `npm run api` - Lance uniquement l'API
- `npm run front` - Lance uniquement le frontend

### API
- `npm start` - Démarre le serveur
- `npm run serveur` - Mode développement avec nodemon

### Frontend
- `npm start` - Mode développement
- `npm run build` - Build production
- `npm run runBuild` - Serve le build
