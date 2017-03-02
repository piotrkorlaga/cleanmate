import {CleaningEvent} from "./cleaningEvent.model";
import {Duty} from "./duty.model";
import {Category} from "./category.model";
import {Injectable} from "@angular/core";
import {AngularFire} from "../../node_modules/angularfire2/angularfire2";
import {CleaningPoint} from "./cleaningPoint.model";
import {UserService} from "./user.service";

@Injectable()
export class DutyService {

    constructor(private af: AngularFire, private userService: UserService) {}

    public addNewDutyToCategory(categoryKey: string, duty: Duty) {
        let newDutyKey = this.af.database.object("/duties").$ref.push().key;
        let updatePath = {};
        updatePath['duties/' + newDutyKey] = duty;
        updatePath['categories/' + categoryKey + '/duties/' + newDutyKey] = duty;
        this.af.database.object("/").update(updatePath)
            .then(()=> console.log('New duty added'))
            .catch((error) => console.log(error));
    }

    addCleaningPoints(points: CleaningPoint[]) {
        let newCleaningEvent = this.af.database.object("/cleaningEvent").$ref.push().key;
        let updatePaths = {};

        let loggedUser = this.userService.getLoggedUser();
        let userId = loggedUser.$key;
        let event = new CleaningEvent(userId, Date.now(), points);
        updatePaths['cleaningEvents/' + newCleaningEvent] = event;

        points.forEach((point: CleaningPoint)=>{
            let userPoints = 0;
            if(point.duty.userPoints && point.duty.userPoints[userId]){
                userPoints = point.duty.userPoints[userId];
            }
            updatePaths['categories/' + point.categoryKey + '/duties/' + point.dutyKey + '/userPoints/' + userId] = userPoints + 1;
        });

        updatePaths['users/' + userId + "/points"] = loggedUser.points + 1;
        return this.af.database.object("/").update(updatePaths);
    }
}