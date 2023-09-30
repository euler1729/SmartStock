import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import API from "../../API";
import Chart from "react-apexcharts";
import { Button, Grid, Stack } from "@mui/material";
import { color } from "../../color";

const Candle = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [isSendtReq, setSendReq] = useState(false);
  useEffect(() => {
    const refresh_token = new Cookies().get('refresh_token');

    const payload = {
      "symbol": symbol,
      "interval": "1h",
      "period": "7d"
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${refresh_token}`
      }
    }
    if (!isSendtReq) {
      if (refresh_token) {
        API.post('/data/candle', payload, config)
          .then(res => {
            prepareData(res.data);
            console.log(res.data);
          }).catch(err => {
            console.log(err);
          });
      }
      setSendReq(true);
    }
  }, []);
  function prepareData(rawData) {
    var tData = [];
    rawData.map((item, index) => {
      // console.log(item);
      tData.push({
        x: new Date(item.time),
        y: [item.open, item.high, item.low, item.close, item.volume]
      });
    });
    setData([
      {
        data: tData
      }
    ])
  }

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: symbol,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const list = ['1D', '3D', '7D', '30D', '6M', '1Y', 'Max'];
  const [variant, setVariant] = React.useState(['contained', 'outlined', 'outlined', 'outlined', 'outlined', 'outlined', 'outlined']);
  const [btnColor, setBtnColor] = React.useState([color.white, 'outlined', 'outlined', 'outlined', 'outlined', 'outlined', 'outlined']);
  const [curBtn, setCurBtn] = React.useState(0)
  const handleBtnClick = (e) => {
    // let tvar = [...variant];
    // tvar[e] = "contained";
    // tvar[curBtn] = "oulined";
    setVariant(variant.map((v, i) => {
      if (i == e) return "contained";
      if (i == curBtn) return "outlined";
      return v;
    }))
    setBtnColor(variant.map((v, i) => {
      if (i == e) return color.white;
      if (i == curBtn) return color.blue;
      return v;
    }));
    // setBtnClr(tColor);
    // setVariant(tvar);
    setCurBtn(e);
  }

  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Grid item >
          <Stack direction="row" spacing={2}>
            {list.map((btn, i) => {
              return <Button key={i} style={{ color: `${btnColor[i]}`, fontWeight: '700' }} variant={variant[i]} onClick={() => handleBtnClick(i)}>{btn}</Button>
            })}
          </Stack>

        </Grid>
        <Grid item xs={12} sm={12}>
          <Chart
            options={options}
            series={data}
            type="candlestick"
            height={400} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Candle;