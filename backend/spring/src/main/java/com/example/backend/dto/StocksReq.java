package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StocksReq {
    private String offset;
    public String toString(){
        return "StocksReq{" +
                "offset='" + offset + '\'' +
                '}';
    }
}
