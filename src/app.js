import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import expressValidator from "express-validator";
import log4js from "log4js";

import { sendResponse } from "./utils";
import routes from "./routes";
import { typeDefs, resolvers } from "./graphql";

const app = express();
app.disable("x-powered-by");

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(expressValidator());

app.get("/", (req, res) => {
  sendResponse(
    res,
    200,
    { message: "Welcome to Awesome Products" },
    "Successful"
  );
});
app.use("/api", routes);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
export default app;
