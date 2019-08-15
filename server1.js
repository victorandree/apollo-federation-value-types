const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema} = require('@apollo/federation');
const { AddressModule } = require('./shared-types');
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    houses: [House!]!
  }

  type House @key(fields: "id") {
    id: ID!
    address: Address
  }
`;

const resolvers = {
  Query: {
    houses() {
      return [{ id: '1', address: { street: "Street 123" }}]
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

