import React from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { color } from "../../color";
import API from "../../API";

const Account = () => {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        console.log(config);
        if (refresh_token) {
            const decode = jwtDecode(refresh_token);
            // console.log(decode);
            const req = {
                uid: decode.uid,
                email: decode.sub.toLowerCase()
            }
            if (decode.exp < (new Date()).getMilliseconds()) {
                new Cookies().remove('refresh_token');
                window.location.reload();
            } else {
                API.post('/account/info', req, config).then(res => {
                    console.log(res);
                    if (res.status < 300) {
                        setName(res.data.name);
                        setEmail(res.data.email);
                    } else {
                        // new Cookies().remove('refresh_token');
                        setName(<span style={{ color: color.red }}>Error</span>);
                        setEmail(<span style={{ color: color.red }}>Error</span>);
                        window.location.reload();
                    }
                }).catch(err => {
                    setName(<span style={{ color: 'red' }}>Error</span>);
                        setEmail(<span style={{ color: 'red' }}>Error</span>);
                    console.log(err);
                });
            }
        } else {
            new Cookies().remove('refresh_token');
            window.location.reload();
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
        }}>
            <h1>Account</h1>
            <h2>Name: <span style={{ color: color.blue }}>{name}</span></h2>
            <h2>Email: <span style={{ color: color.blue }}>{email}</span></h2>
        </div>
    );
}
export default Account;