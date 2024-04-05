const {gql} = require("apollo-server-express");

// GraphQL type defnition
const typeDefs = gql
    `type Query{
        logIn(login: String!, password: String!): String
        getEmployeeById(id: ID!): Employee
        getAllEmployee: [Employee]
    }
    type Mutation{
        signUp(username: String!, email: String!, password: String!): String
        addEmployee(first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
        updateEmployeeById(id: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
        deleteEmployeeById(id: ID!): String
    }
    type Employee{
        id: ID
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Float
    }
    type User{
        id: ID
        username: String
        email: String
    }
    `;

module.exports = typeDefs