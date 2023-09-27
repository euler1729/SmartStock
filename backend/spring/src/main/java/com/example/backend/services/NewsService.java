package com.example.backend.services;

import com.example.backend.config.UnirestConfig;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.mashape.unirest.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class NewsService {
    @Value("${MARKET_API}")
    private String MARKET_API;
    private final String baseURL = "https://api.markets.sh/api/v1/";
    private final UnirestConfig unirestConfig;


    public String getClusters() throws UnirestException {
        HttpResponse<String> jsonResponse = Unirest.get(baseURL + "clusters?api_token=" + MARKET_API)
                .asString();
        if(jsonResponse.getStatus() != 200) {
            throw new RuntimeException("Failed : HTTP error code : "
                    + jsonResponse.getStatus());
        }


//        System.out.println(jsonResponse.getBody());
        return jsonResponse.getBody();
    }

}
