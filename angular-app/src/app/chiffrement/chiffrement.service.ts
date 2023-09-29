import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ChiffrementService {
    private apiUrl = 'http://localhost:8080/tdsiCipher'; 
    
    constructor(
        // Autres dépendances...
        private http : HttpClient,
      ) {}

    
      cipher(clairPath: string, chiffrePath: string, path: string, algo: string, provider:string,  formData: FormData): Observable<any> {
        // Ajoutez l'algorithme, la taille et le chemin du fichier à formData
        formData.append('clairPath', clairPath);
        formData.append('chiffrePath', chiffrePath);
        formData.append('path', path);
        formData.append('algo', algo);
        formData.append('provider', provider);
    
        // Envoyez la requête POST avec formData comme corps de requête
        return this.http.post<any>(this.apiUrl + '/cipher', formData);
      }

      cipherAsym(clairPath: string, chiffrePath: string, path: string, algo: string, provider:string,  formData: FormData): Observable<any> {
        // Ajoutez l'algorithme, la taille et le chemin du fichier à formData
        formData.append('clairPath', clairPath);
        formData.append('chiffrePath', chiffrePath);
        formData.append('path', path);
        formData.append('algo', algo);
        formData.append('provider', provider);
    
        // Envoyez la requête POST avec formData comme corps de requête
        return this.http.post<any>(this.apiUrl + '/cipherAsym', formData);
      }
    
      getCipherContent(chiffrePath: string) {
        return this.http.get<string>(`${this.apiUrl}/getChiffreContent?path=${chiffrePath}`, { responseType: 'text' as 'json' });
      }

      decrypt( chiffrePath: string, clairPath: string, path: string, algo: string, provider:string,  formData: FormData): Observable<any> {
        // Ajoutez l'algorithme, la taille et le chemin du fichier à formData
        
        formData.append('chiffrePath', chiffrePath);
        formData.append('clairPath', clairPath);
        formData.append('path', path);
        formData.append('algo', algo);
        formData.append('provider', provider);
    
        // Envoyez la requête POST avec formData comme corps de requête
        return this.http.post<any>(this.apiUrl + '/decrypt', formData);
      }

      decryptAsym( chiffrePath: string, clairPath: string, path: string, algo: string, provider:string,  formData: FormData): Observable<any> {
        // Ajoutez l'algorithme, la taille et le chemin du fichier à formData
        
        formData.append('chiffrePath', chiffrePath);
        formData.append('clairPath', clairPath);
        formData.append('path', path);
        formData.append('algo', algo);
        formData.append('provider', provider);
    
        // Envoyez la requête POST avec formData comme corps de requête
        return this.http.post<any>(this.apiUrl + '/decryptAsym', formData);
      }


  }