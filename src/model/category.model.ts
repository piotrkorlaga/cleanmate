import {Duty} from "./duty.model";
export class Category {
    public duties: Duty[] = [];
    public $key?: string;
    constructor(public name: string) {
        if(!this.duties){
            this.duties = [];
        }
    };
}