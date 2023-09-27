import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import API from "../../API";




const Candle = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [isSendtReq, setSendReq] = useState(false);
  useEffect(() => {
    const refresh_token = new Cookies().get('refresh_token');

    const payload = {
      "symbol": symbol,
      "interval": "1h",
      "period": "1d"
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${refresh_token}`
      }
    }
    if(!isSendtReq){
      if (refresh_token) {
        API.post('/data/candle', payload, config)
          .then(res => {
            setData(res.data);
            console.log(res.data);
          }).catch(err => {
            console.log(err);
          });
      }
      setSendReq(true);
    }
  }, []);

  return (
    <div>
      {symbol}
    </div>
  );
};

export default Candle;