package com.example.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anonym")
public class AnonymController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello Stock Enthusiast! Join Us to feel the full experience!";
    }
}
