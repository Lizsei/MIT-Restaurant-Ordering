import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardBody, CardTitle, Badge } from 'reactstrap';
import AppContext from './context';
import Link from 'next/link';

function Cart() {
  const { cart, addItem, removeItem } = useContext(AppContext);
  const router = useRouter();

  const renderItems = () => {
    return cart.items && cart.items.map((item) => {
      if (item.quantity > 0) {
        return (
          <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pb-2" key={item.id}>
            <span className="h5">{item.name}</span>
            <span className="h5">${item.price}</span>
            <div>
              <Button className="btn-sm" onClick={() => addItem(item)}>+</Button>
              <Button className="btn-sm" onClick={() => removeItem(item)}>-</Button>
              <span className="ml-2">{item.quantity}x</span>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <h1></h1>
      <Card className="p-3">
        <CardTitle>Your Order:</CardTitle>
        <hr />
        <CardBody>
          <div className="mb-2">
            <small>Items:</small>
          </div>
          {renderItems()}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Badge className="badge-light">
              <h5 className="text-secondary">Total:</h5>
              <h3 className="text-primary">${cart.total}</h3>
            </Badge>
            <Link href="/checkout/">
              <Button color="primary">Order</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Cart;
