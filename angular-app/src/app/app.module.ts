import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ChiffrementModule } from './chiffrement/chiffrement.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorderCardDirective } from './border-card.directive';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginModule } from './login/login.module';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenKeyModule } from './gen-key/gen-key.module';
import { FileNameDialogComponent } from './file-name-dialog/file-name-dialog.component';
import { FormsModule } from '@angular/forms';
import { KeyContentDialogComponent } from './key-content-dialog/key-content-dialog.component';
import { ChiffrementService } from './chiffrement/chiffrement.service';
import { SignatureModule } from './signature/signature.module';
import { SignatureService } from './signature/signature.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    BorderCardDirective,
    AcceuilComponent,
    AdminComponent,
    FileNameDialogComponent,
    KeyContentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    LoginModule, 
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatDialogModule,
    MatInputModule,
    GenKeyModule,
    HttpClientModule,
    FormsModule,
    ChiffrementModule,
    SignatureModule,
    MatIconModule
    
  ],
  providers: [
    ChiffrementService,
    SignatureService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
