const express = require("express");
// const colors = require("colors");
const connectDb = require("./config/db");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 8000;

const app = express();

//connect DB
connectDb();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`running on port ${port}`));
