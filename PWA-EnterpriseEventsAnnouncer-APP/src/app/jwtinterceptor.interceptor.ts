import { HttpInterceptorFn } from '@angular/common/http';

export const jWTInterceptorInterceptor: HttpInterceptorFn = (req, next) => {


  var token: string | null= null; // Variable para almacenar el token
        
  // Verificamos si ya tenemos el token almacenado
    if (!token) {
      // Extraemos la cookie que contiene el JWT
      token = localStorage.getItem('token');
      
    }

    // Si tenemos un token, lo agregamos al encabezado de autorización
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `bearer ${token}`, 
        
        },
      });
      console.log('Token: ', token);
    }
        




  return next(req);
};
