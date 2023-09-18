import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkoutForm';
import AppContext from '../components/context';
import Cart from '../components/cart';

function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false); // New state variable
  const { isAuthenticated } = useContext(AppContext);

  useEffect(() => {
    async function initializeStripe() {
      const stripe = await loadStripe('pk_test_51Nk9OZA2J3d29yB6oVJzBQhUgZRYqa6BaYi80wdC0juIXfVaBnkmzw8CvZZNpk4Cg75FgLRADaF0HSLG468WxgJF00xPGDodYV');
      setStripePromise(stripe);
    }

    initializeStripe();
  }, []);


  const handleOrderSuccess = () => { // New function

    console.log("handleOrderSuccess called");  // Added this line

    setOrderSuccess(true);
  };


  if (!stripePromise) {
    return 'Loading...';  // Replace with a loading spinner or something similar
  }

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm onOrderSuccess={handleOrderSuccess} /> {/* Passing the new function as a prop */}
        </Elements>
        {orderSuccess && <div>Order successful! Thank you for your purchase.</div>} {/* New success message */}
      </Col>
    </Row>
  );
}

export default Checkout;



