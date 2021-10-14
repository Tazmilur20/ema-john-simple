 import React from 'react';

const Cart = (props) => {
   // console.log(props)
    const cart=props.cart;
   // const totalPrice= cart.reduce((total,prd)=>total+prd.price,0)
  let total=0;
  for(let i=0;i<cart.length;i++){
      const product = cart[i];
      total=total+product.price*product.quantity;
   //  console.log(product.price)
  }
  let shipping=0;
  if(total>0 && total<15){
      shipping=12.99;
  }
  else if(total>=15 && total<35){
      shipping=4.99;
  }
  else if(total>=35){
      shipping=0
  }
  const tax=(total/10);
  const grandTotal=(total+shipping+tax).toFixed(2)

    return (
        <div>
             <h3 className="bg-danger">Order Summary</h3>
                <h5>Item Ordered : {cart.length} </h5>
                <p>shipping cost :{shipping}</p>
                <p>Tax+ VAT :{tax}</p>
                <p>Total Price: {grandTotal }</p>
                <br/>
                {props.children}
                
        </div>
    );
};

export default Cart;