import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import API from "../../API";
import Chart from "react-apexcharts";
import { Button, Grid, Stack } from "@mui/material";
import { color } from "../../color";

const Candle = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [isSendtReq, setSendReq] = useState(false);
  const period = ['1D', '3D', '7D', '30D', '6M', '1Y', 'Max'];
  const interval = ['1m', '5m', '15m', '30m', '1h']

  const [variant, setVariant] = React.useState(['outlined', 'outlined', 'contained', 'outlined', 'outlined', 'outlined', 'outlined']);
  const [btnColor, setBtnColor] = React.useState(['outlined', 'outlined', color.white, 'outlined', 'outlined', 'outlined', 'outlined']);
  const [variantMin, setVariantMin] = React.useState(['outlined', 'outlined', 'outlined', 'outlined', 'contained']);
  const [btnColorMin, setBtnColorMin] = React.useState(['outlined', 'outlined', 'outlined', 'outlined', color.white]);
  const [curBtnDay, setcurBtnDay] = React.useState(2)
  const [curBtnMin, setcurBtnMin] = React.useState(4)

  useEffect(() => {
    const payload = {
      "symbol": symbol,
      "interval": interval[curBtnMin],
      "period": period[curBtnDay],
    }
    loadData(payload);
  }, []);
  const loadData = (payload) => {
    const refresh_token = new Cookies().get('refresh_token');

    console.log(payload)
    const config = {
      headers: {
        'Authorization': `Bearer ${refresh_token}`
      }
    }
    if (!isSendtReq) {
      setSendReq(true);
      if (refresh_token) {
        API.post('/data/candle', payload, config)
          .then(res => {
            prepareData(res.data);
            console.log(res.data);
            setSendReq(false);
          }).catch(err => {
            console.log(err);
          });
      }

    }
  }

  function prepareData(rawData) {
    var tData = [];
    rawData.map((item, index) => {
      // console.log(item);
      tData.push({
        x: new Date(item.time).toISOString(),
        y: [item.open, item.high, item.low, item.close, item.volume]
      });
    });
    setData([
      {
        name: 'candle',
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
      type: "category",
      labels: {
        // rotate: 0,
      }
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };



  const handleBtnClick = (e) => {

    setVariant(variant.map((v, i) => {
      if (i == e) return "contained";
      if (i == curBtnDay) return "outlined";
      return v;
    }))
    setBtnColor(variant.map((v, i) => {
      if (i == e) return color.white;
      if (i == curBtnDay) return color.blue;
      return v;
    }));
    // setBtnClr(tColor);
    // setVariant(tvar);
    setcurBtnDay(e);
    let x = curBtnMin;
    if (x == 0 && e > 2) {
      x = 1;
    }
    if (x <= 3 && e > 4) {
      x = 4
    }

    // let tvar = [...variant];
    // tvar[e] = "contained";
    // tvar[curBtnDay] = "oulined";
    setVariantMin(variantMin.map((v, i) => {
      if (i == x) return "contained";
      if (i == curBtnMin) return "outlined";
      return v;
    }))
    setBtnColorMin(variantMin.map((v, i) => {
      if (i == x) return color.white;
      if (i == curBtnMin) return color.blue;
      return v;
    }));
    // setBtnClr(tColor);
    // setVariant(tvar);
    setcurBtnMin(x);
    if(e==6){
      loadData({
        "symbol": symbol,
        "interval": '1d',
        "period": '10000d',
      });
      return;
    }else{
      loadData({
        "symbol": symbol,
        "interval": interval[x],
        "period": period[e],
      });
    }

  }
  const handleBtnClickMin = (e) => {
    let x = curBtnDay;
    if (e == 0 && curBtnDay > 3) {
      handleBtnClick(2)
      x = 2;
    }
    else if (e <= 3 && curBtnDay > 4) {
      handleBtnClick(4)
      x = 4;
    }
    // let tvar = [...variant];
    // tvar[e] = "contained";
    // tvar[curBtnDay] = "oulined";
    setVariantMin(variantMin.map((v, i) => {
      if (i == e) return "contained";
      if (i == curBtnMin) return "outlined";
      return v;
    }))
    setBtnColorMin(variantMin.map((v, i) => {
      if (i == e) return color.white;
      if (i == curBtnMin) return color.blue;
      return v;
    }));
    // setBtnClr(tColor);
    // setVariant(tvar);
    setcurBtnMin(e);
    loadData({
      "symbol": symbol,
      "interval": interval[e],
      "period": period[x],
    });
  }

  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2}>
            {interval.map((btn, i) => {
              return <Button key={i} style={{ color: `${btnColorMin[i]}`, fontWeight: '700' }} variant={variantMin[i]} onClick={() => handleBtnClickMin(i)}>{btn}</Button>
            })}
          </Stack>

        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={2}>
            {period.map((btn, i) => {
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