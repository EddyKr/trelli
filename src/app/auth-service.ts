import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import moment = require("moment/moment");
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(username:string, password:string ) {

        var headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://localhost/Trelli/api/token.json', {'username':username, 'password':password}, {
            headers: headers
        })
            .do(res => this.setSession(res))
            // this is just the HTTP call,
        // we still need to handle the reception of the token
            .shareReplay();
    }

    private setSession(authResult) {
        // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('token', authResult.data.token);
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("token");
        // localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        // return moment().isBefore(this.getExpiration());
        if (localStorage.getItem("token")) {
            return true;
        } else {
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
