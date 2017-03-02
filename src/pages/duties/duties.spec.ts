import {ComponentFixture, async} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {SigninPage} from "./signin";
import {TestUtils} from "../../test";
import {User} from "../../model/user.model";
import {DutiesPage} from "./duties";
import {AngularFire} from "angularfire2";

let comp: DutiesPage;
let fixture: ComponentFixture<DutiesPage>;
let de: DebugElement;
let el: HTMLElement;


describe('Page: Duties Page', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([DutiesPage]).then(compiled => {
        fixture = compiled.fixture;
        comp = compiled.instance;
        fixture.autoDetectChanges(true);
    })));

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
});