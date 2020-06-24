package com.example.management.dto;

/**
 *
 * @author USER
 */
public class JwtResponseDTO {

    private final String jwttoken;

    public JwtResponseDTO(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
}
