# Equinoxe Évasion

Site web pour un centre équestre proposant des activités et un hébergement en gîte.

## À propos du projet

Equinoxe Évasion est un site web développé avec [Next.js](https://nextjs.org) qui permet aux visiteurs de :
- Découvrir les activités du centre équestre
- Réserver des activités via un formulaire
- Consulter les annonces et actualités
- Pour les administrateurs : gérer les réservations via un espace sécurisé

### Structure du site

Le site se compose de 4 pages principales :
1. **Page d'accueil** : Présentation du centre équestre et de l'hébergement en gîte
2. **Page de réservation** : Formulaire pour réserver des activités
3. **Page d'annonces** : Liste des actualités et annonces
4. **Page d'administration** : Espace sécurisé pour gérer les réservations

## Technologies utilisées

- **Frontend** : Next.js (App Router), TypeScript, Tailwind CSS
- **Backend/Base de données** : Supabase (API, Auth, Database)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure du projet

```
src/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── reservation/
│   │   └── page.tsx          # Formulaire de réservation
│   ├── annonces/
│   │   └── page.tsx          # Affichage des annonces
│   └── admin/
│       └── page.tsx          # Interface d'administration
└── lib/
    └── supabaseClient.ts     # Client pour l'API Supabase
```

## Configuration de la base de données

Ce projet utilise [Supabase](https://supabase.com) comme backend. Pour mettre en place votre propre instance:

1. Suivez les instructions dans le fichier [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. Configurez le fichier `.env.local` avec vos identifiants Supabase

## Fonctionnalités

- **Réservation d'activités** : Formulaire permettant aux visiteurs de réserver des activités équestres
- **Actualités/Annonces** : Affichage des dernières nouvelles du centre équestre
- **Espace administrateur** : Interface sécurisée pour gérer les réservations

## Déploiement

Pour déployer l'application:

1. Configurez votre projet Supabase
2. Déployez l'application sur [Vercel](https://vercel.com), [Netlify](https://netlify.com) ou votre hébergeur préféré
3. Configurez les variables d'environnement sur votre plateforme d'hébergement

## Ressources additionnelles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
