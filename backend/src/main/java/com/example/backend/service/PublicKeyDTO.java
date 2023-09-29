package com.example.backend.service;

import lombok.Data;

@Data
public class PublicKeyDTO {

    private String algorithm;
    private String encoded;
    public PublicKeyDTO(String encoded) {
        this.encoded = encoded;
    }
}
