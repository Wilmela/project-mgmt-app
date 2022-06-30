import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Project from "./Pages/Project";

import AOS from "aos";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

const App = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });
  return (
    <div className="position-relative w-100">
      <ApolloProvider client={client}>
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </div>
      </ApolloProvider>
    </div>
  );
};

export default App;
