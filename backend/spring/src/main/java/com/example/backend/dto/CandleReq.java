package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandleReq {
    private String symbol;
    private String interval;
    private String period;

    public String toString(){
        return "CandleReq{" +
                "symbol='" + symbol + '\'' +
                ", interval='" + interval + '\'' +
                ", period='" + period + '\'' +
                '}';
    }
}
