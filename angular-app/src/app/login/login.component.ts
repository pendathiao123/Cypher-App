// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string; // Assurez-vous que les propriétés username et password sont de type string
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Vérification des informations d'identification en utilisant le service AuthService
    if (this.authService.login(this.username, this.password)) {
      // Informations d'identification valides, rediriger vers la page de dashboard (ou une autre page protégée)
      this.router.navigate(['/admin']); // Remplacez '/dashboard' par le chemin de la page souhaitée
    } else {
      // Afficher un message d'erreur ou effectuer une action en cas d'informations d'identification invalides
      console.log('Informations d\'identification invalides. Veuillez réessayer.');
    }
  }
}
