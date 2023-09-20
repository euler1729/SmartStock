import React from 'react'
import './Auth.css'

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { color } from '../../color';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

function Auth() {
    const [register, setRegister] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [jwt, setJwt] = React.useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();


    React.useEffect(() => {
        setJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJlbWFpbEBnbWFpbC5jb20iLCJleHAiOjd9.daHjrmUf0aq08-3IUuS3ZYYejqF-9OVSERaYq-XKQ8I");
    }, []);

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (email === '' || password === '') {
            setError('Please fill all the fields');
            setLoading(false);
            return;
        } else {
            const decode = jwtDecode(jwt);
            console.log(decode);
            const cookies = new Cookies();

            cookies.set('refresh_token', jwt, { expires: new Date(Date.now() + decode.exp * 7 * 24 * 60 * 60 * 10000), path: '/' });
            navigate('/');
            window.location.reload();
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
            setLoading(false);
            setRegister(false);
        }
    }

    return (
        <div className='auth'>
            <div className='auth-container'>

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

                {
                    error !== '' && <p
                        style={{
                            color: 'red',
                            justifyContent: "center",
                            fontSize: "15px"
                        }}>{error}</p>
                }
            </div>
        </div >
    )
}

export default Auth