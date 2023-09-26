package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthReq {
    private String email;
    private String password;

    @Override
    public String toString() {
        return "AuthReq(email=" + this.getEmail() + ", password=" + this.getPassword() + ")";
    }
}
