import {FirebaseObjectObservable} from "../../../node_modules/angularfire2/database/firebase_object_observable";
import {Duty} from "../../model/duty.model";
import {AngularFire} from "../../../node_modules/angularfire2/angularfire2";
import {Injectable} from "../../../node_modules/@angular/core/src/di/metadata";
import {UserService} from "../../model/user.service";

@Injectable()
export class DutyHistoryService {
    fbDuty: FirebaseObjectObservable<Duty>;

    constructor(private af: AngularFire, private userService: UserService) {
    }

    public getFirebaseObj(categoryKey: number, dutyIndex: number) {
        this.fbDuty = this.af.database.object("/categories/" + categoryKey + "/duties/" + dutyIndex);
        return this.fbDuty;
    }

    deleteCleaningFromCurrentDuty(index: number, duty: Duty) {
        // duty.cleanings.splice(index, 1);
        // this.fbDuty.update(duty);
        // this.userService.subtractPoint();
    }
}
