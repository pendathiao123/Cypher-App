package com.example.backend.controller;

import com.example.backend.entity.Utilisateur;
import com.example.backend.service.GenKeyService;
import com.example.backend.service.PublicKeyDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tdsiCipher")
public class GenKeyController {

    private final GenKeyService genKeyService;

    public GenKeyController(GenKeyService genKeyService) {
        this.genKeyService = genKeyService;
    }

    @PostMapping("/genSecretKey")
    public ResponseEntity<SecretKey> genSecretKey(@RequestParam("algo") String algo, @RequestParam("taille") int taille, @RequestParam("path") String path) throws Exception {
        SecretKey secretKey = genKeyService.genSecretKey(algo,taille,path);
        return ResponseEntity.ok().body(secretKey);
    }

    @PostMapping("/genKeyPair")
    public ResponseEntity<PublicKeyDTO> genKeyPair(@RequestParam("algo") String algo, @RequestParam("taille") int taille, @RequestParam("path") String path) throws Exception {
        KeyPair keyPair = genKeyService.genKeyPair(algo, taille, path);

        // Récupérez la clé publique sous forme de chaîne encodée en Base64
        String publicKeyEncoded = Base64.getEncoder().encodeToString(keyPair.getPublic().getEncoded());

        PublicKeyDTO publicKeyDTO = new PublicKeyDTO(publicKeyEncoded);

        return ResponseEntity.ok().body(publicKeyDTO);
    }


    @PostMapping("/getSecretKey")
    public ResponseEntity<SecretKey> getSecretKey(@RequestParam("path") String path) throws Exception {
        SecretKey secretKey = genKeyService.getSecretKey(path);
        return ResponseEntity.ok().body(secretKey);
    }

    @GetMapping("/getPubliqueKey")
    public ResponseEntity<PublicKey> getPubliqueKey(@RequestParam("algo") String algo, @RequestParam("path") String path) throws Exception {
        PublicKey publicKey = genKeyService.getPubliqueKey(algo, path);
        return ResponseEntity.ok().body(publicKey);
    }

    @GetMapping("/getPrivateKey")
    public ResponseEntity<PrivateKey> getPrivateKey(@RequestParam("algo") String algo, @RequestParam("path") String path) throws Exception {
        PrivateKey privateKey = genKeyService.getPrivateKey(algo, path);
        return ResponseEntity.ok().body(privateKey);
    }
}
