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
  cleSignature: string
  cleSigneContent: string
  cleVerification: string
  cleVerifyContent: string
  isSignatureValid: boolean = false;

  constructor(private signatureService: SignatureService, private formBuilder: FormBuilder){

    this.signatureForm = this.formBuilder.group({
      actionType: ['', Validators.required],
      algoOptions: ['', Validators.required],
      algo : ['', Validators.required],
      signAlgos: ['', Validators.required],
      signAlgo: ['', Validators.required],
      isSignatureValid: ['', Validators.required],
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

  onSigneSelected(event: any) {
    const file: File = event.target.files[0];
    this.cleSignature = file.name; 

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.cleSigneContent = event.target.result; 
      console.log('Contenu du fichier : ', this.cleSigneContent);
    };
    reader.readAsText(file); 
  }

  onVerifySelected(event: any) {
    const file: File = event.target.files[0];
    this.cleVerification = file.name; 

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.cleVerifyContent = event.target.result; 
      console.log('Contenu du fichier : ', this.cleVerifyContent);
    };
    reader.readAsText(file); 
  }

  hash(){
    const formData = new FormData();
    this.signatureService.hash(this.algo,'C:/Penda-Thiao_ExamenCryptoJava/' + this.filePath,'C:/Penda-Thiao_ExamenCryptoJava/hash.txt', formData).subscribe(
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
    this.signatureService.getContent('C:/Penda-Thiao_ExamenCryptoJava/hash.txt').subscribe(
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
    this.signatureService.getContent('C:/Penda-Thiao_ExamenCryptoJava/sign.txt').subscribe(
      (response) => {
        // Gérer la réponse de l'API ici
        console.log('Contenu du signé :', response);
  
        // Mettez à jour une variable ou un champ de votre composant pour afficher le contenu chiffré dans l'interface utilisateur
        this.signcontent = response;
        console.log(this.signcontent);
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur :', error);
      }
    );
  }

  signRSA(){
    const formData = new FormData();
    this.signatureService.signRSA('C:/Penda-Thiao_ExamenCryptoJava/keys/' + this.cleSignature,'C:/Penda-Thiao_ExamenCryptoJava/hash.txt','C:/Penda-Thiao_ExamenCryptoJava/sign.txt', formData).subscribe(
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
    this.signatureService.signDSA('C:/Penda-Thiao_ExamenCryptoJava/keys/' + this.cleSignature,'C:/Penda-Thiao_ExamenCryptoJava/hash.txt','C:/Penda-Thiao_ExamenCryptoJava/sign.txt', formData).subscribe(
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
    this.signatureService.verifyDSA('C:/Penda-Thiao_ExamenCryptoJava/keys/' + this.cleVerification,'C:/Penda-Thiao_ExamenCryptoJava/message.txt','C:/Penda-Thiao_ExamenCryptoJava/sign.txt',this.algo, formData).subscribe(
      response => {
        console.log("Signature vérifiée avec succés");
        this.isSignatureValid = true; // La signature est valide

      },
      error => {
        console.error(error);
        this.isSignatureValid = false; // La signature est invalide

      }
    );
  }

  verifyRSA(){
    const formData = new FormData();
    this.signatureService.verifyRSA('C:/Penda-Thiao_ExamenCryptoJava/keys/' + this.cleVerification,'C:/Penda-Thiao_ExamenCryptoJava/message.txt','C:/Penda-Thiao_ExamenCryptoJava/sign.txt', this.algo, formData).subscribe(
      response => {
        console.log("Signature vérifiée avec succés");
        this.isSignatureValid = true;
      },
      error => {
        console.error(error);
        this.isSignatureValid = false;
      }
    );
  }

}
