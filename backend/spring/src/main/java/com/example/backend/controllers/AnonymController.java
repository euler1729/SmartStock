package com.example.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anonym")
public class AnonymController {
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/hello")
    public String hello() {
        return "Hello Stock Enthusiast! Join Us to feel the full experience!";
    }
    @GetMapping("/lstm")
    public String lstm(){
        return restTemplate.getForObject("http://flask/lstm", String.class);
    }
}
