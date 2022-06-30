import { gql } from "@apollo/client";

const ADD_CLIENTS = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
const EDIT_CLIENT = gql`
  mutation editClient($id: ID!, $name: String!, $email: String!, $phone: String!) {
    editClient(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const ADD_PROJECTS = gql`
  mutation addProject($name: String!, $description: String!, $clientId: ID!, $status: ProjectStatus!) {
    addProject(name: $name, description: $description,clientId: $clientId, status: $status) {
      id
      name
      description
      status
      client{
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate! ) {
    updateProject(id: $id, name: $name, description: $description, status: $status ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;



export { ADD_CLIENTS, EDIT_CLIENT, ADD_PROJECTS, DELETE_CLIENT, DELETE_PROJECT, UPDATE_PROJECT };
