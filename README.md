# Painter-meetup
GraphQL introduction for everyone and a WorkShop introduction

## Set-up

### Installation de nodeJs

`node -v`

Si vous voyez une version s'afficher c'est tout bon vous avez node d'installer sur votre machine.
Pour les autres installer le en utilisant les commandes suivante en fonction de votre distribution linux.

### Fedora

```sh
sudo dnf install nodejs
```

### Ubuntu

```sh
sudo apt install nodejs
```

Une fois node installé on vas pouvoir commencer !

## Création du projet

Créez un projet vierge

```sh
mkdir painter-meetup
cd painter-meetup
```

Initialisez un projet npm

```sh
npm init -y
```

Vous trouvrez un fichier package.json : c'est ce fichier qui nous servira de répertoire pour toutes les différents packages que nous allons installer.

Installation des différents packages dont nous allons avoir besoins

Rajoutez eu niveau de scripts

```json
    "start": "node index.js"
```

Vous verrez plus tard pourquoi

```sh
npm i graphql apollo-server
```

graphql : qui nous servira a crée des schémas graphql de données
apollo-server : qui nous permettera de crée un server


Créez un fichier index.js qui sera le point de départ de notre API


## Création de notre server Apollo

Dans index.js :

```js
const {ApolloServer} = require('apollo-server')

const schema = `
  type Query {
    hello : String!
  }
`

const resolvers = {
  Query : {
    hello : () => "Bonjour les artistes"
  }
}

const app = new ApolloServer({
  typeDefs: schema,
  resolvers
});

app.listen().then(({url}) => console.log(`Server on port ${url} 🎨`))
```

#### Explication de chaque éléments :

```js
const {ApolloServer} = require('apollo-server')
```

Permet de récupérer le composant "ApolloServer" du package "apollo-server" et de l'utiliser.

```js
  const schema = `
    type Query {
      hello : String!
    }
  `
```

Création d'un schéma de requêtes avec leurs noms et type de ce qu'elles renvoient.
Ici on a une query du nom de hello qui nous renverra un donnée de type "String" obligatoirement signifier avec le "!"

```js
  const resolvers = {
    Query : {
      hello : () => "Bonjour les artistes"
    }
  }
```

Création de resolvers c'est a dire de fonction de résolutions:

Fonction fléchez en javascript :
```js
  const fonction = (argument) => {action}
```

Un resolvers peut avoir plusieurs arguments prédéfinis mais nous y reviendrons plus tard.

```js
  const app = new ApolloServer({
    typeDefs: schema,
    resolvers
  });

  app.listen().then(({url}) => console.log(`Server on port ${url} 🎨`))
```

app est le server qui mets en relation les schémas et les resolvers qui leurs sont associer via un nom communs ici "hello".

### Test

Pour lancer votre server tapez:

```sh
  npm start
```
Résultat obtenus :

```sh
➜  painter-meetup git:(main) ✗ npm start

> painter-meetup@1.0.0 start
> node index.js

Server on port http://localhost:4000/ 🎨
```

Ouvrez votre navigateur de rechercher et taper l'adresse "http://localhost:4000/

vous devrire trombé sur cette page

CF Image Afficher

Puis vous pouvez essayer de taper votre requète dans le terminal de commande

Bravo vous venez de créez une API GRAPHQL !

## Création d'une Query

### Création d'un nouveau Type

On va créer un type "Painter" qui contiendra toutes les données d'un peintre.
On crée aussi une quey painter qui va nous renvoyer les données d'un peintre.

```graphql
  type Query {
    hello : String!
    painter : Painter
  }

  type Painter {
     id: ID!
     name: String!
     last_name: String!
  }
```

On va ensuite rejouter un resolvers a cette nouvelle Query painter.



## Création d'une Mutation