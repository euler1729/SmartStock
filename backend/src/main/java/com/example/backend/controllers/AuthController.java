package com.example.backend.controllers;

import com.example.backend.dto.AuthReq;
import com.example.backend.dto.AuthRes;
import com.example.backend.dto.RegisterReq;
import com.example.backend.model.User;
import com.example.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthRes> register(@RequestBody RegisterReq request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthRes> authenticate(@RequestBody AuthReq request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody RegisterReq request){
        return ResponseEntity.ok().body(new User());
    }


}
