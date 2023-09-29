import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-name-dialog',
  template: `
  <h2 mat-dialog-title>Enregistrer la clé</h2>
  <div mat-dialog-content>
    <p>Entrez le nom du fichier :</p>
    <input matInput type="text" [(ngModel)]="fileName" placeholder="Entrez le nom du fichier" />
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onCancelClick()">Annuler</button>
    <button mat-button (click)="onSaveClick()">Enregistrer</button>
  </div>
  
  `,
})
export class FileNameDialogComponent {
  fileName: any;

  constructor(
    public dialogRef: MatDialogRef<FileNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fileName: string }
  ) {
    this.fileName = data.fileName;
  }

  onSaveClick(): void {
    this.dialogRef.close(this.fileName);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}