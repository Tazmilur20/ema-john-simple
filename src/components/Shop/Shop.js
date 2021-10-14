import React, { useState,useEffect } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import '../Product/Product'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb } from '../../utilities/fakedb';
import {getStoredCart, removeFromDb} from '../../utilities/fakedb';
import { Link } from 'react-router-dom';



const Shop = () => {
     const first10=fakeData.slice(0,10);
    const [products, setProducts]= useState(first10);
   // console.log(products)
     const [cart,setCart]=useState([])
       
    const handleAddProduct=(product)=>{
        //  console.log('product added',product)
        const toBeAddedKey=product.key;
        const sameProduct=cart.find(pd=>pd.key=== toBeAddedKey);
        let count=1;
        let newCart;
        if(sameProduct){
          count=sameProduct.quantity+1;
          sameProduct.quantity=count;
          const others=cart.filter(pd=>pd.key!== toBeAddedKey);
          newCart=[...others,sameProduct];

        }
        else{
            product.quantity=1;
            newCart=[...cart,product];
        }
        
         setCart(newCart)
        
         addToDb(product.key,count);
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
    

    return (
        <div className='twin-container'>
            <div className="product-container">
           
            {
                products.map(pd => <Product 
                    key={pd.key}
                    showAddToCart={true}
                    handleAddProduct={handleAddProduct}
                    product={pd}>

                    </Product>)
            }
        

            </div>
            <div className="cart-container">
              <Cart cart={cart}>
               <Link to='/review'>
                <button className='main-button'>Review Order</button>
                </Link>
              </Cart>
            </div>
            
        </div>
    );
};

export default Shop;