import { of } from 'rxjs';

export class AuthServiceStub {
    isAuthenticated() {
        return of(Promise.resolve(true));
    }

    checkPassToken() {
        return of('exito');
    }

    // canActivate() {
    //     return of(Promise.resolve(false));
    // }

}
