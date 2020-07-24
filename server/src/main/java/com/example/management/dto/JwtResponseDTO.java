package com.example.management.dto;

/**
 *
 * @author Nguyen Hung Hau
 */
public class JwtResponseDTO {

    private final String jwttoken;
    private final String code;

    public JwtResponseDTO(String jwttoken, String code) {
        this.jwttoken = jwttoken;
        this.code = code;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public String getCode() {
        return code;
    }
}
