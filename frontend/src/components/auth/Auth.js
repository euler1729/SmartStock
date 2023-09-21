import React from 'react'
import './Auth.css'

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { color } from '../../color';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import api from '../../API';

function Auth() {
    const [register, setRegister] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();


    React.useEffect(() => {
        const refresh_token = cookies.get('refresh_token');
        if (refresh_token) {
            const decode = jwtDecode(refresh_token);
            console.log(decode);
            const d = new Date();
            if (decode.exp < d.getMilliseconds()) {
                cookies.remove('refresh_token');
            } else {
                navigate('/');
                // window.location.reload();
            }
        }else{
            console.log("No refresh token");
        }
    }, []);

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (email === '' || password === '') {
            if(email==='') setError('Email can not be empty\n');
            if(password==='') setError('Password can not be empty\n');
            setLoading(false);
            return;
        } else {
            api.post('/auth/authenticate', {
                email: email,
                password: password
            }).then(res => {
                console.log(res.data);
                if (res.status < 300) {
                    const decode = jwtDecode(res.data.token);
                    console.log(decode);
                    cookies.set('refresh_token', res.data.token, { path: '/' });
                    navigate('/');
                    window.location.reload();
                } else {
                    setError("Wrong Credentials");
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                setError("Wrong Credentials");
                setLoading(false);
            })
        }
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (email === '' || password === '' || name === '') {
            setError('Please fill all the fields');
            setLoading(false);
            return;
        } else {
            api.post('/auth/register', {
                name: name,
                email: email,
                password: password
            }).then(res => {
                console.log(res.data);
                if (res.status < 300) {
                    const decode = jwtDecode(res.data.refresh_token);
                    console.log(decode);
                    cookies.set('refresh_token', res.data.refresh_token, { path: '/' });
                    navigate('/');
                    window.location.reload();
                } else {
                    setError("Probably duplicate email!");
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                setError("Proabably duplicate email!");
                setLoading(false);
            })
        }
    }

    return (
        <div className='auth'>
            <div className='auth-container'>
                {
                    error !== '' && <p
                        style={{
                            color: 'red',
                            justifyContent: "center",
                            fontSize: "15px"
                        }}>{error}</p>
                }
                {/*Login and Register Form*/}
                <div className='auth-login'>
                    <div className='auth-login-container'>
                        {
                            register ? (
                                <form
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div><h2>Sign Up</h2></div>

                                    <div className='input-field'>
                                        <p>Name</p>
                                        <input name='name' value={name} onChange={(e) => setName(e.target.value)} type="text" autoComplete='off' />
                                    </div>
                                    <div className='input-field'>
                                        <p>Email</p>
                                        <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" autoComplete='off' />
                                    </div>
                                    <div className='input-field'>
                                        <p>Password</p>
                                        <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete='off' />
                                    </div>
                                    <div className='formBtn'>
                                        <Button
                                            style={{
                                                backgroundColor: color.violet,
                                                color: 'white'
                                            }}
                                            variant='contained'
                                            onClick={handleRegister} type='submit'>
                                            {loading ? "Registering..." : "Register"}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <form
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div><h2>Sign In</h2></div>
                                    <div className='input-field'>
                                        <p>Email</p>
                                        <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" autoComplete='on' />
                                    </div>
                                    <div className='input-field'>
                                        <p>Password</p>
                                        <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete='on' />
                                    </div>
                                    <div className='formBtn'>
                                        <Button
                                            style={{
                                                backgroundColor: color.violet,
                                                color: 'white'
                                            }}
                                            variant='contained'
                                            onClick={handleSignIn}
                                            type='submit'>
                                            {
                                                loading ? "Logging In..." : "Login"
                                            }
                                        </Button>
                                    </div>
                                </form>

                            )
                        }

                        <p onClick={() => setRegister(!register)}
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}>{
                                register ? "Already have an account? Login"
                                    : "Dont have an account? Register"
                            }
                        </p>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Auth