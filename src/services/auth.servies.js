import Service from './service';

class AuthService extends Service {
    static getReqestList = {
        'CSRF': { path: 'register/' }
    }

    static postReqestList = {
        'refresh': { path: 'api/token/refresh/'},
        'login': { path: 'api/token/' },
        'social': { path: 'api/login/social/jwt-pair/' },
        'email': { path: 'register/email/' },
        'register': { path: 'register/' }
    }
    
    static async get(name, data) {
        const path = this.getReqestList[name].path;
        return await this.send(path, 'GET', null, data);
    }

    static async post(name, data)  {
        const path = this.postReqestList[name].path;
        return await this.send(path, 'POST', null, data);
    }

}

export default AuthService;