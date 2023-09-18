import React, { useState } from "react";
import Cart from "../components/cart";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import { InputGroup, Input } from "reactstrap";

function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const [query, setQuery] = useState("");
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  return (
    <ApolloProvider client={client}>
      <div className="search">
        {/* Replacing the h2 tag with an image */}
        <img src="/zipdishbanner.png" alt="Local Restaurants" />
        <InputGroup>
          <Input
            placeholder="Search for local restaurants..."
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            value={query}
          />
        </InputGroup><br />
      </div>
      <RestaurantList search={query} />
      <Cart />
    </ApolloProvider>
  );
}

export default Home;
