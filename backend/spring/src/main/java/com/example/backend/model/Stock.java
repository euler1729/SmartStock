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
    @JsonProperty("dividend")
    private float dividend;
    @JsonProperty("stock_split")
    private float stock_split;
    @JsonProperty("name")
    private String name;
    @JsonProperty("website")
    private String website;
    @JsonProperty("ltp")
    private int ltp;
    @JsonProperty("ycp")
    private int ycp;
    @JsonProperty("trade")
    private int trade;
    @JsonProperty("value")
    private int value;
    @JsonProperty("open")
    private float open;
    @JsonProperty("high")
    private float high;
    @JsonProperty("low")
    private float low;
    @JsonProperty("close")
    private float close;

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
