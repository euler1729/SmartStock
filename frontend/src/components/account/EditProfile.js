import React, {useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { color } from '../../color';


const EditProfile = () => {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        if (refresh_token) {
            const decode = jwtDecode(refresh_token);
            console.log(decode);
            if(decode.exp < (new Date()).getMilliseconds()){
                new Cookies().remove('refresh_token');
                window.location.reload();
            }else{
                setName(decode.name);
                setEmail(decode.sub);
            }
        }else{
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
            <h1>Edit Profile</h1>
            <h2>Name: <span style={{color:color.blue}}>{name}</span></h2>
            <h2>Email: <span style={{color: color.blue}}>{email}</span></h2>
        </div>
    );
}
export default EditProfile;