import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' 
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  
  }


  logout() {
    // Appeler la méthode logout() du service d'authentification lorsque l'utilisateur clique sur le bouton de déconnexion
    this.authService.logout();
  }

  login() {
    // Appeler la méthode logout() du service d'authentification lorsque l'utilisateur clique sur le bouton de déconnexion
    this.authService.log();

  }

  isAuthenticated(): boolean{
   return this.authService.isAuthenticated();
  }
}
