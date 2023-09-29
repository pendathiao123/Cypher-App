package com.example.backend.service;

import org.apache.commons.io.IOUtils;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.PrivateKey;
import java.security.PublicKey;


@Service
public class CipherService {

    private final GenKeyService genKeyService;

    public CipherService(GenKeyService genKeyService) {
        this.genKeyService = genKeyService;
    }

    public void cipher(String clairPath, String chiffrePath, String path, String algo, String provider) throws Exception {

        FileInputStream fis = new FileInputStream(clairPath);
        FileOutputStream fos = new FileOutputStream(chiffrePath);
        SecretKey sk = genKeyService.getSecretKey(path);
        Cipher c = Cipher.getInstance(algo, provider);
        c.init(Cipher.ENCRYPT_MODE, sk);
        CipherInputStream cos = new CipherInputStream(fis, c);
        byte[] buf = new byte[16];
        int i = cos.read(buf);
        while (i != -1) {
            fos.write(buf, 0, i);
            i = cos.read(buf);
        }
        fis.close();
        cos.close();
        System.out.println("Chiffrement terminé");
    }

    public void cipherAsym(String clairPath, String chiffrePath, String path, String algo, String provider) throws Exception {

        FileInputStream fis = new FileInputStream(clairPath);
        FileOutputStream fos = new FileOutputStream(chiffrePath);
        PublicKey sk = genKeyService.getPubliqueKey(algo,path);
        Cipher c = Cipher.getInstance(algo, provider);
        c.init(Cipher.ENCRYPT_MODE, sk);
        CipherInputStream cos = new CipherInputStream(fis, c);
        byte[] buf = new byte[16];
        int i = cos.read(buf);
        while (i != -1) {
            fos.write(buf, 0, i);
            i = cos.read(buf);
        }
        fis.close();
        cos.close();
        System.out.println("Chiffrement terminé");
    }


    public String getChiffreContent(String chiffrePath) throws Exception {
        FileInputStream chiffreFis = new FileInputStream(chiffrePath);
        String chiffreContent = IOUtils.toString(chiffreFis, StandardCharsets.UTF_8);
        chiffreFis.close();
        System.out.println("Contenu chiffré lu : " + chiffreContent);

        return chiffreContent;
    }

    public void decrypt(String chiffrePath, String clairPath, String path, String algo, String provider) throws Exception {
        SecretKey sk = genKeyService.getSecretKey(path);
        Cipher c = Cipher.getInstance(algo, provider);

        c.init(Cipher.DECRYPT_MODE, sk);
        FileInputStream fis2 = new FileInputStream(chiffrePath);
        FileOutputStream fos2 = new FileOutputStream(clairPath);
        CipherInputStream cos2 = new CipherInputStream(fis2, c);
        byte[] buf = new byte[16];
        int i2 = cos2.read(buf);
        while (i2 != -1) {
            fos2.write(buf, 0, i2);
            i2 = cos2.read(buf);
        }
        fis2.close();
        cos2.close();
        System.out.println("Déchiffrement terminé");
    }

    public void decryptAsym(String chiffrePath, String clairPath, String path, String algo, String provider) throws Exception {
        PrivateKey sk = genKeyService.getPrivateKey(algo, path);
        Cipher c = Cipher.getInstance(algo, provider);

        c.init(Cipher.DECRYPT_MODE, sk);

        byte[] encryptedBytes = Files.readAllBytes(Paths.get(chiffrePath));
        byte[] decryptedBytes = c.doFinal(encryptedBytes);

        try (FileOutputStream fos2 = new FileOutputStream(clairPath)) {
            fos2.write(decryptedBytes);
        }

        System.out.println("Déchiffrement terminé");
    }



}
