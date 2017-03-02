export class User{
    private isLogged: boolean;
    public $key: string;
    public uid: string;
    public points: number;
    public email: string;
    public name: string;

    constructor(){
    };

    setLogged(isLogged: boolean) {
        this.isLogged = isLogged;
    }
}