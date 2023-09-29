import { Component} from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { AuthService } from '../login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GenKeyComponent } from '../gen-key/gen-key.component';
import { ChiffrementComponent } from '../chiffrement/chiffrement.component';
import { SignatureComponent } from '../signature/signature.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html', // Utilisez templateUrl au lieu de template
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon|undefined; 
  showGenKeyForm = false;
  showChiffrementForm = false
  

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.table(this.pokemonList);
    this.pokemonSelected = this.pokemonSelected;
  }

  selectPokemon(pokemon: Pokemon){
    
    if(pokemon){
      console.log('Vous avez demandé le pokemon'+pokemon.name);
      this.pokemonSelected = pokemon;
    }
    else{
    console.log('Vous avez demandé un pokemon inexistant');
    this.pokemonSelected = pokemon;
  }}


  logout() {
    // Appeler la méthode logout() du service d'authentification lorsque l'utilisateur clique sur le bouton de déconnexion
    this.authService.logout();
  }

  isAuthenticated(){
    this.authService.isAuthenticated();
  }

  openGenKeyForm(): void {
    this.showGenKeyForm = true;
    const dialogRef = this.dialog.open(GenKeyComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Vous pouvez effectuer des actions après la fermeture du formulaire ici si nécessaire.
      console.log('Le formulaire de génération de clé est fermé');
    });
}

openChiffrementForm(): void {
  this.showChiffrementForm = true;
  const dialogRef = this.dialog.open(ChiffrementComponent, {
    width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
    // Vous pouvez effectuer des actions après la fermeture du formulaire ici si nécessaire.
    console.log('Le formulaire de génération de clé est fermé');
  });
}

openSignatureForm(): void {
  this.showChiffrementForm = true;
  const dialogRef = this.dialog.open(SignatureComponent, {
    width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Le formulaire de génération de clé est fermé');
  });
}

 
}