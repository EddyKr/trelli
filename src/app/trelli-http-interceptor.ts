import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class TrelliHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("Intercepted request... ");

        // Clone the request to add the new header.
        const authReq = req.clone({
            setHeaders:{
                Accept: 'application/json',
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImV4cCI6MTUyMjc2NjI3Nn0.2mWcKxULm5cLBJRkGPJpr-xX36YcsdCjx3YolNav3wk'
            }});

        console.log("Sending request with new header now...");

        //send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log("Error Occurred");
                console.log(error);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
