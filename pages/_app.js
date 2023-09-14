import { useContext, useState } from "react";
import Head from "next/head";
import AppContext from "../components/context";
import Layout from "../components/layout";

function MyApp(props) {
  // Initialize both cart and user in the state
  const [state, setState] = useState({ cart: { items: [], total: 0 }, user: null });
  const { Component, pageProps } = props;

  // Function to update the user in the state
  const setUser = (newUser) => {
    setState(prevState => ({ ...prevState, user: newUser }));
  };

  const addItem = (item) => {
    let { items } = state.cart;
    let newCart;
    const foundItem = items.find((i) => i.id === item.id);
    
    if (!foundItem) {
      let temp = { ...item, quantity: 1 };
      newCart = {
        items: [...state.cart.items, temp],
        total: state.cart.total + item.price,
      };
    } else {
      newCart = {
        items: items.map((item) => item.id === foundItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item),
        total: state.cart.total + item.price,
      };
    }

    setState(prevState => ({ ...prevState, cart: newCart }));
  };

  const removeItem = (item) => {
    let { items } = state.cart;
    const foundItem = items.find((i) => i.id === item.id);
    let newCart;
    
    if (foundItem.quantity > 1) {
      newCart = {
        items: items.map((item) => item.id === foundItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item),
        total: state.cart.total - item.price,
      };
    } else {
      newCart = {
        items: items.filter((i) => i.id !== foundItem.id),
        total: state.cart.total - item.price,
      };
    }

    setState(prevState => ({ ...prevState, cart: newCart }));
  };

  return (
    <AppContext.Provider value={{
      cart: state.cart,
      addItem: addItem,
      removeItem: removeItem,
      isAuthenticated: Boolean(state.user),
      user: state.user,
      setUser: setUser // Make setUser available through context
    }}>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
    
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;