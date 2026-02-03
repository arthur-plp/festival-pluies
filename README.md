# 🌿 Les Pluies de Juillet - Module de Planification & Billetterie

> Prototype fonctionnel développé dans le cadre d'un partiel blanc de Master - Février 2026.

## 📋 Contexte du Projet

Ce projet vise à réinternaliser la gestion de la billetterie et de la planification du festival **Les Pluies de Juillet**. L'objectif est d'offrir une expérience utilisateur fluide, mobile-first, ciblant spécifiquement les 18-25 ans, pour permettre aux festivaliers de :
1. Consulter le programme des conférences.
2. Vérifier leur éligibilité (billet acheté).
3. Construire leur agenda personnalisé.

## 🛠 Stack Technique & Architecture

En tant que Lead Développeur, j'ai sélectionné une stack moderne privilégiant la performance, la sécurité et la maintenabilité.

| Techno | Usage | Justification du choix |
| :--- | :--- | :--- |
| **Next.js 15 (App Router)** | Framework Fullstack | Rendu Hybride (SSR/CSR) pour un SEO optimal et une navigation instantanée. |
| **TypeScript** | Langage | Robustesse du code, typage fort pour éviter les erreurs de runtime. |
| **Prisma** | ORM | Manipulation de données type-safe et migrations simplifiées. |
| **PostgreSQL** (Dev) | Base de données | Base relationnelle robuste, adaptée aux besoins complexes du projet. |
| **Tailwind CSS** | Styling | Développement rapide d'interfaces responsive et cohérentes. |
| **NextAuth.js** | Authentification | Solution éprouvée et sécurisée pour la gestion de session. |

### 📂 Structure du projet

L'architecture suit les principes du "Clean Code" et de la séparation des responsabilités :

```bash
├── 📁 app/             # Pages et Routes API (Next.js App Router)
├── 📁 components/      # Composants React réutilisables (UI)
│   ├── ui/             # Composants atomiques (Boutons, Cards...)
│   └── ...
├── 📁 lib/             # Logique métier et utilitaires (ex: db.ts, utils.ts)
├── 📁 prisma/          # Schéma de base de données et script de Seed
└── 📄 public/          # Assets statiques
```

## 🚀 Installation & Démarrage

Suivez ces instructions pour lancer le projet en local.

## Prérequis
- Node.js 18+
- npm ou yarn

1. Clonez le dépôt :

```bash
git clone https://github.com/arthur-plp/festival-pluies.git
cd festival-pluies-juillet
```
2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Configuration de l'environnement

Renommez le fichier `.env.example` en `.env` (ou créez-le) : 

```bash
# .env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="une_cle_secrete_aleatoire"
NEXTAUTH_URL="http://localhost:3000"
```

4. Base de données & Seed

Initialisez la base de données et remplissez-la avec les données de test (20 conférences réalistes) :

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

**Note** : Le script de seed crée automatiquement deux utilisateurs pour tester les rôles :
- Utilisateur AVEC billet : `admin@test.com` / `password123`
- Utilisateur SANS billet : `newbie@test.com` / `password123`

5. Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ✅ Fonctionnalités Implémentées
- [x] Authentification : Création de compte et Connexion.
- [x] Catalogue : Liste des conférences avec filtres (Thème/Date).
- [x] Logique Métier : Vérification de la possession d'un billet avant réservation.
- [x] Agenda Perso : Ajout/Retrait de conférences à "Mon Programme".
- [ ] Paiement (Mocké) : Simulation d'achat de billet.

## 🤖 Utilisation de l'IA
Conformément aux contraintes du projet, des outils d'IA ont été utilisés :

- ChatGPT (OpenAI) : Génération du jeu de données (Seed) pour peupler la base avec des événements réalistes, et brainstorming sur le schéma de base de données.

- GitHub Copilot : Aide à l'écriture des différents composants React et fonctions utilitaires.

##
Projet réalisé par Arthur PHILIPPE - Partiel février 2026