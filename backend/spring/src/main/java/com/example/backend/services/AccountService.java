package com.example.backend.services;


import com.example.backend.model.User;
import com.example.backend.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepo userRepo;

    public User getUser(@RequestBody User user){
        User usr = userRepo.findById(user.getUid()).orElseThrow();
        usr.setPassword(null);
        return usr;
    }
}
