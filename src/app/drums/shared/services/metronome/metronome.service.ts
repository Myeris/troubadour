import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';
// app
import { Exercise } from '../../models/exercise.model';
import { Note } from '../../models/note.model';
import { BufferLoader } from '../../utils/buffer-loader';
import { ExerciseService } from '../exercise/exercise.service';
import Timer = NodeJS.Timer;

@Injectable()
export class MetronomeService {
  private context: (AudioContext | any);
  private bufferLoader: BufferLoader;
  private gainNode: GainNode;
  private timeouts: Timer[] = [];
  private currentBpm: number;

  constructor(private router: Router,
              private exerciseService: ExerciseService) {
    // on navigation start, close context to prevent music from playing
    this.router.events
      .pipe(
        filter(() => event instanceof NavigationStart),
        tap(() => this.stop()),
        take(1)
      )
      .subscribe();
  }

  public init(): Promise<any> {
    const audioContext = ((window as any).AudioContext || (window as any).webkitAudioContext);

    return new Promise((resolve, reject) => {
      try {
        this.context = new audioContext();
      } catch (e) {
        return reject('WebAudio API is not supported on your browser. Please use Google Chrome or update your browser.');
      }

      this.bufferLoader = new BufferLoader(
        this.context,
        [
          '/assets/sounds/kit/RIM3.wav',
          '/assets/sounds/click-accent.mp3',
          '/assets/sounds/kit/BASS1.wav',
          '/assets/sounds/kit/SNARE4.wav',
          '/assets/sounds/kit/CLSHAT2.wav',
          '/assets/sounds/kit/OPHAT1.wav',
          '/assets/sounds/kit/GHOST.wav',
          '/assets/sounds/kit/ACCENT.wav'
        ],
        this.finishedLoading
      );

      try {
        this.bufferLoader.load();
      } catch (e) {
        return reject(e);
      }

      return setTimeout(() => resolve(), 500);
    });
  }

  public playExercise(exercise: Exercise, addClickCounter: boolean = true, isScaleExercise: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      // if context is suspended, resume. Else create the exercise
      if (this.context.state === 'suspended' && this.context.currentTime > 0) {
        this.context.resume();
        return resolve();
      }

      const startTime = this.context.currentTime + 0.100;

      // handle bpm
      if (exercise.bpm) {
        const clickCountDuration = this.exerciseService.getExerciseDuration(exercise.tab.timeSignature, 1, exercise.bpm);

        this.playBeat(exercise, startTime, exercise.bpm, addClickCounter, clickCountDuration, isScaleExercise)
          .then(() => resolve());
      }

      // handle bpm scale
      if (exercise.hasOwnProperty('bpmScale')
        && exercise.bpmScale.hasOwnProperty('start')
        && exercise.bpmScale.hasOwnProperty('stop')
        && exercise.bpmScale.hasOwnProperty('step')) {
        this.handleBpmScaleExercise(exercise)
          .then(() => {
            this.timeouts.push(setTimeout(() => {
              return resolve();
            }, 5000)); // resolve promise when exercise has ended and add a bit of delay
          });
      }
    });
  }

  public playMetronome(form: { bpm: number, beat: number, note: number, subdivision: number, accents: number[] }): void {
    const click = this.bufferLoader.bufferList[0];
    const accent = this.bufferLoader.bufferList[1];
    const startTime = this.context.currentTime + 0.100;
    const noteTime = this.getNoteTime(form.bpm, { keys: ['c/5'], duration: form.subdivision.toString() });
    const beatNoteTime = this.getNoteTime(form.bpm, { keys: ['c/5'], duration: form.beat.toString() });
    const denominator: number = form.subdivision / form.beat;
    const accents: number[] = [];
    const repeat = 10;
    const totalDuration = this.exerciseService.getExerciseDuration(`${form.beat}/${form.note}`, repeat, form.bpm);
    let barIte = 0;

    form.accents.forEach(a => accents.push(a * denominator));

    for (let bar = barIte; bar < repeat; bar++) {
      const time = startTime + barIte * form.subdivision * noteTime;

      for (let i = 0; i < form.subdivision; i++) {
        this.playSound(accents.indexOf(i % form.subdivision) > -1 ? accent : click, time + i * noteTime);

        this.timeouts.push(setTimeout(() => {
          if ((i / form.subdivision * form.note) % 1 === 0) {
            const el = document.getElementById(`metronome-${(i / form.subdivision * form.note)}`);

            el.style.animationDuration = beatNoteTime + 'ms';
            el.classList.add('active');

            this.timeouts.push(setTimeout(() => el.classList.remove('active'), beatNoteTime * 1000));
          }
        }, ((time + i * noteTime) - startTime) * 1000));
      }

      barIte++;
    }

    // create an infinite loop that can only be stopped by the user
    this.timeouts.push(setTimeout(() => {
      this.playMetronome(form);
    }, totalDuration * 1000));
  }

  public async pause(): Promise<void> {
    await this.context.suspend();
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  public async resume(): Promise<void> {
    await this.context.resume();
  }

  public async stop(): Promise<number> {
    await this.close();
    const bpm = this.currentBpm;

    this.timeouts.forEach(timeout => clearTimeout(timeout));

    // reinit properties
    this.context = null;
    this.bufferLoader = null;
    this.gainNode = null;
    this.currentBpm = null;

    return bpm;
  }

  public changeVolume(element: any): void {
    if (!this.gainNode) {
      this.gainNode = this.context.createGain();
    }

    const fraction = parseInt(element.value, 16) / parseInt(element.max, 16);
    this.gainNode.gain.value = fraction * fraction;
  }

  private playSound(buffer: AudioBuffer, time: number, loop: boolean = false): void {
    if (!this.gainNode) {
      this.gainNode = this.context.createGain();
    }

    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.changeVolume({ value: 75, max: 100 });

    try {
      source.start(time);
    } catch (e) {
      throw new Error(e);
    }
  }

  private async handleBpmScaleExercise(exercise: Exercise): Promise<void> {
    const bpmExercises: Exercise[] = [];
    const { start, stop, step } = Object.assign(exercise.bpmScale);

    for (let bpm = start; bpm <= stop; bpm += step) {
      const bpmExercise: Exercise = {
        bpm,
        repeat: exercise.repeat,
        hand: exercise.hand,
        duration: this.exerciseService.getExerciseDuration(exercise.tab.timeSignature, exercise.repeat, bpm),
        tabRef: exercise.tab.$key,
        tab: exercise.tab,
        soundOptions: exercise.soundOptions || { playAlong: true, metronomeOnly: false }
      };

      bpmExercises.push(bpmExercise);
    }

    for (let i = 0; i < bpmExercises.length; i++) {
      await this.playExercise(bpmExercises[i], i === 0, true);
    }
  }

  private playBeat(
    exercise: Exercise,
    startTime: number,
    bpm: number,
    addClickCounter: boolean,
    clickCountDuration: number,
    isScaleExercise: boolean = false
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const click = this.bufferLoader.bufferList[0];
      const clickAccent = this.bufferLoader.bufferList[1];
      const snare = this.bufferLoader.bufferList[3];
      const crash = this.bufferLoader.bufferList[4];
      const ghost = this.bufferLoader.bufferList[6];
      const accent = this.bufferLoader.bufferList[7];
      const clickNote: Note = {
        duration: '4',
        keys: ['c/5']
      };
      const exerciseLen = exercise.repeat + (addClickCounter ? 1 : 0);

      let timeout = this.exerciseService.getExerciseDuration(exercise.tab.timeSignature, exercise.repeat, exercise.bpm);

      if (addClickCounter) {
        timeout += clickCountDuration;
      }

      if (!isScaleExercise) {
        timeout += 3;
      }

      this.currentBpm = bpm;

      // TODO needs to find another to identify a buzz roll, this will do for now but this is not sustainable
      if (exercise.tab.name === 'Multiple bounce roll') {
        exercise.tab.notes = [];
        for (let i = 0; i < 32; i++) {
          exercise.tab.notes.push({ duration: '32', keys: ['c/5'] });
        }
      }

      if (!exercise.soundOptions) {
        exercise.soundOptions = { metronomeOnly: false, playAlong: true };
      }

      let nextTime: number = null;
      for (let bar = 0; bar < exerciseLen; bar++) {
        if (bar === 0 && addClickCounter) {
          for (let i = 0; i < 4; i++) {
            const time: number = nextTime || startTime + 0.100;

            this.playSound(click, time);

            nextTime = time + this.getNoteTime(bpm, clickNote);
          }
        } else {
          if (exercise.soundOptions.metronomeOnly) {
            const subdivision: number = parseInt(exercise.soundOptions.metronomeSettings.subdivision, 16);
            const noteTime: number = this.getNoteTime(exercise.bpm, { keys: ['c/5'], duration: subdivision.toString() });

            for (let i = 0; i < subdivision; i++) {
              const time = nextTime || startTime + 0.100;
              this.playSound(exercise.soundOptions.metronomeSettings.accents.indexOf(i % subdivision) > -1 ? clickAccent : click, time);

              nextTime = time + noteTime;

              if (bar === exercise.repeat - 1 && i === subdivision - 1) {
                this.timeouts.push(setTimeout(() => {
                  return resolve();
                }, timeout * 1000));
              }
            }
          } else {
            for (let i = 0; i < exercise.tab.notes.length; i++) {
              const note: Note = exercise.tab.notes[i];
              const nextNote: Note = exercise.tab.notes.length + 1 === i ? null : exercise.tab.notes[i + 1];
              const time: number = nextTime || startTime + 0.100;
              let sound: any = snare;

              if (i === 0) {
                this.playSound(crash, time);
              }

              if (note.grace) {
                sound = ghost;
              }

              if (note.accent) {
                sound = accent;
              }

              this.playSound(sound, time);

              // calculate start time for next note
              nextTime = time + this.getNoteTime(bpm, note);

              // handle flams
              if (nextNote && note.tieIndex !== undefined && note.tieIndex === nextNote.tieIndex) {
                nextTime = time + 0.025;
              }

              // handle drag
              if (note.drag) {
                nextTime = time + (this.getNoteTime(bpm, note) / 2);
              }

              if (bar === exercise.repeat - 1 && i === exercise.tab.notes.length - 1) {
                this.timeouts.push(setTimeout(() => {
                  return resolve();
                }, timeout * 1000)); // resolve promise when exercise has ended and add a bit of delay
              }
            }
          }
        }
      }
    });
  }

  private finishedLoading(bufferList: AudioBuffer[]): void {
    const source1 = this.context.createBufferSource();
    const source2 = this.context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(this.context.destination);
    source2.connect(this.context.destination);
    source1.start(0);
    source2.start(0);
  }

  private async close(): Promise<void> {
    if (this.context && this.context.state === 'running') {
      await this.context.close();
    }
  }

  // TODO handle dotted note and other note format (see: http://farty1billion.dyndns.org/NoteLength.htm)
  private getNoteTime(bpm: number, note: Note): number {
    const denominator = this.getNoteDenominator(note);
    let duration = (60 / bpm) / denominator;

    if (note.triplet) {
      duration = duration * (2 / 3);
    }

    if (note.dotted) {
      duration = duration + (duration / 2);
    }

    if (note.doubleDotted) {
      duration = duration + (duration * (3 / 4));
    }

    if (note.tripleDotted) {
      duration = duration + (duration * (7 / 8));
    }

    return duration;
  }

  private getNoteDenominator(note: Note): number {
    return parseInt(note.duration, 16) / 4;
  }
}
