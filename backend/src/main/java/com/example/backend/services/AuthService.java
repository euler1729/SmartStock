package com.example.backend.services;


import com.example.backend.dto.AuthReq;
import com.example.backend.dto.AuthRes;
import com.example.backend.dto.RegisterReq;
import com.example.backend.model.User;
import com.example.backend.model.enumerators.Role;
import com.example.backend.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthRes register(RegisterReq request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepo.save(user);
        var jwt = jwtService.generateToken(user);
        return AuthRes
                .builder()
                .token(jwt)
                .build();
    }

    public AuthRes authenticate(AuthReq request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmail(request.getEmail())
                .orElseThrow();
        var jwt = jwtService.generateToken(user);
        return AuthRes
                .builder()
                .token(jwt)
                .build();
    }

}
