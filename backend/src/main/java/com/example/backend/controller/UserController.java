package com.example.backend.controller;

import com.example.backend.entity.Utilisateur;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tdsiCipher")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public ResponseEntity<String> add(@RequestBody String username, String password){
        userService.create(username,password);
        return ResponseEntity.ok().body("{\"message\": \"utilisateur ajouté\"}");
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<Utilisateur> get(@PathVariable("id") int id){
        Utilisateur utilisateur = userService.findById(id).get();
        return ResponseEntity.ok().body(utilisateur);
    }
    @GetMapping("/user/all")
    public ResponseEntity<List<Utilisateur>> getAll(){
        List<Utilisateur> utilisateurs = userService.getAll();
        return ResponseEntity.ok().body(utilisateurs);
    }
    @DeleteMapping("/delete/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id){
        userService.delete(id);
        return ResponseEntity.ok().body("{\"message\": \"utulisateur supprimé\"}");
    }
    @PutMapping("/user/update/{id}")
    public ResponseEntity<Utilisateur> update(@PathVariable("id") int id, @RequestBody Utilisateur utilisateur){
        Utilisateur newUtilisateur = userService.update(id, utilisateur);
        return ResponseEntity.ok().body(newUtilisateur);
    }



}
