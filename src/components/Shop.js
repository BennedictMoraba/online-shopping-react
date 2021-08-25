import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Cart from './Cart';
//import db from '../firebase'
import {db} from '../firebase'
import Button from '@material-ui/core/Button';

const Shop = () => {

    const [products, setProducts] = useState([])
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
                                <Button variant="contained" href="/cart" size="small" color="primary" >Add to cart</Button>
                            </figure>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Shop;