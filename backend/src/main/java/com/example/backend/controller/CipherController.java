package com.example.backend.controller;

import com.example.backend.service.CipherService;
import com.example.backend.service.PublicKeyDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.KeyPair;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tdsiCipher")
public class CipherController {

    private final CipherService cipherService;

    public CipherController(CipherService cipherService) {
        this.cipherService = cipherService;
    }

    @PostMapping("/cipher")
    public ResponseEntity<String> cipher(@RequestParam("clairPath") String clairPath, @RequestParam("chiffrePath") String chiffrePath, @RequestParam("path") String path,
                                             @RequestParam("algo") String  algo, @RequestParam("provider") String provider) throws Exception {
        cipherService.cipher(clairPath, chiffrePath, path, algo, provider);

        return ResponseEntity.ok().body("{\"message\": \"Message bien chiffre\"}");
    }

    @PostMapping("/cipherAsym")
    public ResponseEntity<String> cipherAsym(@RequestParam("clairPath") String clairPath, @RequestParam("chiffrePath") String chiffrePath, @RequestParam("path") String path,
                                         @RequestParam("algo") String  algo, @RequestParam("provider") String provider) throws Exception {
        cipherService.cipherAsym(clairPath, chiffrePath, path, algo, provider);

        return ResponseEntity.ok().body("{\"message\": \"Message bien chiffre\"}");
    }

    @GetMapping("/getChiffreContent")
    public ResponseEntity<String> getChiffreContent(@RequestParam("path") String chiffrePath) throws Exception {
        String chiffreContent = cipherService.getChiffreContent(chiffrePath);
        return ResponseEntity.ok().body(chiffreContent);
    }

    @PostMapping("/decrypt")
    public ResponseEntity<String> decrypt(@RequestParam("chiffrePath") String chiffrePath, @RequestParam("clairPath") String clairPath,  @RequestParam("path") String path,
                                             @RequestParam("algo") String  algo, @RequestParam("provider") String provider) throws Exception {
        cipherService.decrypt(chiffrePath, clairPath,  path, algo, provider);

        return ResponseEntity.ok().body("{\"message\": \"Message bien dechiffre\"}");
    }

    @PostMapping("/decryptAsym")
    public ResponseEntity<String> decryptAsym(@RequestParam("chiffrePath") String chiffrePath, @RequestParam("clairPath") String clairPath,  @RequestParam("path") String path,
                                          @RequestParam("algo") String  algo, @RequestParam("provider") String provider) throws Exception {
        cipherService.decryptAsym(chiffrePath, clairPath,  path, algo, provider);

        return ResponseEntity.ok().body("{\"message\": \"Message bien dechiffre\"}");
    }
}
