import { Component } from '@angular/core';
import { SignatureService } from './signature.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent {
  signatureForm: FormGroup;
  actionType: string;
  algoOptions: string[] = ['MD5','SHA-1', 'SHA-256', 'SHA-384', 'SHA-512' ];
  filePath: string;
  fileContent: string;
  algo: string;
  signAlgos: string[] = ['RSA','DSA'];
  signAlgo: string;
  signFilePath: string;
  hashcontent: string
  signcontent: string

  constructor(private signatureService: SignatureService, private formBuilder: FormBuilder){

    this.signatureForm = this.formBuilder.group({
      actionType: ['', Validators.required],
      algoOptions: ['', Validators.required],
      algo : ['', Validators.required],
      signAlgos: ['', Validators.required],
      signAlgo: ['', Validators.required],
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.filePath = file.name; 

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileContent = event.target.result; 
      console.log('Contenu du fichier : ', this.fileContent);
    };
    reader.readAsText(file); 
  }

  hash(){
    const formData = new FormData();
    this.signatureService.hash(this.algo,'C:/TPCryptoJava/' + this.filePath,'C:/TPCryptoJava/hash.txt', formData).subscribe(
      response => {
        console.log("message bien hashé");
        this.gethashContent()
      },
      error => {
        console.error(error);
      }
    );
  }

  gethashContent() {
    // Appelez la méthode getChiffreContent du service ChiffrementService
    this.signatureService.getContent('C:/TPCryptoJava/hash.txt').subscribe(
      (response) => {
        // Gérer la réponse de l'API ici
        console.log('Contenu du hashé :', response);
  
        // Mettez à jour une variable ou un champ de votre composant pour afficher le contenu chiffré dans l'interface utilisateur
        this.hashcontent = response;
        console.log(this.hashcontent);
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur :', error);
      }
    );
  }

  getsignContent() {
    // Appelez la méthode getChiffreContent du service ChiffrementService
    this.signatureService.getContent('C:/TPCryptoJava/sign.txt').subscribe(
      (response) => {
        // Gérer la réponse de l'API ici
        console.log('Contenu du signé :', response);
  
        // Mettez à jour une variable ou un champ de votre composant pour afficher le contenu chiffré dans l'interface utilisateur
        this.signcontent = response;
        console.log(this.hashcontent);
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur :', error);
      }
    );
  }

  signRSA(){
    const formData = new FormData();
    this.signatureService.signRSA('C:/TPCryptoJava/keyrsapriv.txt','C:/TPCryptoJava/hash.txt','C:/TPCryptoJava/sign.txt', formData).subscribe(
      response => {
        console.log("message bien chiffre");
        this.getsignContent()
      },
      error => {
        console.error(error);
      }
    );
  }
  
  signDSA(){
    const formData = new FormData();
    this.signatureService.signDSA('C:/TPCryptoJava/keydsapriv.txt','C:/TPCryptoJava/hash.txt','C:/TPCryptoJava/sign.txt', formData).subscribe(
      response => {
        console.log("message bien signé");
        this.getsignContent()
      },
      error => {
        console.error(error);
      }
    );
  }

  verifyDSA(){
    const formData = new FormData();
    this.signatureService.verifyDSA('C:/TPCryptoJava/keydsapub.txt','C:/TPCryptoJava/message.txt','C:/TPCryptoJava/sign.txt',this.algo, formData).subscribe(
      response => {
        console.log("Signature vérifiée avec succés");
      },
      error => {
        console.error(error);
      }
    );
  }

  verifyRSA(){
    const formData = new FormData();
    this.signatureService.verifyRSA('C:/TPCryptoJava/keyrsapub.txt','C:/TPCryptoJava/message.txt','C:/TPCryptoJava/sign.txt', this.algo, formData).subscribe(
      response => {
        console.log("Signature vérifiée avec succés");
      },
      error => {
        console.error(error);
      }
    );
  }

}
