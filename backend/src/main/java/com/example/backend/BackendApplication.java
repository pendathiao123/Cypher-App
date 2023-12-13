package com.example.backend;

import com.example.backend.service.UserService;
import jakarta.annotation.PostConstruct;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Security;

@SpringBootApplication

public class BackendApplication implements WebMvcConfigurer{

    public static void main(String[] args) {
        Security.addProvider(new BouncyCastleProvider());
        SpringApplication.run(BackendApplication.class, args);
    }

    @PostConstruct
    public void initialiserDossierEtFichiers() {
        String cheminDossier = "C:/Penda-Thiao_ExamenCryptoJava";
        Path cheminDossierComplet = Paths.get(cheminDossier);

        try {
            if (!Files.exists(cheminDossierComplet)) {
                Files.createDirectories(cheminDossierComplet);
                System.out.println("Dossier créé avec succès !");
            }

            // Créez le sous-dossier "keys" s'il n'existe pas
            Path cheminSousDossierKeys = cheminDossierComplet.resolve("keys");
            if (!Files.exists(cheminSousDossierKeys)) {
                Files.createDirectories(cheminSousDossierKeys);
                System.out.println("Sous-dossier 'keys' créé avec succès !");
            }

            // Créez les fichiers si ils n'existent pas
            creerFichierSiNexistePas(cheminDossierComplet.resolve("message.txt"));
            creerFichierSiNexistePas(cheminDossierComplet.resolve("chiffre.txt"));
            creerFichierSiNexistePas(cheminDossierComplet.resolve("dechiffre.txt"));
            creerFichierSiNexistePas(cheminDossierComplet.resolve("sign.txt"));
            creerFichierSiNexistePas(cheminDossierComplet.resolve("hash.txt"));
        } catch (IOException e) {
            System.err.println("Erreur lors de la création du dossier ou des fichiers : " + e.getMessage());
        }
    }

    private void creerFichierSiNexistePas(Path cheminFichier) throws IOException {
        if (!Files.exists(cheminFichier)) {
            Files.createFile(cheminFichier);
            System.out.println("Fichier " + cheminFichier.getFileName() + " créé avec succès !");
        }
    }
    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/**")
                        .addResourceLocations("classpath:/static/")
                        .setCachePeriod(0);
            }
        };
    }
   @Bean
    CommandLineRunner connect(UserService userService){
        return args -> {
            userService.create("demba","passer");
        };
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

}
