import {User} from "./user.model";
import {Duty} from "./duty.model";
import {CleaningPoint} from "./cleaningPoint.model";

export class CleaningEvent{
    constructor(public userId: string, public date: number, public points: CleaningPoint[]){};
}