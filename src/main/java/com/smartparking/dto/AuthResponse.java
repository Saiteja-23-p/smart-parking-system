package com.smartparking.dto;


public class AuthResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;

    public String getToken() {
        return this.token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return this.role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public AuthResponse() {}
    
    public AuthResponse(String token, Long id, String name, String email, String role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
