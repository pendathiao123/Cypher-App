import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GenKeyModule } from '../gen-key/gen-key.module';


import { SignatureComponent } from './signature.component';

@NgModule({
  declarations: [SignatureComponent],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
  MatSelectModule, NgxFileDropModule,
MatSnackBarModule,
FormsModule,
MatButtonModule, GenKeyModule],
  exports: [SignatureComponent],
})
export class SignatureModule {}
