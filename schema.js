
const { openflights } = require('./data')

const {
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql')

const OpenflightsType = new GraphQLObjectType({
  name: 'Openflight',
  description: 'This represents an openflight',
  fields () {
    return {
      airport_id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      city: {
        type: new GraphQLNonNull(GraphQLString)
      },
      country: {
        type: new GraphQLNonNull(GraphQLString)
      },
      iata: {
        type: new GraphQLNonNull(GraphQLString)
      },
      icao: {
        type: new GraphQLNonNull(GraphQLString)
      },
      latitude: {
        type: new GraphQLNonNull(GraphQLFloat)
      },
      longitude: {
        type: new GraphQLNonNull(GraphQLFloat)
      },
      altitude: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      timezone: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      dst: {
        type: new GraphQLNonNull(GraphQLString)
      },
      tz: {
        type: new GraphQLNonNull(GraphQLString)
      },
      type: {
        type: new GraphQLNonNull(GraphQLString)
      },
      source: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  }
})
const OpenflightsQueryRootType = new GraphQLObjectType({
  name: 'OpenFlightsSchema',
  description: 'Openflights Application Schema Query Root',
  fields () {
    return {
      openflights: {
        type: new GraphQLList(OpenflightsType),
        description: 'List of flights',
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve (source, args, root, ast) {
          if (args.id) {
            return openflights.filter((a) => args.id === a.airport_id)
          }
          return openflights
        }
      }
    }
  }
})

const OpenflightsAppSchema = new GraphQLSchema({
  query: OpenflightsQueryRootType
  // mutation: BlogMutationType
})
module.exports = OpenflightsAppSchema
