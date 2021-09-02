import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { db, auth } from '../firebase'
import SignUp from './SignUp';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    p: {
        color: 'red'
    }
});

    function SignIn () {
    const classes = useStyles();
    let history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data
        try {
            const res = await auth.signInWithEmailAndPassword(email, password).then(
                history.push("/home")
            );

        } catch (error) {
            console.error(error);
           
        }
    }

    function SignUp(){
        history.push("/signUp")

    }

    return (
        <Container maxWidth="sm">
            <div className="signIn">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        id="standard-basic"
                        name="email"
                        label="Email"
                        required
                        autoFocus
                        fullWidth
                        {...register("email", { required: { value: true, message: "Please enter your email" } })}
                    />
                    {errors.email && <p className={classes.p}>{errors.email.message}</p>}
                    <TextField
                        id="standard-basic"
                        name="password"
                        label="Password"
                        type="password"
                        required
                        autoFocus
                        fullWidth
                        {...register("password", { required: { value: true, message: "Please enter your password" } })}
                    />
                    {errors.password && <p className={classes.p}>{errors.password.message}</p>}
                    <br /><Button type="submit" className={classes.root} onClick={handleSubmit(onSubmit)} href="/cart">SignIn</Button>
                    <Link onClick={()=>SignUp()}>Don't have an Account? SignUp</Link>


                </form>

            </div>
        </Container>
    );
};

export default SignIn;