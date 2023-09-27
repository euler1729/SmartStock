package com.example.backend.controllers;


import com.example.backend.services.NewsService;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;

    @PostMapping("/clusters")
    public ResponseEntity<String> getClusters( ) throws UnirestException {
        return ResponseEntity.ok().body(newsService.getClusters());
    }
}
