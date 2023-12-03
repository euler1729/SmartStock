package com.example.backend.controllers;

import com.example.backend.model.User;
import com.example.backend.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/info")
    public ResponseEntity<User> getUser(@RequestBody User user){
        System.out.println(user.toString());
        return ResponseEntity.ok().body(accountService.getUser(user));
    }
}