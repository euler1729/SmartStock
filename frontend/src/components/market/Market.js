import React, { useEffect } from 'react'
import DataTable from '../Data/DataTable';
import './Market.css';
import { Box, Button, Grid, Slider, Stack, TextField } from '@mui/material';
import Marque from '../home/Marque';
import Global from '../Global.css'
import Cookies from 'universal-cookie';
import API from '../../API';
import { color } from '../../color';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LineChart } from '@mui/x-charts';
import Chart from 'react-google-charts';


function randomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const rows = [
    ['AAPL', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['MSFT', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['GOOGL', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['AMZN', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['TSLA', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['JPM', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['NVDA', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['BRK-A', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)],
    ['JNJ', randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomFloat(0, 100), randomInt(0, 1000000), randomFloat(0, 100), randomFloat(0, 1)]
];
const header = ['symbol', 'open', 'high', 'low', 'close', 'volume($)', 'change(%)', 'current price($)'];

const data = [header, rows];





const Market = () => {
    const [table, setTable] = React.useState(data);
    const [offset, setOffset] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [variant, setVariant] = React.useState(['contained', 'outlined', 'outlined', 'outlined', 'outlined', 'outlined', 'outlined']);
    const [btnColor, setBtnColor] = React.useState([color.white, 'outlined', 'outlined', 'outlined', 'outlined', 'outlined', 'outlined']);
    const btn = ['Datatable', 'Prediction'];
    const [curBtn, setcurBtn] = React.useState(0);
    const [symbol, setSymbol] = React.useState('AAPL');
    const [day, setDay] = React.useState(30);
    const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "V", "NVDA", "BRK-A",
        "JNJ", "PYPL", "HD", "DIS", "MA", "ADBE", "XOM", "UNH", "T",
        "INTC", "VZ", "PFE", "CSCO", "WMT", "ABT", "CRM", "KO", "PEP", "WFC"];

    const keys = ['Date', 'trend', 'trend_lower', 'trend_upper', 'price', 'price_lower', 'price_upper']

    const [lineData, setLineData] = React.useState([
        keys,
        [
            "2023-08-18 00:00:00",
            7.404688857009887,
            7.404688857009887,
            7.404688857009887,
            131.59356755877985,
            128.86676019562262,
            134.25556816174023
        ],
        [
            "2023-08-21 00:00:00",
            8.542382190662927,
            8.542382190662927,
            8.542382190662927,
            134.23017216148702,
            131.51692022822496,
            136.82146462795694
        ],
        [
            "2023-08-22 00:00:00",
            8.921613295833156,
            8.921613295833156,
            8.921613295833156,
            132.94451416279213,
            130.2354814670165,
            135.62735924791588
        ],
        [
            "2023-08-23 00:00:00",
            9.300844400376162,
            9.300844400376162,
            9.300844400376162,
            133.5437527211971,
            130.95299105024742,
            136.03891988947458
        ],
        [
            "2023-08-24 00:00:00",
            9.680075518374215,
            9.680075518374215,
            9.680075518374215,
            133.5228908167212,
            130.95985073239171,
            136.1017464003268
        ],
        [
            "2023-08-25 00:00:00",
            10.059306659760336,
            10.059306659760336,
            10.059306659760336,
            134.24818536149624,
            131.53011650526386,
            136.9495552318448
        ],
        [
            "2023-08-28 00:00:00",
            11.200074214905381,
            11.200074214905381,
            11.200074214905381,
            136.88786418572826,
            134.24435548695013,
            139.47774984541593
        ],
        [
            "2023-08-29 00:00:00",
            11.584683119696678,
            11.584683119696678,
            11.584683119696678,
            135.60758398665672,
            133.0266377938045,
            138.12211046179138
        ],
        [
            "2023-08-30 00:00:00",
            11.972536430105633,
            11.972536430105633,
            11.972536430105633,
            136.21544475092594,
            133.72000738557446,
            138.80965724221724
        ],
        [
            "2023-08-31 00:00:00",
            12.361949699206512,
            12.361949699206512,
            12.361949699206512,
            136.20476499752536,
            133.66485840599162,
            138.70208847762999
        ],
        [
            "2023-09-01 00:00:00",
            12.752600959923843,
            12.752600959923843,
            12.752600959923843,
            136.94147966166295,
            134.31146961079924,
            139.6377990788406
        ],
        [
            "2023-09-05 00:00:00",
            14.315421487180336,
            14.315421487180336,
            14.315421487180336,
            138.33832235415244,
            135.94161923156474,
            140.94428412851542
        ],
        [
            "2023-09-06 00:00:00",
            14.706401009740546,
            14.706401009740546,
            14.706401009740546,
            138.9493093305602,
            136.24661990458202,
            141.56320264441587
        ],
        [
            "2023-09-07 00:00:00",
            15.097441188240808,
            15.097441188240808,
            15.097441188240808,
            138.94025648657816,
            136.42335730015228,
            141.60963186460043
        ],
        [
            "2023-09-08 00:00:00",
            15.488492185657007,
            15.488492185657007,
            15.488492185657007,
            139.67737088739932,
            137.1187745802894,
            142.272005836747
        ],
        [
            "2023-09-11 00:00:00",
            16.661645213736108,
            16.661645213736108,
            16.661645213736108,
            142.34943518451186,
            139.80352997264316,
            144.83268408428358
        ],
        [
            "2023-09-12 00:00:00",
            17.05269621878066,
            17.05269621878066,
            17.05269621878066,
            141.07559708575383,
            138.40899700815197,
            143.8324767401515
        ],
        [
            "2023-09-13 00:00:00",
            17.443651729389394,
            17.443651729389394,
            17.443651729389394,
            141.6865600502084,
            139.04005014689542,
            144.26414994917016
        ],
        [
            "2023-09-14 00:00:00",
            16.4136114360743,
            16.4136114360743,
            16.4136114360743,
            140.25642673440694,
            137.61420480744573,
            143.00574478436923
        ],
        [
            "2023-09-15 00:00:00",
            15.381918907715779,
            15.381918907715779,
            15.381918907715779,
            139.5707976094427,
            137.00214001016585,
            142.02868477264445
        ],
        [
            "2023-09-18 00:00:00",
            12.284233329319594,
            12.284233329319594,
            12.284233329319594,
            137.97202330012573,
            135.27175761083703,
            140.35417661023394
        ],
        [
            "2023-09-19 00:00:00",
            11.250207257016319,
            11.250207257016319,
            11.250207257016319,
            135.2731081239756,
            132.61348636850056,
            137.76063345576333
        ],
        [
            "2023-09-20 00:00:00",
            10.215676296221526,
            10.215676296221526,
            10.215676296221526,
            134.4585846170422,
            131.85016857836868,
            137.19019563080593
        ],
        [
            "2023-09-21 00:00:00",
            9.18114533659471,
            9.18114533659471,
            9.18114533659471,
            133.02396063493424,
            130.32763548982527,
            135.66299949519595
        ],
        [
            "2023-09-22 00:00:00",
            8.146614369012111,
            8.146614369012111,
            8.146614369012111,
            132.33549307078516,
            129.6199140962619,
            134.9502519152258
        ],
        [
            "2023-09-25 00:00:00",
            5.043021466264315,
            5.043021466264315,
            5.043021466264315,
            130.73081143706924,
            128.12401551531357,
            133.2695270412538
        ],
        [
            "2023-09-26 00:00:00",
            4.008490498681716,
            4.008490498681716,
            4.008490498681716,
            128.03139136564204,
            125.44986948995819,
            130.82517324804743
        ],
        [
            "2023-09-27 00:00:00",
            2.973959531099125,
            2.973959531099125,
            2.973959531099125,
            127.21686785191983,
            124.5090379194037,
            129.7587115561862
        ],
        [
            "2023-09-28 00:00:00",
            1.939428563516526,
            1.939428563516526,
            1.939428563516526,
            125.78224386186297,
            123.05324090530515,
            128.3345558989592
        ],
        [
            "2023-09-29 00:00:00",
            0.9048975959339272,
            0.9048975959339272,
            0.9048975959339272,
            125.09377629767295,
            122.28379853525988,
            127.71818851085084
        ],
        [
            "2023-09-30 00:00:00",
            -0.1296333716486637,
            -1.5258819659282037,
            1.4491232033415336,
            103.53459925479011,
            100.51052719485011,
            106.56570427438913
        ],
        [
            "2023-10-31 00:00:00",
            -32.2000933667092,
            -36.65905799434092,
            -27.192088297080765,
            91.82280750025998,
            86.53418113413952,
            97.35735518411659
        ],
        [
            "2023-11-30 00:00:00",
            -63.23602239418715,
            -71.86453628981921,
            -53.821182179244154,
            60.606792904139674,
            51.85481270731932,
            70.42173906144292
        ],
        [
            "2023-12-31 00:00:00",
            -95.30648238924769,
            -108.54274657659373,
            -80.45244921542363,
            8.357787570286533,
            -5.1170658976579055,
            23.531855459556805
        ],
        [
            "2024-01-31 00:00:00",
            -127.37694238430824,
            -146.08105330428128,
            -106.25403485274495,
            -3.1340340634879453,
            -22.141625112795303,
            18.018424703168765
        ],
        [
            "2024-02-29 00:00:00",
            -157.37834044420356,
            -182.2865495874929,
            -129.4631746814132,
            -33.53552514585715,
            -58.86152570101638,
            -4.96553708711874
        ],
        [
            "2024-03-31 00:00:00",
            -189.44880043926412,
            -220.97198281491737,
            -153.14823656055827,
            -85.78453047970666,
            -117.85141872053285,
            -49.530462109607505
        ],
        [
            "2024-04-30 00:00:00",
            -220.48472946674204,
            -259.93391106644685,
            -176.09723671222525,
            -96.46182859977249,
            -136.37480330744944,
            -52.34192384231441
        ],
        [
            "2024-05-31 00:00:00",
            -252.55518946180257,
            -301.4809830687361,
            -199.5307357447852,
            -128.3663107600662,
            -176.4332095480466,
            -74.35280245883173
        ],
        [
            "2024-06-30 00:00:00",
            -283.59111848928046,
            -340.066253869613,
            -220.38067694721948,
            -179.9268485297828,
            -235.73480073139694,
            -117.5337634716722
        ],
        [
            "2024-07-31 00:00:00",
            -315.6615784843411,
            -378.7797183556256,
            -241.7024144163161,
            -191.4186701635204,
            -255.25894017511555,
            -117.52161528025908
        ],
        [
            "2024-08-31 00:00:00",
            -347.7320384794016,
            -418.2988805503217,
            -262.95863781405046,
            -244.06780585302772,
            -316.1513703567935,
            -159.49117047470415
        ],
        [
            "2024-09-30 00:00:00",
            -378.76796750687953,
            -460.57122012121755,
            -285.48445511798263,
            -253.08017753609636,
            -334.74918308903864,
            -159.99350547135012
        ],
        [
            "2024-10-31 00:00:00",
            -410.8384275019401,
            -502.58944211887945,
            -306.9435540029737,
            -286.9956122036092,
            -379.1494464609741,
            -183.17461197655453
        ],
        [
            "2024-11-30 00:00:00",
            -441.874356529418,
            -543.5746038243781,
            -328.58181081009315,
            -338.210123903008,
            -440.04492358113725,
            -224.396777703446
        ],
        [
            "2024-12-31 00:00:00",
            -473.94481652447854,
            -586.6646415928714,
            -343.2832601216013,
            -349.92191565751045,
            -463.25722567086063,
            -222.9153924370779
        ],
        [
            "2025-01-31 00:00:00",
            -506.0152765195391,
            -627.9235572680544,
            -363.6209926937273,
            -381.8263978177624,
            -504.64336209630994,
            -238.77444248762683
        ],
        [
            "2025-02-28 00:00:00",
            -534.9821436118518,
            -670.0278750768249,
            -377.3886394906472,
            -410.7932649100752,
            -544.1612792594708,
            -252.36228941774255
        ],
        [
            "2025-03-31 00:00:00",
            -567.0526036069124,
            -713.2519423973071,
            -393.33034792746537,
            -441.36481363613166,
            -585.1426152506938,
            -270.1199314841749
        ],
        [
            "2025-04-30 00:00:00",
            -598.0885326343904,
            -759.2232981849389,
            -407.43893354769585,
            -473.84562431357176,
            -634.9024299624904,
            -283.41829028483556
        ],
        [
            "2025-05-31 00:00:00",
            -630.1589926294508,
            -804.3904878865923,
            -426.19427321483977,
            -526.4947600030046,
            -699.811073101865,
            -324.75885346403555
        ],
        [
            "2025-06-30 00:00:00",
            -661.1949216569288,
            -845.5462742801237,
            -443.9815819395177,
            -535.5071316861269,
            -718.8726856362483,
            -318.51448405772936
        ],
        [
            "2025-07-31 00:00:00",
            -693.2653816519892,
            -888.3310051831869,
            -463.52554066167795,
            -569.4225663536462,
            -764.5073028549893,
            -338.71068916870615
        ],
        [
            "2025-08-31 00:00:00",
            -725.3358416470498,
            -927.6728816743238,
            -478.7898274322546,
            -621.6715716875241,
            -824.1882488550867,
            -375.5325155041605
        ],
        [
            "2025-09-30 00:00:00",
            -756.3717706745279,
            -971.7932975449403,
            -493.08362899217565,
            -632.348869807561,
            -847.0624037490428,
            -369.1315319708665
        ],
        [
            "2025-10-31 00:00:00",
            -788.4422306695883,
            -1011.5484317275128,
            -509.55033116036924,
            -664.2533519678143,
            -889.439236029505,
            -386.4218096946803
        ],
        [
            "2025-11-30 00:00:00",
            -819.4781596970663,
            -1056.6927889330245,
            -527.5359131516359,
            -715.8138897375173,
            -952.1652134041739,
            -423.80610715501575
        ],
        [
            "2025-12-31 00:00:00",
            -851.548619692127,
            -1104.1480273307054,
            -546.3603226465094,
            -727.3057113713062,
            -979.9391046592124,
            -421.6467240704658,
        ],
        [
            "2026-01-31 00:00:00",
            -883.6190796871873,
            -1151.9859191964622,
            -560.5183691872627,
            -779.9548470607842,
            -1049.9729768319166,
            -455.1099192433072
        ],
        [
            "2026-02-28 00:00:00",
            -912.5859467795002,
            -1194.0090168894171,
            -570.2761190787827,
            -808.9217141531411,
            -1091.52544291158,
            -467.643411791995,
        ]
    ]);

    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        };

        if (curBtn == 0) {
            const payload = {
                'offset': offset
            };
            API.post('/data/stocks', payload, config).then(res => {
                console.log(res.data);
                let rs = [];
                res.data.forEach((item, i) => {
                    rs.push([item.symbol, item.open, item.high, item.low, item.close, item.volume, item.percent_change, item.current_price]);
                })
                setTable([header, rs])
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log(symbol, day)
            API.post('/data/prediction', { 'symbol': symbol, 'period': 30, 'param': 'Close' }, config).then(res => {
                console.log(res)
                let rs = [];
                rs.push(keys);
                res.data.map((item, i) => {
                    console.log(item)
                    rs.push([item.ds, item.yhat, item.yhat_lower, item.yhat_upper, item.trend, item.trend_lower, item.trend_upper]);
                })
                setLineData(rs)
            }).catch(err => {
                console.log(err);
            });
        }
    }, []);

    function handleBtnClick(e) {
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
        setcurBtn(e)
    }
    const valuetext = (e) => {
        // e.preventDefault();
        console.log(e.target.value);
        setDay(e.target.value);
        return e.target.value;
    }
    const handleChange = (event) => {
        console.log(event.target.value);
        setSymbol(event.target.value);
    };




    const getPrediction = () => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        };
        console.log(symbol, day)
        API.post('/data/prediction', { 'symbol': symbol, 'period': day, 'param': 'Close' }, config).then(res => {
            console.log(res)
            let rs = [];
            rs.push(keys);
            res.data.map((item, i) => {
                console.log(item)
                rs.push([item.ds, item.yhat, item.yhat_lower, item.yhat_upper, item.trend, item.trend_lower, item.trend_upper]);
            })
            setLineData(rs)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='center'>
            <Marque />
            <Grid container style={{ padding: '2vw', display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {
                        curBtn == 1 &&
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: 450 }} variant='outlined'>
                            <span style={{ width: 250, fontWeight: 'bold' }}>DAYS TO PREDICT: </span>
                            <Slider
                                aria-label="Day"
                                value={day}
                                valueLabelDisplay="auto"
                                step={30}
                                marks
                                min={30}
                                max={365}
                                style={{ marginLeft: '2vw' }}
                                onChange={valuetext}
                            />
                            <FormControl fullWidth style={{ marginLeft: '1vw', width: '25vw', height: '2vh' }}>
                                <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={symbol}
                                    label="Symbol"
                                    style={{ fontSize: '12px' }}
                                    onChange={handleChange}
                                >
                                    {symbols.map((item, i) => {
                                        return <MenuItem key={i} style={{ fontSize: '12px' }} value={item} >{item}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        {btn.map((btn, i) => {
                            return <Button key={i} style={{ color: `${btnColor[i]}`, fontWeight: '700' }} variant={variant[i]} onClick={() => handleBtnClick(i)}>{btn}</Button>
                        })}
                        <Button variant='outlined' endIcon={<SendIcon />} onClick={getPrediction}>
                            Send
                        </Button>
                    </Stack>
                </Grid>
                <Grid container >

                </Grid>
                {curBtn == 0 &&
                    <Grid className='center' style={{display:'flex', flexDirection:'column'}}>
                        <div><h1>Current Market Status</h1></div>
                        <DataTable data={table} />
                    </Grid>
                }
                {
                    curBtn == 1 &&
                    <Grid className='center' style={{ marginTop: '5vw' }}>
                        <Chart
                            width={1000}
                            height={700}
                            chartType='LineChart'
                            loader={<div>Loading Chart</div>}
                            data={lineData}
                            options={{
                                title: 'Time vs Predictions',
                                hAxis: {
                                    title: 'Date',
                                },
                                vAxis: {
                                    title: 'Prediction',
                                },
                                series: {
                                    1: { curveType: 'function' },
                                    2: { curveType: 'function' },
                                    3: { curveType: 'function' },
                                    4: { curveType: 'function' },
                                    5: { curveType: 'function' },
                                    6: { curveType: 'function' }
                                },
                                explorer: {
                                    actions: ['dragToZoom', 'rightClickToReset'],
                                    axis: 'horizontal',
                                    keepInBounds: true,
                                    maxZoomIn: 4.0
                                }
                            }}
                        />
                    </Grid>
                }
            </Grid>
        </div>
    )
}

export default Market;