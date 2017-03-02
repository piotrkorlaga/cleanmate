import {Injectable} from "@angular/core";
import {AngularFire} from "../../node_modules/angularfire2/angularfire2";
import {FirebaseListObservable} from "../../node_modules/angularfire2/database/firebase_list_observable";
import {CleaningEvent} from "./cleaningEvent.model";
import Rx from "rxjs/Rx";

@Injectable()
export class CleaningService {
    public static LAST_NOTIFICATIONS_CHECK_TIMESTAMP = 'LAST_NOTIFICATIONS_CHECK_TIMESTAMP';
    private events: FirebaseListObservable<CleaningEvent[]>;

    subject = new Rx.Subject();


    constructor(private af: AngularFire) {
        this.events = af.database.list("/cleaningEvents", {
            query: {
                orderByChild: 'date',
                startAt: this.subject
            }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    updateNotificationTimestamp(timestamp: number) {
        this.subject.next(timestamp);
    }

    getCleaningEvents(): FirebaseListObservable<CleaningEvent[]> {
        return this.events;
    }



}