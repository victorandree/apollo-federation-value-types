const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema} = require('@apollo/federation');
const { AddressModule } = require('./shared-types');
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    offices: [Office!]!
  }

  type Office @key(fields: "id") {
    id: ID!
    address: Address
  }
`;

const resolvers = {
  Query: {
    offices() {
      return [{ id: '500', address: { street: "Street 123" }}]
    }
  }
};

const Module = { typeDefs, resolvers };

module.exports.server = new ApolloServer({
  schema: buildFederatedSchema([
    Module,
    AddressModule
  ]),
});

