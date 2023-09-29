import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { GenKeyComponent } from '../gen-key/gen-key.component';
import { ChiffrementService } from './chiffrement.service';

@Component({
  selector: 'app-chiffrement',
  templateUrl: './chiffrement.component.html',
  styleUrls: ['./chiffrement.component.css']
})
export class ChiffrementComponent {
  chiffrementForm: FormGroup;
  selectedKey: string;
  selectedFileToEncrypt: File;
  algoOptions: string[] = ['AES', 'DES', '3DES'];
  algoAsymetrique: string[] = ['RSA', 'El-Gamal'];
  providers: string[] = ['BC', 'SunJCE']
  encryptedContent: string;
  showGenKeyForm =false;
  type : string;
  clairPath : string;
  chiffrePath: string;
  messageToEncrypt: string;
  algo: string;
  fileContent: string;
  keyPath: string;
  keyContent: string;
  privContent: string;
  provider : string
  chiffreContent: string;
  dechiff: string;
  chiffrementType: string;
  actionType: string;

  constructor(
    // Autres dépendances...
    private http : HttpClient,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private chiffrementService: ChiffrementService

  ) {
    // Autres initialisations...
    this.type = 'importer';

    this.chiffrementForm = this.formBuilder.group({
      chiffrementType: ['', Validators.required],
      actionType: ['', Validators.required],
      type: ['importer', Validators.required],
      selectedKey: ['', Validators.required],
      selectedFileToEncrypt: [null, Validators.required],
      algo: ['', Validators.required],
      algoOptions: ['', Validators.required],
      algoAsymetrique: ['', Validators.required],
      providers: ['', Validators.required],
      provider: ['', Validators.required]

    });

    this.onTypeChange();
  }
  
  
  onChiffrementSubmit(): void {
    if (this.chiffrementForm.valid) {
      const formData = new FormData();
      formData.append('key', this.selectedKey);
      formData.append('fileToEncrypt', this.selectedFileToEncrypt);
  
      this.encryptedContent = 'Résultat du chiffrement ici';
    }
  }

  // Méthode pour gérer la sélection du fichier à chiffrer


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.clairPath = file.name; // Stockez le nom du fichier dans la variable filePath

    // Utiliser FileReader pour lire le contenu du fichier sélectionné
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileContent = event.target.result; // Stockez le contenu du fichier dans la variable fileContent
      console.log('Contenu du fichier : ', this.fileContent);
    };
    reader.readAsText(file); // Lire le fichier en tant que texte
  }

  onChiffreSelected(event: any) {
    const file: File = event.target.files[0];
    this.chiffrePath = file.name; // Stockez le nom du fichier dans la variable filePath

    // Utiliser FileReader pour lire le contenu du fichier sélectionné
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileContent = event.target.result; // Stockez le contenu du fichier dans la variable fileContent
      console.log('Contenu du fichier : ', this.fileContent);
    };
    reader.readAsText(file); // Lire le fichier en tant que texte
  }

  onFilesSelected(event: any) {
    const file: File = event.target.files[0];
    this.keyPath = file.name; // Stockez le nom du fichier dans la variable filePath

    // Utiliser FileReader pour lire le contenu du fichier sélectionné
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.keyContent = event.target.result; // Stockez le contenu du fichier dans la variable fileContent
      console.log('Contenu du fichier : ', this.keyContent);
      console.log('chemin : ', this.keyPath);
    };
    reader.readAsText(file); // Lire le fichier en tant que texte
  }

  onFilesPrivSelected(event: any) {
    const file: File = event.target.files[0];
    this.keyPath = file.name; // Stockez le nom du fichier dans la variable filePath

    // Utiliser FileReader pour lire le contenu du fichier sélectionné
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.privContent = event.target.result; // Stockez le contenu du fichier dans la variable fileContent
      console.log('Contenu du fichier : ', this.keyContent);
      console.log('chemin : ', this.keyPath);
    };
    reader.readAsText(file); // Lire le fichier en tant que texte
  }

  onMessageChange(event: any) {
    this.messageToEncrypt = event.target.value; // Stockez le message à chiffrer dans la variable messageToEncrypt
    console.log('Message à chiffrer : ', this.messageToEncrypt);
  }


openGenKeyForm(): void {
  this.showGenKeyForm = true;
  const dialogRef = this.dialog.open(GenKeyComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe(result => {
    // Vous pouvez effectuer des actions après la fermeture du formulaire ici si nécessaire.
    console.log('Le formulaire de génération de clé est fermé');
    // Remettre la propriété à false lorsque le formulaire est fermé seulement si le type est 'generer'
    if (this.type === 'generer') {
      this.showGenKeyForm = false;
    }
  });
}

onTypeChange(): void {
  const typeControl = this.chiffrementForm.get('type');
  if (typeControl) {
    this.type = typeControl.value;
    console.log('Type changed:', this.type);
    if (this.type === 'generer') {
      this.showGenKeyForm = true;
    } else {
      this.showGenKeyForm = false;
    }
  }
}

cipher() {
  const formData = new FormData();

  this.chiffrementService.cipher('C:/TPCryptoJava/'+this.clairPath, 'C:/TPCryptoJava/'+this.chiffrePath, 'C:/TPCryptoJava/'+this.keyPath, this.algo, this.provider, formData).subscribe(
    response => {
      // Gérer la réponse de la requête ici
      console.log("message bien chiffre");
      this.getAppelChiffreContent();
    },
    error => {
      // Gérer les erreurs ici
      console.error(error);
    }
  );
}

cipherAsym() {
  const formData = new FormData();

  this.chiffrementService.cipherAsym('C:/TPCryptoJava/'+this.clairPath, 'C:/TPCryptoJava/'+this.chiffrePath, 'C:/TPCryptoJava/'+this.keyPath, this.algo, this.provider, formData).subscribe(
    response => {
      // Gérer la réponse de la requête ici
      console.log("message bien chiffre");
      this.getAppelChiffreContent();
    },
    error => {
      // Gérer les erreurs ici
      console.error(error);
    }
  );
}

decrypt() {
  const formData = new FormData();

  this.chiffrementService.decrypt('C:/TPCryptoJava/'+this.chiffrePath, 'C:/TPCryptoJava/dechiffre.txt', 'C:/TPCryptoJava/'+this.keyPath, this.algo, this.provider, formData).subscribe(
    response => {
      // Gérer la réponse de la requête ici
      console.log("message bien dechiffre");
      this.getdechiffreContent();
      
    },
    error => {
      // Gérer les erreurs ici
      console.error(error);
    }
  );
}

decryptAsym() {
  const formData = new FormData();

  this.chiffrementService.decryptAsym('C:/TPCryptoJava/'+this.chiffrePath, 'C:/TPCryptoJava/dechiffre.txt', 'C:/TPCryptoJava/'+this.keyPath, this.algo, this.provider, formData).subscribe(
    response => {
      // Gérer la réponse de la requête ici
      console.log("message bien dechiffre");
      this.getdechiffreContent();
      
    },
    error => {
      // Gérer les erreurs ici
      console.error(error);
    }
  );
}

getAppelChiffreContent() {
  // Appelez la méthode getChiffreContent du service ChiffrementService
  this.chiffrementService.getCipherContent('C:/TPCryptoJava/chiffre.txt').subscribe(
    response => {
      // Gérer la réponse de l'API ici
      console.log('Contenu chiffré :', response);

      // Mettez à jour une variable ou un champ de votre composant pour afficher le contenu chiffré dans l'interface utilisateur
      this.chiffreContent = response;
    },
    error => {
      // Gérer les erreurs ici
      console.error('Erreur :', error);
    }
  );
}

getdechiffreContent() {
  // Appelez la méthode getChiffreContent du service ChiffrementService
  this.chiffrementService.getCipherContent('C:/TPCryptoJava/dechiffre.txt').subscribe(
    (response) => {
      // Gérer la réponse de l'API ici
      console.log('Contenu chiffré :', response);

      // Mettez à jour une variable ou un champ de votre composant pour afficher le contenu chiffré dans l'interface utilisateur
      this.dechiff = response;
      console.log(this.dechiff);
    },
    (error) => {
      // Gérer les erreurs ici
      console.error('Erreur :', error);
    }
  );
}

}
