import sampleData from '../sampleData.js';

import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql';

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    phone: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return sampleData.clients.find(client => client.id === parent.clientId);
      }
    }
  })
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return sampleData.projects;
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return sampleData.projects.find(project => project.id === args.id);
      }
    },
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        return sampleData.clients;
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return sampleData.clients.find(client => client.id === args.id);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
