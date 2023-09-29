// key-content-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-key-content-dialog',
  template: `
    <h2 mat-dialog-title>Le contenu de la clé: </h2>
    <div mat-dialog-content>
      <pre>{{ data.encoded }}</pre>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCloseClick()">Fermer</button>
    </div>
  `,
})
export class KeyContentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<KeyContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
