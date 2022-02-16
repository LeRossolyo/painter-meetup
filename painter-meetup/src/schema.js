const schema = `
  type Query {
    hello : String!
    painter : [Painter!]
  }

  type Mutation {
    addpainter(name: String!, last_name: String!): [Painter!]
  }

  type Painter {
    id: ID!
    name: String!
    last_name: String!
  }
`

module.exports = schema