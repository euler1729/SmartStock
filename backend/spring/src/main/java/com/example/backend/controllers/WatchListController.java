package com.example.backend.controllers;

import com.example.backend.dto.WatchListReq;
import com.example.backend.model.Stock;
import com.example.backend.model.WatchList;
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
@RequestMapping("/watchlist")
public class WatchListController {
    private final WatchListRepo watchListRepo;
    private final JwtService jwtService;
    private final RestTemplate restTemplate;
    private final String baseUrl = "http://flask";

    @PostMapping("/add")
    public ResponseEntity<String> addWatchList(@RequestBody WatchList watchList) {
        try {
            watchListRepo.save(watchList);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/get")
    public ResponseEntity<String> getWatchList(@NonNull HttpServletRequest request) {
        try {
            final String authHeader = request.getHeader("Authorization");
            Claims claims = jwtService.extractAllClaims(authHeader.substring(7));
            int uid = claims.get("uid", Integer.class);
            List<String> symbols = watchListRepo.findByUid(uid);
            if(symbols.isEmpty()) {
                System.out.println("Empty");
                return ResponseEntity.ok().body(null);
            }
            ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/watchlist", new WatchListReq(symbols), String.class);
            return ResponseEntity.ok().body(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }
}

