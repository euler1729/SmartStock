package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsReq {
    List<String> symbols;

    public String toString(){
        StringBuilder listStr = new StringBuilder(symbols.get(0));
        for(int i=0; i<symbols.size(); ++i){
            listStr.append(" ").append(symbols.get(i));
        }
        System.out.println(listStr);
        return listStr.toString();
    }
}
