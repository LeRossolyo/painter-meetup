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
npm i graphql apollo-server sqlite3 --save-dev
```

graphql : qui nous servira a crée des schémas graphql de données
apollo-server : qui nous permettera de crée un server

Créez un fichier index.js qui sera le point de départ de notre API

## Création de notre server Apollo

Dans index.js :

```js
const { ApolloServer } = require("apollo-server");

const schema = `
  type Query {
    hello : String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Bonjour les artistes",
  },
};

const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

app.listen().then(({ url }) => console.log(`Server on port ${url} 🎨`));
```

#### Explication de chaque éléments :

```js
const { ApolloServer } = require("apollo-server");
```

Permet de récupérer le composant "ApolloServer" du package "apollo-server" et de l'utiliser.

```js
const schema = `
    type Query {
      hello : String!
    }
  `;
```

Création d'un schéma de requêtes avec leurs noms et type de ce qu'elles renvoient.
Ici on a une query du nom de hello qui nous renverra un donnée de type "String" obligatoirement signifier avec le "!"

```js
const resolvers = {
  Query: {
    hello: () => "Bonjour les artistes",
  },
};
```

Création de resolvers c'est a dire de fonction de résolutions:

NB : Fonction flécher en javascript :

```js
const fonction = (argument) => {
  action;
};
```

Un resolvers peut avoir plusieurs arguments prédéfinis mais nous y reviendrons plus tard.

```js
const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

app.listen().then(({ url }) => console.log(`Server on port ${url} 🎨`));
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
  hello: String!
  painters: [Painter]
}

type Painter {
  id: ID!
  name: String!
  last_name: String!
}
```

On va crée des données temporaires dans le fichier resolver.

```js
const painter = [
  {
    id: 0,
    name: "Claude",
    last_name: "Monnet",
  },
];
```

On va ensuite rejouter un resolvers a cette nouvelle Query painter qui va nous renvoyer les données d'un peintre.

```js
const resolvers = {
  Query: {
    hello: () => "Bonjour les artistes",
    painters: () => painter,
  },
};
```

On remarque bien que le nom de mon resolvers est bien le même que ma query.

## Création d'une Mutation

Une mutation est un requêtes de modification, elle comprends donc les requêtes "POST", "DELETE" et autres.

On va tout d'abord rajouter le type mutation a notre schéma de type

```graphql
type Mutation {
  addpainter(name: String!, last_name: String!): [Painter!]
}
```

Puis on ajoute un resolver simple dans le resolvers (Attention a bien garder le même nom que le type)

```js
const resolvers = {
  Mutation: {
    addpainter: (_, args) => {
      painter.push({
        id: painter.length,
        name: args.name,
        last_name: args.last_name,
      });
      return painter;
    },
  },
};
```

On vas ensuite tester en ajoutant différents artistes a notre liste.

### Création des Bases de données

#### Création de la DB et des Models

On va ensuite crée une base de données pour stocker nos différents peintre et leurs peintures !

On va utiliser une base donnée sqlite car c'est rapide a mettre en place et très simple d'utilisation. Notament avec Sequelize Client.

Initialisation de la DB.

```bash
  node_modules/.bin/sequelize init
```

Initialisation d'un models de donner.

```bash
  node_modules/.bin/sequlize model:create --name Painter --attributes name:string,last_name:string
```

Vous obtiendrez alors deux fichiers une dans models qui contiendra le models de votre élement en base de données. et le resolvers dans le dossier migrations.

On fait de même pour les peintures.

```bash
  node_modules/.bin/sequlize model:create --name Painting --attributes name:string,location:string
```

#### Mise en relation des deux tables

On va ajouter dans le resolvers de Painting une variables painterId, qui sera la référence du peintre qui a fait cette peinture.

```js
painterId: {
  type: Sequelize.INTEGER;
}
```

Ensuite nous allons ajoutez les relations entres les deux tables:

Dans le fichier ./models/painter.js:

```js
static associate(models) {
    Painter.hasMany(models.Painting)
}
```

Dans le fichier ./models/painting.js:

```js
static associate(models) {
  Painting.belongsTo(models.Painter, {foreignKey: 'painterId'})
}
```

Ce qui reviens a faire que plusieurs donnée peuvent être accéssible via le painterID donc plusieurs peintures.

#### Ajouts de la DB a l'Api

Une fois notre base de données crée il va falloir l'ajouter à notre API

Dans index.js on va écrire:

```js
const models = require("./models");

const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { models },
});
```

Ce qui va nous permettre de rajouter notre DB a notre seveur et de l'utiliser dans nos resolvers GraphQL.

Modification de la mutation de la query.

```js
const resolvers = {
  Query: {
    hello: () => "Bonjour les artistes",
    painter: (_, args, { models }) => models.Painter.findAll(),
  },
  Mutation: {
    addpainter: (_, args, { models }) => {
      models.Painter.create({
        name: args.name,
        last_name: args.last_name,
      });
      return models.Painter.findAll();
    },
  },
};
```
Vous pourrez ensuite lancer votre API et ajouter un peintre pour voir si ca marche :-)