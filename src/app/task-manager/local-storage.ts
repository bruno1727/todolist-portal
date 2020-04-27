export class LocalStorage {

    static isOffline(): boolean{

        if(!localStorage.getItem("offline"))
            localStorage.setItem("offline", 'true');

        return localStorage.getItem("offline") == 'true';
    }

    static setOffline(offline: boolean){
        localStorage.setItem('offline', offline ? 'true' : 'false');
    }
}
