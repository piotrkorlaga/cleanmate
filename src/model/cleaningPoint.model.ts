import {User} from "./user.model";
import {Duty} from "./duty.model";

export class CleaningPoint{
    constructor(public categoryKey: string, public dutyKey: string, public duty: Duty){};
}