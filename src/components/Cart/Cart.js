import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {

	const [openCheckout, setOpenCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubit, setDidSubit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
	setOpenCheckout(true);
  }

  const submitOrderHandler = async (userData) => {
	setIsSubmitting(true);

	const response = await fetch("https://http-fod-shop-default-rtdb.firebaseio.com/orders.json", {
			method: "POST",
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items
			})
		});
		setIsSubmitting(false);
		setDidSubit(true);
		cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
			{hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  		</div>
  )

  const cartModalContent = (<>
  {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
	  {openCheckout && (
		<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>
	  )}
	{!openCheckout && modalAction}
  </>);

  const isSubmitingModalContent = <p>Sending ordered data...</p>

  const didSubmitModalContent = (
	<>
  		<p>Successfully</p>
  		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
  		</div>
  	</>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubit && cartModalContent}
	  {isSubmitting && isSubmitingModalContent}
	  {!isSubmitting && didSubit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
