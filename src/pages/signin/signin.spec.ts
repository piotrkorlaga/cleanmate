import {ComponentFixture, async} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {SigninPage} from "./signin";
import {TestUtils} from "../../test";
import {User} from "../../model/user.model";

let comp: SigninPage;
let fixture: ComponentFixture<SigninPage>;
let de: DebugElement;
let el: HTMLElement;


describe('Page: Signin Page', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([SigninPage]).then(compiled => {
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

    it('show sign in form', () => {
        de = fixture.debugElement.query(By.css('ion-list'));
        el = de.nativeElement;
        expect(el.textContent).toContain('Email');
        expect(el.textContent).toContain('Password');
    });


    it('show sign in button', () => {
        de = fixture.debugElement.query(By.css('.signin-button'));
        el = de.nativeElement;
        expect(el.textContent).toContain('Sign in');
    });


    it('sign in after type valid email and password', () => {
        spyOn(comp['signinService'], 'signin').and.callThrough();
        comp.loginForm.controls['email'].setValue("email@wp.pl");
        comp.loginForm.controls['password'].setValue("password");
        comp.signin();
        expect(comp.loginForm.valid).toBeTruthy();
        expect(comp['signinService'].signin).toHaveBeenCalledWith("email@wp.pl", "password");
    });
});