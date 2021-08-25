import React from 'react';
import {makeStyles} from '@material-ui/styles'
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {db,auth} from '../firebase'
import { ArrowLeftTwoTone } from '@material-ui/icons';


const useStyles = makeStyles({
    root:{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    p:{
        color:'red'
    }
});
const SignUp = () => {

    const classes =useStyles();
    const { register, handleSubmit,formState:{errors} } = useForm();
    
    const onSubmit =async(data)=>{
        const{name, email, password, contact} =data
       // console.log(data)
        try{
            const res = await auth.createUserWithEmailAndPassword(email,password).then(
                
                alert("User registration successful")
            );
            const user = res.user;
            db.collection('user').doc(user.uid).set({
                uid: user.uid,
                name,
                email,
                contact
            }).then(
                console.log("profile set!")
            ).catch((error)=>{
                console.error(error.message)
            })

        }catch(error){
                console.error(error);
                alert(error.message)
        }
    }
    return (
        <Container maxWidth="sm">
            <div className="sigup">
            <h1 id ="signup">SignUp</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField 
             id="standard-basic"
             name ="name" 
             label="Name" 
             required 
             autoFocus 
             fullWidth 
             {...register("name", {required: {value:true, message:"Please enter your name"}})}
             />
             {errors.name && <p className={classes.p}>{errors.name.message}</p>}
            <TextField 
            id="standard-basic" 
            name ="email" 
            label="Email" 
            required 
            autoFocus 
            fullWidth 
            {...register("email", {required: {value:true, message:"Please enter your email"}})}
            />
            {errors.email && <p className={classes.p}>{errors.email.message}</p>}
            <TextField 
            id="standard-basic" 
            name ="password" 
            label="Password" 
            type="password" 
            required 
            autoFocus 
            fullWidth 
            {...register("password", {required: {value:true, message:"Please enter your password"}})}
            />
            {errors.password && <p className={classes.p}>{errors.password.message}</p>}
            <TextField 
            id="standard-basic" 
            name ="contact" 
            label="Contact" 
            required 
            autoFocus 
            fullWidth 
            {...register("contact",{required: {value:true, message:"Please enter your contact"}})}
            />
            {errors.contact && <p className={classes.p}>{errors.contact.message}</p>}
            <br/><Button type="submit" className={classes.root}>SignUp</Button>
            </form>
            
        </div>

        </Container>
        
    );
};

export default SignUp;