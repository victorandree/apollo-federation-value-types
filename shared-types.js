const { gql } = require('apollo-server');

module.exports.AddressModule = {
  typeDefs: gql`
    type Address {
      street: String!
    }
  `,
};
