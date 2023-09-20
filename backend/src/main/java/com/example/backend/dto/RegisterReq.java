package com.example.backend.dto;

import com.example.backend.model.User;
import com.example.backend.model.enumerators.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterReq {
    private String name;
    private String email;
    private String password;

    @Override
    public String toString() {
        return "RegisterReq(name=" + this.getName() + ", email=" + this.getEmail() + ", password=" + this.getPassword() + ")";
    }

    public User toUser() {
        return User.builder()
                .name(this.getName())
                .email(this.getEmail())
                .password(this.getPassword())
                .role(Role.USER)
                .build();
    }
}
