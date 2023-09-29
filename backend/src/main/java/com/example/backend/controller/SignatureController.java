package com.example.backend.controller;

import com.example.backend.service.SignatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tdsiCipher")
public class SignatureController {

    private final SignatureService signatureService;

    public SignatureController(SignatureService signatureService) {
        this.signatureService = signatureService;
    }

    @PostMapping("/hash")
    public ResponseEntity<String> hash(@RequestParam("algo") String algo, @RequestParam("filePath") String filePath, @RequestParam("hashPath") String hashPath) throws Exception {
        signatureService.hach(algo,filePath,hashPath);

        return ResponseEntity.ok().body("{\"message\": \"Message bien chiffre\"}");
    }

    @PostMapping("/signRSA")
    public ResponseEntity<String> signRSA(@RequestParam("keyPath") String keyPath, @RequestParam("filePath") String filePath, @RequestParam("signePath") String signePath) throws Exception {
        signatureService.signRSA(keyPath,filePath,signePath);

        return ResponseEntity.ok().body("{\"message\": \"Message bien signer\"}");
    }

    @PostMapping("/signDSA")
    public ResponseEntity<String> signDSA(@RequestParam("keyPath") String keyPath, @RequestParam("filePath") String filePath, @RequestParam("signePath") String signePath) throws Exception {
        signatureService.signDSA(keyPath,filePath,signePath);

        return ResponseEntity.ok().body("{\"message\": \"Message bien signer\"}");
    }

    @PostMapping("/verifyDSA")
    public ResponseEntity<Boolean> verifyDSA(@RequestParam("publiqueKeyPath") String publiqueKeyPath, @RequestParam("filePath") String filePath, @RequestParam("signePath") String signePath,
                                             @RequestParam("hashAlgo") String hashAlgo) throws Exception {
        Boolean b = signatureService.verifyDSA(publiqueKeyPath,filePath,signePath,hashAlgo);

        return ResponseEntity.ok().body(b);
    }

    @PostMapping("/verifyRSA")
    public ResponseEntity<Boolean> verifyRSA(@RequestParam("publiqueKeyPath") String publiqueKeyPath, @RequestParam("filePath") String filePath, @RequestParam("signePath") String signePath,
                                            @RequestParam("hashAlgo") String hashAlgo) throws Exception {
        Boolean b = signatureService.verifyRSA(publiqueKeyPath,filePath,signePath,hashAlgo);

        return ResponseEntity.ok().body(b);
    }
}
