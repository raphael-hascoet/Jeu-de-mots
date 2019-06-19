import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionsBoxComponent } from './definitions-box.component';

describe('DefinitionsBoxComponent', () => {
    let component: DefinitionsBoxComponent;
    let fixture: ComponentFixture<DefinitionsBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DefinitionsBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefinitionsBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
