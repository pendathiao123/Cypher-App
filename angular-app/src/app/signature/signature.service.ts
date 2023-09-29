import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class SignatureService {
    private apiUrl = 'http://localhost:8080/tdsiCipher'; 
    
    constructor(
        // Autres dépendances...
        private http : HttpClient,
      ) {}

    
      hash(algo: string, filePah: string, hashPath: string,  formData: FormData): Observable<any> {
       
        formData.append('algo', algo);
        formData.append('filePath', filePah);
        formData.append('hashPath', hashPath);
        
    
        return this.http.post<any>(this.apiUrl + '/hash', formData);
      }

      getHashContent(chiffrePath: string) {
        return this.http.get<string>(`${this.apiUrl}/getChiffreContent?path=${chiffrePath}`, { responseType: 'text' as 'json' });
      }

      signRSA(keyPath: string, filePah: string, signPath: string,  formData: FormData): Observable<any> {
       
        formData.append('keyPath', keyPath);
        formData.append('filePath', filePah);
        formData.append('signePath', signPath);
        
    
        return this.http.post<any>(this.apiUrl + '/signRSA', formData);
      }

      signDSA(keyPath: string, filePah: string, signPath: string,  formData: FormData): Observable<any> {
       
        formData.append('keyPath', keyPath);
        formData.append('filePath', filePah);
        formData.append('signePath', signPath);
        
    
        return this.http.post<any>(this.apiUrl + '/signDSA', formData);
      }

      verifyDSA(publiqueKeyPath: string, filePath: string, signPath: string, hashAlgo: string,  formData: FormData): Observable<any> {
       
        formData.append('publiqueKeyPath', publiqueKeyPath);
        formData.append('filePath', filePath);
        formData.append('signePath', signPath);
        formData.append('hashAlgo', hashAlgo);
        
    
        return this.http.post<any>(this.apiUrl + '/verifyDSA', formData);
      }

      verifyRSA(publiqueKeyPath: string, filePah: string, signPath: string, hashAlgo: string,  formData: FormData): Observable<any> {
       
        formData.append('publiqueKeyPath', publiqueKeyPath);
        formData.append('filePath', filePah);
        formData.append('signePath', signPath);
        formData.append('hashAlgo', hashAlgo);
        
    
        return this.http.post<any>(this.apiUrl + '/verifyRSA', formData);
      }

      getContent(chiffrePath: string) {
        return this.http.get<string>(`${this.apiUrl}/getChiffreContent?path=${chiffrePath}`, { responseType: 'text' as 'json' });
      }
     
       

      

  }