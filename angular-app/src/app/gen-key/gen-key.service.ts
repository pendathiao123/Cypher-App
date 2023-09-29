import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenKeyService {

  private apiUrl = 'http://localhost:8080/tdsiCipher'; 

  constructor(private http: HttpClient) { }
  
  genSecretKey(algo: string, taille: number, path: string, formData: FormData): Observable<any> {
    // Ajoutez l'algorithme, la taille et le chemin du fichier à formData
    formData.append('algo', algo);
    formData.append('taille', taille.toString());
    formData.append('path', path);

    // Envoyez la requête POST avec formData comme corps de requête
    return this.http.post<any>(this.apiUrl + '/genSecretKey', formData);
  }

  genKeyPair(algo: string, taille: number, path: string, formData: FormData): Observable<any> {
    // Ajoutez l'algorithme, la taille et le chemin du fichier à formData
    formData.append('algo', algo);
    formData.append('taille', taille.toString());
    formData.append('path', path);

    // Envoyez la requête POST avec formData comme corps de requête
    return this.http.post<any>(this.apiUrl + '/genKeyPair', formData);
  }
 
}
