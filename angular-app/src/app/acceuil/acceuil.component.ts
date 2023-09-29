import { Component } from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html', // Utilisez templateUrl au lieu de template
  styleUrls: ['./acceuil.component.css'] // Vous pouvez définir des styles ici si nécessaire
})
export class AcceuilComponent {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon|undefined; 

  ngOnInit(): void {
    console.table(this.pokemonList);
    this.pokemonSelected = this.pokemonSelected;
  }

  constructor(private authService: AuthService) {}

  logout() {
    // Appeler la méthode logout() du service d'authentification lorsque l'utilisateur clique sur le bouton de déconnexion
    this.authService.logout();
  }

  isAuthenticated(){
    this.authService.isAuthenticated();
  }
}
