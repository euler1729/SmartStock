package com.example.backend.controllers;

import com.example.backend.dto.CandleReq;
import com.example.backend.dto.PredictionReq;
import com.example.backend.dto.StocksReq;
import com.example.backend.model.Candle;
import com.example.backend.model.Stock;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/data")
public class DataController {
    private final RestTemplate restTemplate;
    private final String baseUrl = "http://flask";
    private final ObjectMapper mapper = new ObjectMapper();

    @PostMapping("/candle")
    public ResponseEntity<List<Candle>> getCandle(@RequestBody CandleReq candleReq) {
//        System.out.println(candleReq.toString());
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/candle", candleReq, String.class);
        if(response.getStatusCode().is2xxSuccessful()) {
            try{
                List<Candle> candles = mapper.readValue(response.getBody(), new TypeReference<>() {});
                return ResponseEntity.ok(candles);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/stocks")
    public ResponseEntity<List<Stock>> getStocks(@RequestBody StocksReq stocksReq) {
        stocksReq.setOffset("0");
        System.out.println(stocksReq.toString());
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/stocks",stocksReq, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                List<Stock> stocks = mapper.readValue(response.getBody(), new TypeReference<>() {});
                return ResponseEntity.ok(stocks);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/current-price")
    public ResponseEntity<Stock> getCurrentPrice(@RequestBody CandleReq symbol) {
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/current-price", symbol, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                Stock currentPrice = mapper.readValue(response.getBody(), new TypeReference<>() {});
                return ResponseEntity.ok(currentPrice);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }
    @GetMapping("/top-stocks")
    public ResponseEntity<String> getTopStocks(){
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/top-stocks","", String.class);
        if(response.getStatusCode().is2xxSuccessful()) {
             return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/prediction")
    public ResponseEntity<String> getPrediction(@RequestBody PredictionReq req){
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/prediction", req, String.class);
        if(response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
