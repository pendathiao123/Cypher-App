import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenKeyService } from './gen-key.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog} from '@angular/material/dialog';
import { FileNameDialogComponent } from '../file-name-dialog/file-name-dialog.component';
import { KeyContentDialogComponent } from '../key-content-dialog/key-content-dialog.component';

@Component({
  selector: 'app-gen-key',
  templateUrl: './gen-key.component.html',
  styles: []
})
export class GenKeyComponent {
  genkey: FormGroup;
  chiffrementType: string;
  chiffrement: string[] = ['Symetrique', 'Asymetrique']; 
  algorithmeSym: string[] = ['AES', 'DES', '3DES']; 
  algorithmeAsym: string[] = ['RSA','El-Gamal', 'DSA']; 
  tailles: number[] = [128, 192, 256,384, 521, 1024, 2048, 3072]; 
  private apiUrl = 'http://localhost:8080/tdsiCipher'; 
  algo: string;
  taille: number;
  path: string;
  generatedKey: any;
  selectedFilePath: string;
  selectedFile: File ;
  fileOverState: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<GenKeyComponent>,
    private formBuilder: FormBuilder,
    private genKeyService: GenKeyService,
    private http : HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {
    this.genkey = this.formBuilder.group({
      chiffrementType: ['', Validators.required],
      chiffrement: ['', Validators.required], // Champ de sélection pour le type de chiffrement
      algorithmeSym: ['', Validators.required],
      algorithmeAsym: ['', Validators.required],
      tailles: ['', Validators.required],
      // Ajoutez ici d'autres champs de votre formulaire
    });
  }
  

  

  onSubmit() {
    if (this.genkey.valid) {
      this.generateKey();
      // Après avoir traité les données, vous pouvez fermer le modal
      this.dialogRef.close();
      
    }
  }
   
 
  
  generateKey(): void {
  
    const dialogRef = this.dialog.open(FileNameDialogComponent, {
      width: '400px',
      data: { fileName: this.path },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.path = result;
          // Si le type de génération est "Générer", on peut procéder à la génération ici
          this.genKeyService
            .genSecretKey(this.algo, this.taille, 'C:/Keys/' + this.path+'.txt', new FormData())
            .subscribe(
              (result: any) => {
                this.generatedKey = result;
                this.openKeyContentDialog(this.generatedKey);
                this.showSnackBar('La clé a été enregistrée avec succès dans: '+'C:/Keys/'+this.path);
              },
              (error: any) => {
                console.error(error);
              }
            );
        }
      
    });
  }
  
  openKeyContentDialog(keyContent: string): void {
    this.dialog.open(KeyContentDialogComponent, {
      width: '400px',
      data: keyContent, // Pass the generatedKey data here
    });
  }
  

  generateKeyPair(): void {
  
    const dialogRef = this.dialog.open(FileNameDialogComponent, {
      width: '400px',
      data: { fileName: this.path },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.path = result;
          // Si le type de génération est "Générer", on peut procéder à la génération ici
          this.genKeyService
            .genKeyPair(this.algo, this.taille, this.path, new FormData())
            .subscribe(
              (result: any) => {
                this.generatedKey = result;
                this.openKeyContentDialog(this.generatedKey); 
                this.showSnackBar('Votre paire de clés a été enregistrée avec succès dans: '+'C:/Keys/'+this.path+'Priv.txt'+'\n' +
              'Et' + 'C:/Keys/'+this.path+'Pub.txt');

              },
              (error: any) => {
                console.error(error);
              }
            );
        }
      
    });
  }

  // ... (importations et autres propriétés du composant restent inchangées)

openDialog(): void {
  // Ouvrir la boîte de dialogue pour demander le nom du fichier
  const dialogRef = this.dialog.open(FileNameDialogComponent, {
    width: '400px', // Largeur de la boîte de dialogue
    data: { fileName: this.path }, // Envoyer le nom de fichier actuel à la boîte de dialogue
  });

  // Souscrire à l'événement lorsque l'utilisateur ferme la boîte de dialogue
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // Résultat contient le nom du fichier saisi par l'utilisateur
      this.path = result;
      if(this.chiffrementType == "symetrique"){
      this.generateKey();
    }
      else{
        this.generateKeyPair();
      } // Lancer la génération de la clé avec le nom du fichier
    }
  });
}


  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 6000, // Durée d'affichage du message (en millisecondes)
      verticalPosition: 'top' as MatSnackBarVerticalPosition, 
    });
  }
}