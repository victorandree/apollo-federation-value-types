const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { server: server1 } = require('./server1');
const { server: server2 } = require('./server2');

const BASE_PORT = 7000;

const SERVERS = [server1, server2];

async function startServers() {
  const res = SERVERS.map(async (server, index) => {
    const number = index + 1;
    const info = await server.listen(BASE_PORT + number);
    const name = `server ${number}`;

    console.log(`${name} up at ${info.url}graphql`);

    return { ...server, ...info, name };
  });

  return await Promise.all(res);
}

async function main() {
  const serviceList = await startServers();
  const gateway = new ApolloGateway({ serviceList });
  const server = new ApolloServer({ gateway, subscriptions: false });
  const info = await server.listen(BASE_PORT);

  console.log(`\n\ngateway up at ${info.url}graphql`);
}

main();
