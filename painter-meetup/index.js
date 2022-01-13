const {ApolloServer} = require("apollo-server");

const schema = `
  type Query {
    hello : String!
    painter : Painter
  }

  type Painter {
    id: ID!
    name: String!
    last_name: String!
  }
`

const resolvers = {
  Query : {
    hello : () => "Bonjour les artistes",
    painter: () => ({id: 1, name: "Claude", last_name: "Monnet"})
  }
}

const app = new ApolloServer({
  typeDefs: schema,
  resolvers
});

app.listen().then(({url}) => console.log(`Server on port ${url} 🎨`))