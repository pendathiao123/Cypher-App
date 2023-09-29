package com.example.backend.service;

import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.io.*;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;


@Service
public class GenKeyService {

    //Symétrique

    public SecretKey genSecretKey(String algo, int taille, String path) throws Exception {
        // Créez un générateur de clé de type algo
        KeyGenerator keyGenerator = KeyGenerator.getInstance(algo);

        // Initialisez la taille de la clé à taille bits
        keyGenerator.init(taille);

        // Générez la clé secrète
        SecretKey secretKey = keyGenerator.generateKey();

        saveSecretKey(secretKey,path);

        return secretKey;
    }

    public static void saveSecretKey(SecretKey secretKey, String filePath) throws Exception {
        FileOutputStream fos = new FileOutputStream(filePath);
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(secretKey);
        oos.close();
        fos.close();
        System.out.println("La clé d'algo" + secretKey.getAlgorithm() + " a été bien enregistrée"+"cle="+Utils.toHex(secretKey.getEncoded()));
    }

    public SecretKey getSecretKey(String filePath) throws Exception {
        FileInputStream fis = new FileInputStream(filePath);
        ObjectInputStream ois = new ObjectInputStream(fis);
        SecretKey secretKey = (SecretKey) ois.readObject();
        ois.close();
        fis.close();
        return secretKey;
    }

    // Asymétrique

    public KeyPair genKeyPair(String algo, int taille, String path) throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance(algo);
        kpg.initialize(taille, new SecureRandom());
        KeyPair kp = kpg.generateKeyPair();
        System.out.println("Clé pub:" + Utils.toHex(kp.getPublic().getEncoded()));
        System.out.println("Clé priv:" + Utils.toHex(kp.getPrivate().getEncoded()));
        save(kp.getPublic(), "C:\\Keys\\" + path + "pub.txt");
        save(kp.getPrivate(), "C:\\Keys\\" + path + "priv.txt");
        return  kp;
    }

    public static void save(Key k, String fic) throws Exception {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(fic);
            if (k != null) {
                fos.write(k.getEncoded());
                fos.flush();
            }
        } catch (IOException e) {
            // Gérer l'exception d'écriture dans le fichier ici
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    // Gérer l'exception lors de la fermeture du flux ici
                    e.printStackTrace();
                }
            }
        }
    }


    public PublicKey getPubliqueKey(String algo, String publiqueKeyPath) throws Exception{
        FileInputStream fisPublique = new FileInputStream(publiqueKeyPath);
        byte[] b = new byte[fisPublique.available()];
        fisPublique.read(b);

        KeyFactory kf = KeyFactory.getInstance(algo);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(b);
        PublicKey pub = kf.generatePublic(spec);
        fisPublique.close();

        return pub;
    }

    public PrivateKey getPrivateKey(String algo, String privateKeyPath) throws Exception{
        FileInputStream fisPrivate = new FileInputStream(privateKeyPath);
        byte[] b = new byte[fisPrivate.available()];
        fisPrivate.read(b);
        KeyFactory kf = KeyFactory.getInstance(algo);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(b);
        PrivateKey priv = kf.generatePrivate(spec);
        fisPrivate.close();

        return priv;
    }


}