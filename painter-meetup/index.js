const {ApolloServer} = require("apollo-server");
const schema = require("./src/schema")
const resolvers = require("./src/resolvers")
const models = require("./models")

const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {models}
});

app.listen().then(({url}) => console.log(`Server on port ${url} 🎨`))