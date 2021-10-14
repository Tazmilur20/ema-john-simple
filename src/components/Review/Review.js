import React, { useEffect,useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart'
import {getStoredCart, removeFromDb, clearTheCart} from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';


const Review = () => {
  const [cart, setCart]=useState([])
  const [orderPlaced,setOrderPlaced]=useState(false);
  const history = useHistory()

  const handlePrpcessCheckout = ()=>{
    //   setCart([]);
    //   setOrderPlaced(true);
    //    clearTheCart();
     history.push('/shipment')

     
  }

  const removeProduct=(productKey)=>{
      console.log('Removing product',productKey);
      const newCart=cart.filter(pd=>pd.key!==productKey);
      setCart(newCart);
      removeFromDb(productKey);
  }
    useEffect(()=>{
        //cart
        const saveCart=getStoredCart();
        const productKeys=Object.keys(saveCart);
        // console.log(saveCart);
        // console.log(productKeys);
        const cartProducts=productKeys.map(key =>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=saveCart[key]
            return product;

        });
        //console.log(cartProducts);
        setCart(cartProducts);

    },[])

    let thankyou;
    if(orderPlaced){
     thankyou= <img src={happyImage} alt="" />
    }
    

    return (
        <div className='twin-container'>
            
            <div className='product-container'>
            {
                cart.map(pd=><ReviewItem 
                    key={pd.key}
                    removeProduct={removeProduct}
                    product={pd} ></ReviewItem>)
            }
            {thankyou}
            
          
            </div>
            <div className='cart-container'>
                 <Cart cart={cart}>
                     <button onClick={handlePrpcessCheckout} className='main-button'>
                         Proceed Checkout
                     </button>
                 </Cart>
            </div>


        </div>
    );
};

export default Review;