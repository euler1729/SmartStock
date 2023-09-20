package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRes {
    private String token;

    @Override
    public String toString() {
        return "AuthRes(token=" + this.getToken() + ")";
    }
}
