# Guide de configuration Supabase pour Equinoxe Évasion

## 1. Créer un compte Supabase

1. Rendez-vous sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "Start your project" ou "Sign up"
3. Vous pouvez vous connecter avec GitHub, GitLab, Google ou une adresse email

## 2. Créer un nouveau projet

1. Une fois connecté, cliquez sur "New project"
2. Choisissez une organisation (ou créez-en une)
3. Donnez un nom à votre projet (ex: "equinoxe-evasion")
4. Choisissez un mot de passe de base de données (notez-le, vous en aurez besoin plus tard)
5. Choisissez une région proche de vos utilisateurs (ex: Paris ou Frankfurt pour l'Europe)
6. Optez pour le plan gratuit (Free tier)
7. Cliquez sur "Create project"

## 3. Configurer les tables dans Supabase

Une fois votre projet créé, vous devez configurer les tables nécessaires:

### Table "reservations"

1. Dans le menu latéral, allez dans "Table Editor"
2. Cliquez sur "Create a new table"
3. Nommez la table "reservations"
4. Configurez les colonnes:
   - id: type int8, cochez "primary key" et "is identity"
   - nom: type text
   - email: type text
   - date: type date
   - personnes: type int4
   - commentaire: type text, cochez "is nullable"
   - created_at: type timestamptz, valeur par défaut: now()
5. Cliquez sur "Save"

### Table "annonces"

1. Cliquez à nouveau sur "Create a new table"
2. Nommez la table "annonces"
3. Configurez les colonnes:
   - id: type int8, cochez "primary key" et "is identity"
   - titre: type text
   - contenu: type text
   - created_at: type timestamptz, valeur par défaut: now()
4. Cliquez sur "Save"

## 4. Configuration de l'authentification (pour la page admin)

1. Dans le menu latéral, allez dans "Authentication" puis "Providers"
2. Vérifiez que "Email" est activé
3. Allez dans l'onglet "Users"
4. Cliquez sur "Create user"
5. Remplissez l'email et le mot de passe de l'administrateur
6. Cliquez sur "Create user"

## 5. Récupérer les clés d'API

1. Dans le menu latéral, allez dans "Project Settings" puis "API"
2. Vous y trouverez:
   - Project URL: copiez cette URL
   - anon public key: copiez cette clé
3. Ces informations seront à ajouter dans votre fichier .env.local

## 6. Configurer le fichier .env.local

Modifiez le fichier .env.local à la racine de votre projet avec les valeurs récupérées:

```
NEXT_PUBLIC_SUPABASE_URL=votre_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_public_key
```
