import { Button, ButtonBase, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const useStyles= makeStyles({
    image:{

    },
    img:{

    },
    delBtn:{
        
    },


})

const Cart = () => {

    
    let user = auth.currentUser
    const [cartList, setCartList] = useState([])
    const fetchCartItems = async () => {
        try {
            if (user) {
                const cartData = []
                const query = await db.collection("cart").where("uid", "==", user?.uid).get()
                query.forEach((doc) => {
                    console.log(doc.data)
                    cartData.push({ ...doc.data(), id: doc.id })
                })
                setCartList(cartData)
            } else {
                alert("Please Login")
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    return (
        <div >
            { cartList && cartList.map(cartItem =>(
                <Paper>
                <Grid container direction="column">
                    <Grid item>
                        <ButtonBase>
                        <img src={cartItem.product.productImage}/>
                        </ButtonBase>
                        
                    </Grid>
                    <Grid container xs>
                        <Grid container xs item direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography>
                                    {cartItem.product.productName}
                                </Typography>
                                <Typography>
                                {cartItem.product.productDescription}
                                </Typography>

                            </Grid>
                        </Grid>
                        <Button variant="contained" color="secondary">Remove</Button>
                    </Grid>
                    <Grid>
                        <Typography>
                        {cartItem.product.productPrice}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            ))
                
            }
        </div>
    );
};

export default Cart;