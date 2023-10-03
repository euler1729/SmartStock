package com.example.backend.controllers;


import com.example.backend.model.Portfolio;
import com.example.backend.model.WatchList;
import com.example.backend.repositories.PortfolioRepo;
import com.example.backend.repositories.WatchListRepo;
import com.example.backend.services.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/portfolio")
public class PortfolioController {
    private final PortfolioRepo portfolioRepo;
    private final String baseUrl = "http://flask";
    private final WatchListRepo watchListRepo;
    private final JwtService jwtService;

    @PostMapping("/buy")
    public ResponseEntity<String> buyStock(@NonNull HttpServletRequest request, @RequestBody Portfolio portfolio) {
        final String authHeader = request.getHeader("Authorization");
        Claims claims = jwtService.extractAllClaims(authHeader.substring(7));
        int uid = claims.get("uid", Integer.class);

        WatchList wlist = new WatchList();
        wlist.setSymbol(portfolio.getSymbol());
        wlist.setUid(uid);
        watchListRepo.delete(wlist);

        portfolio.setUid(uid);
        portfolioRepo.save(portfolio);

        return ResponseEntity.ok().body("Success");
    }
    @PostMapping("/sell")
    public ResponseEntity<String> sellStock(@NonNull HttpServletRequest request, @RequestBody Portfolio portfolio) {
        final String authHeader = request.getHeader("Authorization");
        Claims claims = jwtService.extractAllClaims(authHeader.substring(7));
        int uid = claims.get("uid", Integer.class);
        portfolio.setUid(uid);
        portfolioRepo.delete(portfolio);
        return ResponseEntity.ok().body("Success");
    }
}
