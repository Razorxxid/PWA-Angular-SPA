import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../entities/user';
import { UserData } from '../viewmodels/userData';


const UserData_API_Endpoint = 'https://pwa-gremio-api.azure-api.net/pwa-gremio-api/api/UserData/';

const API_URL = 'https://pwa-gremio-api.azure-api.net/pwa-gremio-api//api/';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root',
  
})

  
export class UserDataService {


     uData : UserData = new UserData();

    constructor(private http: HttpClient) {

        
      this.getUserData()

    }

    public getUserData(): Observable<UserData> {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.log("User not logged in");
        return of({} as UserData); // Devuelve un Observable con un objeto vacío
      }
      const endpoint = `${UserData_API_Endpoint}user-data/${userId}`;
      console.log("Requesting:", endpoint); // Para depuración
    
      return this.http.get<UserData>(endpoint, httpOptions).pipe(
       // tap(response => console.log('Response received:', response)),
        catchError(this.handleError<UserData>('getUserData', {} as UserData)) // Maneja el error con un valor predeterminado
      );
    }
    
    
  
  

  public updateUserData(userData: UserData) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.log("User not logged in");
        return;
    }
    const endpoint = `${UserData_API_Endpoint}update-user-data`;

    this.http.post<UserData>(endpoint, userData, httpOptions).pipe(
        catchError(this.handleError<UserData>('updateUser'))
    ).subscribe({
        error: (error) => console.error('Error updating user data:', error),
        complete: () => console.log('Update request completed')
    });
}

public createUserData(userData: UserData) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.log("User not logged in");
        return;
    }
    const endpoint = `${UserData_API_Endpoint}create-user-data`;

    this.http.post<UserData>(endpoint, userData, httpOptions).pipe(
        tap(data => console.log('UserData created successfully:', data)),
        catchError(this.handleError<UserData>('createUser'))
    ).subscribe({
        error: (error) => console.error('Error creating user data:', error),
        complete: () => console.log('Create request completed')
    });
}

public deleteUserData() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.log("User not logged in");
        return;
    }
    const endpoint = `${UserData_API_Endpoint}delete-user-data/${userId}`;

    this.http.delete<UserData>(endpoint, httpOptions).pipe(
        tap(data => console.log('UserData deleted successfully:', data)),
        catchError(this.handleError<UserData>('deleteUser'))
    ).subscribe({
        error: (error) => console.error('Error deleting user data:', error),
        complete: () => console.log('Delete request completed')
    });
}


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: HttpErrorResponse): Observable<T> => {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request: Verifica los datos ingresados.';
              break;
            // Puedes manejar otros códigos de error aquí
            default:
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
        }
        console.error(`${operation} failed: ${errorMessage}`);
        return of(result as T);
      };
    }
}
