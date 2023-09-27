package com.example.backend.controllers;

import com.example.backend.dto.CandleReq;
import com.example.backend.model.Candle;
import com.example.backend.model.Stock;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
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

    @GetMapping("/stocks")
    public ResponseEntity<List<Stock>> getStocks() {
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/stocks", null, String.class);
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

}
