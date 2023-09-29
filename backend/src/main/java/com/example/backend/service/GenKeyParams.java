package com.example.backend.service;

import lombok.Data;

@Data
public class GenKeyParams {
    private String algo;
    private int taille;
    private String path;
}
