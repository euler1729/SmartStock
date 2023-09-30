package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("current_price")
    private float current_price;
    @JsonProperty("price_change")
    private float price_change;
    @JsonProperty("percent_change")
    private float percent_change;
    @JsonProperty("up")
    private int up;
    @JsonProperty("volume")
    private Long volume;

    public String toString(){
        return "Stock{" +
                "symbol='" + symbol + '\'' +
                ", current_price='" + current_price + '\'' +
                ", price_change='" + price_change + '\'' +
                ", percent_change='" + percent_change + '\'' +
                ", up='" + up + '\'' +
                '}';
    }
}
