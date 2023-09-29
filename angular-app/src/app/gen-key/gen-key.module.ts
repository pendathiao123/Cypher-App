import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GenKeyComponent } from './gen-key.component';

@NgModule({
  declarations: [GenKeyComponent],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
  MatSelectModule, NgxFileDropModule,
MatSnackBarModule],
  exports: [GenKeyComponent],
})
export class GenKeyModule {}
