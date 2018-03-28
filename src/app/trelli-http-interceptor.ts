import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrelliHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Intercepted request... ');


        const token = localStorage.getItem("token");

        if (token) {
            // Clone the request to add the new header.
            const cloned = req.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            });

            console.log("Sending request with new header now...");
            return next.handle(cloned);
        }
        else {
            //send the newly created request
            return next.handle(req)
                .catch((error, caught) => {
                    //intercept the respons error and displace it to the console
                    console.log("Error Occurred");
                    console.log(error);
                    //return the error to the method that called it
                    return Observable.throw(error);
                }) as any;
        }
    }
}
