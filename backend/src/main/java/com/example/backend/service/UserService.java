package com.example.backend.service;

import com.example.backend.entity.Utilisateur;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<Utilisateur> findById(int id){return userRepository.findById(id);}

    public List<Utilisateur> getAll(){return userRepository.findAll();}

    public Utilisateur create(String username, String password){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setUsername(username);
        utilisateur.setPassword(password);

        return userRepository.save(utilisateur);
    }

    public Utilisateur update(int id, Utilisateur utilisateur){
        Utilisateur newUtilisateur = new Utilisateur();
        newUtilisateur.setUsername(utilisateur.getUsername());
        newUtilisateur.setPassword(utilisateur.getPassword());


        return userRepository.save(newUtilisateur);
    }

    public  void delete(int id){
        userRepository.deleteById(id);
    }
}
