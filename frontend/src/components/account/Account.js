import React from "react";
import Global from '../Global.css'
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { color } from "../../color";
import API from "../../API";
import { Button, ButtonGroup, Divider, Grid } from "@mui/material";

const classes = {
    top: {
        margin: '3vw 3vw 0vw 3vw',
        padding: '2vw',
        backgroundColor: 'blue'
    },
    bottom: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        margin: '1vw 3vw 0vw 3vw',
        // backgroundColor: 'gray'
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
}



const Account = () => {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const list = ['Deposit', 'Withdraw', 'History', 'Portfolio', 'Settings']
    const [variant, setVariant] = React.useState(['contained', 'outlined', 'outlined', 'outlined', 'outlined']);
    const [btnColor, setBtnColor] = React.useState([color.white, 'outlined', 'outlined', 'outlined', 'outlined']);
    const [curBtn, setCurBtn] = React.useState(0)
    const handleBtnClick = (e)=>{
        // let tvar = [...variant];
        // tvar[e] = "contained";
        // tvar[curBtn] = "oulined";
        setVariant(variant.map((v, i)=>{
            if(i==e) return "contained";
            if(i==curBtn) return "outlined";
            return v;
        }))
        setBtnColor(variant.map((v, i)=>{
            if(i==e) return color.white;
            if(i==curBtn) return color.blue;
            return v;
        }));
        // setBtnClr(tColor);
        // setVariant(tvar);
        setCurBtn(e);
    }

    useEffect(() => {
        // const refresh_token = new Cookies().get('refresh_token');
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${refresh_token}`
        //     }
        // }
        // console.log(config);
        // if (refresh_token) {
        //     const decode = jwtDecode(refresh_token);
        //     // console.log(decode);
        //     const req = {
        //         uid: decode.uid,
        //         email: decode.sub.toLowerCase()
        //     }
        //     if (decode.exp < (new Date()).getMilliseconds()) {
        //         new Cookies().remove('refresh_token');
        //         window.location.reload();
        //     } else {
        //         API.post('/account/info', req, config).then(res => {
        //             console.log(res);
        //             if (res.status < 300) {
        //                 setName(res.data.name);
        //                 setEmail(res.data.email);
        //             } else {
        //                 // new Cookies().remove('refresh_token');
        //                 setName(<span style={{ color: color.red }}>Error</span>);
        //                 setEmail(<span style={{ color: color.red }}>Error</span>);
        //                 window.location.reload();
        //             }
        //         }).catch(err => {
        //             setName(<span style={{ color: 'red' }}>Error</span>);
        //                 setEmail(<span style={{ color: 'red' }}>Error</span>);
        //             console.log(err);
        //         });
        //     }
        // } else {
        //     new Cookies().remove('refresh_token');
        //     window.location.reload();
        // }
    }, []);

    return (
        <div className="center">
            <Grid container>
                <Grid container style={classes.top}>
                    <Grid item xs={12} sm={6}>
                        <span>Mahmud</span>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} sm={6} style={{ justifyContent: 'end' }}>
                        <span>Account Balance</span>
                    </Grid>
                </Grid>
                
                <Grid container style={classes.bottom}>
                    <Grid item xs={12} sm={10}>
                        Chart
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <ButtonGroup orientation="vertical">
                            {list.map((btn, i)=>{
                                return <Button key={i} style={{color:`${btnColor[i]}`, fontWeight:'700'}} variant={variant[i]} onClick={()=>handleBtnClick(i)}>{btn}</Button>
                            })}
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
export default Account;