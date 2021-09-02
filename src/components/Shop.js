import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import { useHistory } from 'react-router';
//import db from '../firebase'
import {db, auth} from '../firebase'
import Button from '@material-ui/core/Button';


const Shop = () => {

    const [products, setProducts] = useState([])
    let history = useHistory()
    let user = auth.currentUser
    const fetchData = async () => {
        db.collection("products").onSnapshot((snapshot) => {
            const prodData = []
            snapshot.forEach((doc) => {
                prodData.push({ ...doc.data(), id: doc.id })
            })
            setProducts(prodData)
            console.log(prodData)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addToCart = async(product) =>{
        //console.log(product)
        try{
            if(user){
                db.collection("cart").add({
                    uid: user.uid,
                    product
                }).then(
                    alert("Items added to cart")
                ).catch((error)=>{
                    console.log(error.message)
                })
            }else{
                alert("Please login")
            }

        }catch(error){
            console.log(error.message)
        }
    }
    return (

        
        <div className="prices">
          
            <div className="container">
                <div className="row">
                    {products && products.map(product => (
                        <div className="product-display">
                            <figure>
                                <img src={product.productImage} id="product-image" />


                                <figcaption className="product-name">{product.productName}</figcaption>
                                <span className="product-description">{product.productDescription}</span><br />
                                <span className="product-price">R{product.productPrice}</span><br />
                                <Button variant="contained" onClick={()=>addToCart(product)} size="small" color="primary" >Add to cart</Button>
                            </figure>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Shop;