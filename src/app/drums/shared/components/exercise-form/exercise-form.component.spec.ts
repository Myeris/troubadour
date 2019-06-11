import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// app
import { ExerciseFormComponent } from './exercise-form.component';
import { Tab } from '../../models/tab.model';
import { Exercise } from '../../models/exercise.model';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { OrderTabsPipe } from '../../pipes/order-tabs/order-tabs.pipe';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Tag } from '../../models/tag.model';

const tabs: Tab[] = [
  { name: 'Tab 1', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: '1' },
  { name: 'Tab 2', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: '2' },
  { name: 'Tab 3', type: 'flams', drumkit: false, timeSignature: '4/4', notes: [], $key: '3' }
];

const editedExercise: Exercise = {
  hand: 'R',
  bpm: 60,
  duration: 60,
  tab: tabs[1],
  tabRef: tabs[1].$key,
  repeat: 1,
  soundOptions: {
    metronomeOnly: false,
    playAlong: true
  }
};

class MockExercise {
  getExerciseDuration(timeSignature: string, repeat: number, bpm: number) {
    return 120;
  }
}

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;
  let el: DebugElement;
  let exerciseService: ExerciseService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [ExerciseFormComponent, SearchPipe, OrderTabsPipe],
      providers: [{ provide: ExerciseService, useClass: MockExercise }],
      imports: [FormsModule, ReactiveFormsModule, NgxPaginationModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    exerciseService = bed.get(ExerciseService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('span')).nativeElement.textContent).toContain('Add an exercise');

    const tunnelSteps = el.queryAll(By.css('.tunnel__step'));
    expect(
      tunnelSteps[0].query(By.css('.tunnel__step__title')).query(By.css('span')).nativeElement
        .textContent
    ).toContain('1');

    // TODO do more
  });

  describe('formAccents', () => {
    it('should return the accents as a FormArray', () => {
      const formArray = [new FormControl(0)];
      component.form
        .get('soundOptions')
        .get('metronomeSettings')
        .get('accents')
        .setValue(formArray);

      expect(component.formAccents.value).toEqual(formArray);
    });
  });

  describe('ngOnChanges', () => {
    it('should select the exercise if selected and tabs are defined', () => {
      spyOn(component, 'selectExercise').and.callFake(() => true);

      component.tabs = tabs;
      component.selected = '1';
      component.editedExercise = {} as Exercise;
      expect(() => component.ngOnChanges({})).toThrow(new Error('Could not find tab'));

      component.editedExercise = editedExercise;
      component.ngOnChanges({});
      expect(component.selectExercise).toHaveBeenCalledTimes(1);
      expect(component.selectExercise).toHaveBeenCalledWith(tabs[1]);
    });

    it('should prepare the form for edit', () => {
      spyOn(component, 'onTabChange').and.callFake(() => true);

      component.tabs = tabs;
      component.editedExercise = { ...editedExercise };

      component.ngOnChanges({});
      expect(component.onTabChange).toHaveBeenCalledTimes(1);
      expect(component.formAccents.length).toBe(1);
      expect(component.selectedTabName).toBe(editedExercise.tab.name);
      expect(component.selectedType).toBe(0);

      component.editedExercise.bpm = null;
      component.ngOnChanges({});
      expect(component.selectedType).toBe(1);
    });

    it('should reassign accents if metronome only', () => {
      spyOn(component as any, 'emptyAccents').and.callFake(() => true);

      component.tabs = tabs;
      component.editedExercise = editedExercise;
      component.editedExercise.soundOptions = {
        ...editedExercise.soundOptions,
        metronomeOnly: true,
        metronomeSettings: {
          accents: [0, 2],
          subdivision: '4'
        }
      };

      component.ngOnChanges({});

      expect((component as any).emptyAccents).toHaveBeenCalledTimes(1);
      expect(component.formAccents.length).toBe(3);
      expect(component.showFullForm).toBeTruthy();
    });

    it('should assign filteredTabs', () => {
      component.tabs = null;
      component.ngOnChanges({});
      expect(component.filteredTabs).toBeNull();

      component.tabs = tabs;
      component.ngOnChanges({});
      expect(component.filteredTabs).toEqual(tabs);
    });
  });

  describe('onTabChange', () => {
    it('should do nothing if no selected tab', () => {
      const $event = { target: { value: 'nope!' } };
      component.tabs = tabs;
      component.onTabChange($event);
      expect(component.selectedExercise).toBeUndefined();
    });

    it('should set the selected exercise', () => {
      const $event = { target: { value: tabs[0].name } };
      component.tabs = tabs;
      expect(component.selectedExercise).toBeUndefined();

      component.onTabChange($event);
      expect(component.selectedExercise).toEqual({
        hand: 'R',
        bpm: 60,
        duration: 60,
        tab: tabs[0],
        tabRef: tabs[0].$key,
        repeat: 1
      });

      expect(component.form.get('repeat').value).toBe(component.selectedExercise.repeat);
      expect(component.form.get('tab').value).toBe(component.selectedExercise.tab);
      expect(component.form.get('tabRef').value).toBe(component.selectedExercise.tabRef);
    });

    it('should editedExercise', () => {
      const $event = { target: { value: tabs[0].name } };
      component.tabs = tabs;
      component.editedExercise = editedExercise;
      expect(component.selectedExercise).toBeUndefined();

      component.onTabChange($event);
      expect(component.selectedExercise).toEqual(editedExercise);
    });

    it('should handle selectedType 0', () => {
      const $event = { target: { value: tabs[0].name } };
      component.tabs = tabs;
      component.editedExercise = editedExercise;
      expect(component.selectedExercise).toBeUndefined();

      component.onTabChange($event);
      expect(component.form.get('bpm').value).toBe(editedExercise.bpm);
      expect(component.form.get('duration').value).toBe(editedExercise.duration);
    });

    it('should handle selectedType 1', () => {
      const $event = { target: { value: tabs[0].name } };
      component.tabs = tabs;
      component.editedExercise = {
        ...editedExercise,
        bpm: null,
        bpmScale: {
          start: 60,
          stop: 90,
          step: 5
        }
      };
      component.selectedType = 1;

      component.onTabChange($event);
      expect(component.form.get('bpmScale').get('start').value).toBe(60);
      expect(component.form.get('bpmScale').get('stop').value).toBe(90);
      expect(component.form.get('bpmScale').get('step').value).toBe(5);
    });
  });

  describe('onTypeChange', () => {
    it('should handle type 0', () => {
      component.onTypeChange({ target: { value: '0' } });
      expect(component.selectedType).toBe(0);
      expect(component.form.get('bpm').value).toBe(90);
      expect(component.form.get('duration').value).toBe(60);
      expect(component.form.get('bpmScale')).toBeNull();
    });

    it('should handle type 1', () => {
      component.onTypeChange({ target: { value: '1' } });
      expect(component.selectedType).toBe(1);
      expect(component.form.get('bpm')).toBeNull();
      expect(component.form.get('duration')).toBeNull();
      expect(component.form.get('bpmScale').get('start').value).toBe(90);
      expect(component.form.get('bpmScale').get('stop').value).toBe(120);
      expect(component.form.get('bpmScale').get('step').value).toBe(5);
    });
  });

  describe('addExercise', () => {
    beforeEach(() => {
      component.selectedExercise = editedExercise;
    });

    it('should emit an event to edit an exercise of a session', () => {
      const spy = spyOn(component.edited, 'emit').and.callThrough();

      component.editedExercise = editedExercise;
      component.selectedExercise = editedExercise;
      component.ngOnChanges({ name: new SimpleChange(null, component.editedExercise, true) });
      component.onTypeChange({ target: { value: '0' } });

      component.form.get('repeat').setValue(30);
      component.form.get('bpm').setValue(120);
      component.form.get('duration').setValue(60);

      component.addExercise();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit an event to edit an exercise of a session', () => {
      const spy = spyOn(component.edited, 'emit').and.callThrough();

      component.editedExercise = editedExercise;
      component.selectedExercise = editedExercise;
      component.ngOnChanges({ name: new SimpleChange(null, component.editedExercise, true) });
      component.onTypeChange({ target: { value: '0' } });

      component.form.get('repeat').setValue(30);
      component.form.get('bpm').setValue(120);
      component.form.get('duration').setValue(60);

      component.addExercise();
      expect(spy).toHaveBeenCalled();
    });

    // it('should handle type 0', () => {
    //   component.selectedType = 0;
    //   component.form.get('duration').setValue(60);
    //   component.form.get('bpm').setValue(100);
    //   expect(component.form.get('repeat').value).toBe(1);
    //
    //   component.addExercise();
    //   fixture.detectChanges();
    //   console.log(component.form.value);
    //   expect(component.form.get('repeat').value).toBe(1);
    // });
    //
    // it('should handle type 1', () => {
    //
    // });
    //
    // it('should set some properties', () => {
    //
    // });
  });

  describe('cancel', () => {
    it('should emit a canceled event', () => {
      const spy = spyOn(component.cancelled, 'emit').and.callThrough();
      component.cancel();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('selectExercise', () => {
    it('should reset everything if tab is undefined', () => {
      component.selectExercise(null);
      expect(component.showFullForm).toBeFalsy();
      expect(component.selectedTabName).toBeNull();
      expect(component.selectedTab).toBeNull();
      expect(component.selectedExercise).toBeNull();
      expect(component.form.get('tab').value).toBeNull();
      expect(component.form.get('tabRef').value).toBeNull();
    });

    it('should set the selectedExercise if tab is defined', () => {
      const tab = { ...tabs[0] };
      component.selectExercise(tab);
      expect(component.showFullForm).toBeTruthy();
      expect(component.selectedTabName).toBe(tab.name);
      expect(component.selectedTab).toEqual(tab);
      expect(component.selectedExercise).toEqual({
        hand: 'R',
        bpm: 60,
        duration: 60,
        tab,
        tabRef: tab.$key,
        repeat: 1
      });
      expect(component.form.get('tab').value).toEqual(tab);
      expect(component.form.get('tabRef').value).toEqual(tab.$key);
    });
  });

  describe('setFormControl', () => {
    it('should set a form control', () => {
      expect(component.form.get('hand').value).toBe('R');
      component.setFormControl(
        'hand',
        new FormGroup({
          hand: new FormControl('L')
        })
      );
      expect(component.form.get('hand').value).toBe('L');
    });
  });

  describe('setFormGroup', () => {
    it('should set a form group', () => {
      const bpm = new FormGroup({
        start: new FormControl(60),
        stop: new FormControl(90),
        step: new FormControl(5),
        repeat: new FormControl(1)
      });

      expect(component.form.get('bpmScale').value).toEqual({
        start: null,
        stop: null,
        step: null,
        repeat: 1
      });
      component.setFormGroup('bpmScale', bpm);
      expect(component.form.get('bpmScale').value).toEqual({
        start: 60,
        stop: 90,
        step: 5,
        repeat: 1
      });
    });
  });

  describe('handleInvalidForm', () => {
    it('should set feedback', () => {
      component.handleInvalidForm('name', 'message');
      expect(component.feedback).toBe('name: message');
    });
  });

  describe('onSoundOptionsChange', () => {
    it('should set options for type 0', () => {
      component.onSoundOptionsChange(
        new FormGroup({
          type: new FormControl('0'),
          soundOptions: new FormGroup({
            playAlong: new FormControl(true),
            metronomeOnly: new FormControl(false),
            metronomeSettings: new FormGroup({
              subdivision: new FormControl('4'),
              accents: new FormArray([new FormControl(0)])
            })
          })
        })
      );
      expect(component.form.get('soundOptions').get('playAlong').value).toBeTruthy();
      expect(component.form.get('soundOptions').get('metronomeOnly').value).toBeFalsy();
      expect(component.form.get('soundOptions').get('metronomeSettings').value).toEqual({
        subdivision: '4',
        accents: [0]
      });
    });

    it('should set options for type 1', () => {
      spyOn(component as any, 'emptyAccents').and.callFake(() => true);

      component.onSoundOptionsChange(
        new FormGroup({
          type: new FormControl('1'),
          settings: new FormGroup({
            subdivision: new FormControl('4'),
            accents: new FormArray([new FormControl(0)])
          })
        })
      );

      expect(component.form.get('soundOptions').get('playAlong').value).toBeFalsy();
      expect(component.form.get('soundOptions').get('metronomeOnly').value).toBeTruthy();
      expect((component as any).emptyAccents).toHaveBeenCalledTimes(1);
    });
  });

  describe('filter', () => {
    it('should filter the tabs', () => {
      component.tabs = tabs;

      const roll = { name: 'rolls' } as Tag;
      const flam = { name: 'flams' } as Tag;

      component.filter(null);
      expect(component.filteredTabs.length).toBe(3);

      component.filter(roll);
      expect(component.activeFilter).toEqual(roll);
      expect(component.filteredTabs.length).toBe(2);

      component.filter(flam);
      expect(component.activeFilter).toEqual(flam);
      expect(component.filteredTabs.length).toBe(1);
    });
  });

  describe('emptyAccents', () => {
    it('should empty all accents from form', () => {
      expect(component.formAccents.length).toBe(1);
      (component as any).emptyAccents();
      expect(component.formAccents.length).toBe(0);
    });
  });
});
