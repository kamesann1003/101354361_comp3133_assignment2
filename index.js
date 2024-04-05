const mongoose = require("mongoose")
const express = require("express")
const app = express()

const {ApolloServer, gql} = require("apollo-server-express")

const resolvers = require("./resolver")
const typeDefs = require("./typeDefs")

var {graphqlHTTP} = require("express-graphql")
var {buildSchema} = require("graphql")

const Employee = require('./models/Employees')
const User = require('./models/Users')

const SERVER_PORT = process.env.PORT || 8080
const DB_CONNECTION_STRING = "mongodb+srv://alilou:alilou1003@cluster0.6yuv7vd.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const server = new ApolloServer({typeDefs, resolvers})

async function startServer(){
    await server.start();

    server.applyMiddleware({ 
        app,
    });
    app.listen(SERVER_PORT, () => {
        console.log(`Server port running at: http://localhost:${SERVER_PORT}`)
    })
    
}

startServer()








