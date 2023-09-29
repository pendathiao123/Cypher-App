package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;

@Service
public class SignatureService {

    private final GenKeyService genKeyService;

    public SignatureService(GenKeyService genKeyService) {
        this.genKeyService = genKeyService;
    }


    public void hach(String algo, String filePath, String hashFilePath) {

        try {
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));
            MessageDigest md = MessageDigest.getInstance(algo);
            byte[] hashBytes = md.digest(fileContent);

            // Convertir les bytes du hash en une représentation hexadécimale
            StringBuilder hashHex = new StringBuilder();
            for (byte b : hashBytes) {
                hashHex.append(String.format("%02x", b));
            }

            // Écrire le hash dans un fichier
            try (FileWriter writer = new FileWriter(hashFilePath)) {
                writer.write(bytesToHexString(hashBytes));
            }

            System.out.println("SHA-256 Hash: " + bytesToHexString(hashBytes));
            System.out.println("Hash stocké dans " + hashFilePath);
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public void signRSA(String keyPath, String hashPath, String signPath) throws Exception {
        PrivateKey priv = genKeyService.getPrivateKey("RSA", keyPath);
        byte[] fileContent = Files.readAllBytes(Paths.get(hashPath));

        Signature sig = Signature.getInstance("SHA256WithRSA");
        sig.initSign(priv);

        sig.update(fileContent);
        byte[] signatureBytes = sig.sign();

        try (FileOutputStream signatureOutputStream = new FileOutputStream(signPath)) {
            signatureOutputStream.write(signatureBytes);
        }
    }

    public boolean verifyRSA(String publiqueKeyPath, String filePath, String signPath, String hashAlgo) throws Exception {
        PublicKey pub = genKeyService.getPubliqueKey("RSA",publiqueKeyPath);
        byte[] fileContent = Files.readAllBytes(Paths.get(filePath));
        byte[] signContent = Files.readAllBytes(Paths.get(signPath));

        Signature sig = Signature.getInstance("SHA256WithRSA");

        MessageDigest md = MessageDigest.getInstance(hashAlgo);

        sig.initVerify(pub);
        md.update(fileContent);
        byte[] empreinte2 = md.digest();
        sig.update(empreinte2);

        String empreinteHex = bytesToHexString(empreinte2);
        String signContentHex = bytesToHexString(signContent);

        System.out.println("content:" + empreinteHex);
        System.out.println("signcontent:" + signContentHex);

        boolean verifier = sig.verify(signContent);
        System.out.println("Verification =" + verifier);

        return verifier;
    }

    public void signDSA(String keyPath, String filePath, String signPath) throws Exception {
        PrivateKey priv = genKeyService.getPrivateKey("DSA", keyPath);
        byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

        Signature sig = Signature.getInstance("SHA256WithDSA");
        sig.initSign(priv);

        sig.update(fileContent);
        byte[] signatureBytes = sig.sign();

        // Convertir les bytes de la signature en une représentation hexadécimale
        String signatureHex = bytesToHexString(signatureBytes);

        try (FileWriter signatureWriter = new FileWriter(signPath)) {
            signatureWriter.write(signatureHex);
        }
    }

    public boolean verifyDSA(String publiqueKeyPath, String filePath, String signPath, String hashAlgo) throws Exception {
        PublicKey pub = genKeyService.getPubliqueKey("DSA", publiqueKeyPath);
        byte[] fileContent = Files.readAllBytes(Paths.get(filePath));
        String signatureHex = new String(Files.readAllBytes(Paths.get(signPath)));

        // Convertir la signature hexadécimale en bytes
        byte[] signContent = hexStringToBytes(signatureHex);

        Signature sig = Signature.getInstance("SHA256WithDSA");
        sig.initVerify(pub);

        MessageDigest md = MessageDigest.getInstance(hashAlgo);
        md.update(fileContent);
        byte[] empreinte2 = md.digest();
        sig.update(empreinte2);

        String empreinteHex = bytesToHexString(empreinte2);
        String signContentHex = bytesToHexString(signContent);

        System.out.println("empreinte2:" + empreinteHex);
        System.out.println("signcontent:" + signContentHex);

        boolean verifier = sig.verify(signContent);
        System.out.println("Verification =" + verifier);

        return verifier;
    }

    private static byte[] hexStringToBytes(String hexString) {
        int len = hexString.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4)
                    + Character.digit(hexString.charAt(i+1), 16));
        }
        return data;
    }


    private static String bytesToHexString(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

}
