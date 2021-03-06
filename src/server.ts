import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";
import {Container} from "typedi";
import {Context} from "./auth/context";
import {CustomAuthChecker} from "./auth/auth-checker";
import {DeclarationService} from "./services/declaration.service";
import admin = require("firebase-admin");
import {StatusUpdateService} from "./services/status-update.service";

export async function bootstrap(port) {
    setupFirebase();

    const schema = await buildSchema({
        resolvers: [
            __dirname + '/resolvers/**/*.resolver.js',
        ],
        emitSchemaFile: true,
        validate: false,
        authChecker: (Container.get(CustomAuthChecker) as CustomAuthChecker).authChecker
    });

    const server = new ApolloServer({
        schema,
        context: async ({req}) => {
            if (req && req.headers && req.headers.authorization) {
                try {
                    const verified = await admin.auth(Container.get("firebase-app")).verifyIdToken(req.headers.authorization as string);
                    return {
                        user: {
                            email: verified.email,
                            sub: verified.sub,
                            iat: verified.iat,
                            firebase: verified.firebase,
                            exp: verified.exp,
                            email_verified: verified.email_verified,
                            auth_time: verified.auth_time,
                            aud: verified.aud,
                            uid: verified.uid
                        },
                    } as Context;
                } catch (ex) {
                    console.log(ex);
                }
            }
            return {} as Context;
        }
    });


    const {url} = await server.listen(port);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

function setupFirebase() {
    // if (process.env.SOGETI_GOOGLE_CREDENTIALS) {
    if (true) {
        const credentialsPath = process.env.SOGETI_GOOGLE_CREDENTIALS;
        // const credentials = require(credentialsPath);
        const credentials = require("/home/rubenxvde/declaratieproject-firebase-adminsdk-et86q-0634cc0bb6.json");
        Container.set("firebase-app", admin.initializeApp({
            credential: admin.credential.cert({
                projectId: credentials.project_id,
                clientEmail: credentials.client_email,
                privateKey: credentials.private_key
            })
        }));
    } else {
        console.log("Did not setup firebase")
    }
}
