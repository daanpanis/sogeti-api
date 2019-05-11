import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";

export async function bootstrap(port) {
    const schema = await buildSchema({
        resolvers: [
            __dirname + '/resolvers/**/*.resolver.js',
        ],
        emitSchemaFile: true,
        validate: false,
    });

    const server = new ApolloServer({
            schema,
        }
    );

    const {url} = await server.listen(port);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}