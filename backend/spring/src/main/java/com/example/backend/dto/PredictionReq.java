package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PredictionReq {
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("param")
    private String param;
    @JsonProperty("period")
    private int period;

    public String toString(){
        return "PredictionReq{" +
                "symbol='" + symbol + '\'' +
                ", interval='" + param + '\'' +
                ", period='" + period + '\'' +
                '}';
    }
}
