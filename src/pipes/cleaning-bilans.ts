import {Injectable, Pipe} from "@angular/core";
import {UserService} from "../model/user.service";
import {Duty} from "../model/duty.model";
import {User} from "../model/user.model";
import {CleaningEvent} from "../model/cleaningEvent.model";

/*
 Generated class for the CleaningBilans pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'cleaningbilans'
})
@Injectable()
export class CleaningBilans {

    constructor(private siginService: UserService) {
    }

    /*
     Takes a value and makes it lowercase.
     */
    transform(duty: Duty, user: User) {
        if (!duty.userPoints) {
            return '';
        } else {
            return user.name +': ' + this.countCleaningsFor(user, duty.userPoints);
        }
    }

    private countCleaningsFor(user: User, userPoints: {key: string, val: number}) {
        let points = userPoints[user.$key];
        if(points){
            return points;
        }else{
            return 0;
        }
    }
}
