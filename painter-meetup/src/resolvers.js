const painter = [
  {
    id: 0,
    name: "Claude",
    last_name: "Monnet",
  },
];

const resolvers = {
  Query: {
    hello: () => "Bonjour les artistes",
    // painter: () => painter,
    painter: (_, args, {models}) => models.Painter.findAll()
  },
  Mutation: {
    addpainter: (_, args, {models}) => {
      models.Painter.create({
        name: args.name,
        last_name: args.last_name
      })
      return models.Painter.findAll();
    },
  },
};

module.exports = resolvers;
