package com.example.backend.controllers;


import com.example.backend.dto.NewsReq;
import com.example.backend.repositories.WatchListRepo;
import com.example.backend.services.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {
    private final RestTemplate restTemplate;
    private final JwtService jwtService;
    private final String baseUrl = "http://flask";
    private final WatchListRepo watchListRepo;

    @GetMapping("/clusters")
    public ResponseEntity<String> getClusters(@NonNull HttpServletRequest request){
        final String authHeader = request.getHeader("Authorization");
        Claims claims = jwtService.extractAllClaims(authHeader.substring(7));
        int uid = claims.get("uid", Integer.class);
        List<String> symbols = watchListRepo.findByUid(uid);
        if(symbols.isEmpty()) {
            symbols.add("AAPL");
            symbols.add("TSLA");
            symbols.add("GOOGL");
            symbols.add("AMZN");
        }
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/news", new NewsReq(symbols), String.class);
        return ResponseEntity.ok().body(response.getBody());
    }
}
