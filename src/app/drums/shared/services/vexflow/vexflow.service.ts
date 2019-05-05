import {Injectable} from '@angular/core';
import * as Vex from 'vexflow';
import Renderer = Vex.Flow.Renderer;
import Stave = Vex.Flow.Stave;
import StaveNote = Vex.Flow.StaveNote;
import Beam = Vex.Flow.Beam;
import IRenderContext = Vex.IRenderContext;
import Tuplet = Vex.Flow.Tuplet;
import GraceNote = Vex.Flow.GraceNote;
import StaveTie = Vex.Flow.StaveTie;
import {Note} from '../../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class VexflowService {
  private clef = 'percussion';
  private VF = Vex.Flow;
  private renderer: Renderer;
  private INIT_ERROR_MESSAGE = 'VEXFLOW: Renderer is not init';
  private STAVE_WIDTH = 850;
  private RENDERER_WIDTH = 855;

  public get context(): IRenderContext {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }
    return this.renderer.getContext();
  }

  constructor() {
  }

  public initVexflow(divId: string, width?: number, height?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const div = document.getElementById(divId);

      if (!div) {
        return reject(`Cannot find div with ID ${divId}`);
      }

      div.innerHTML = ''; // make sure the div is empty
      this.renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);

      this.renderer.resize(width || this.RENDERER_WIDTH, height || 125);

      return resolve();
    });
  }

  public createNote(note: Note, hand: string): StaveNote | GraceNote {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    const options = {
      keys: note.keys,
      duration: note.duration,
      slash: note.slash || false,
      stem_direction: -1
    };

    const staveNote = note.grace ?
      new this.VF.GraceNote(options) :
      new this.VF.StaveNote(options);

    // by default, all exercise starts with R(ight) hand.
    // If the user has set the exercise to start with a L(eft) hand, reverse the annotation (L becomes R, R becomes L),
    // else do nothing
    const annotation = hand === 'L' ? (note.annotation === 'L' ? 'R' : 'L') : note.annotation;

    if (note.annotation) {
      staveNote.addModifier(0, new this.VF.Annotation(annotation));

      if (annotation === 'L') {
        staveNote.setStyle({fillStyle: 'tomato'});
      }
      if (annotation === 'R') {
        staveNote.setStyle({fillStyle: 'cornflowerblue'});
      }
    }

    if (note.tremolo) {
      staveNote.addArticulation(0, new this.VF.Tremolo(1));
    }
    if (note.accent) {
      staveNote.addModifier(0, new this.VF.Annotation('>'));
    }
    if (note.dotted) {
      staveNote.addDot(0);
    }

    return staveNote;
  }

  public createTriplets(notes: StaveNote[]): Tuplet {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    const triplets = new this.VF.Tuplet(notes, {
      num_notes: 3,
      beats_occupied: 2
    });

    triplets.setTupletLocation(-1);
    triplets.setBracketed(true);

    return triplets;
  }

  public generateBeams(notes: StaveNote[]): Beam[] {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    return this.VF.Beam.generateBeams(notes);
  }

  public createBeam(notes: StaveNote[]): Beam {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    return new this.VF.Beam(notes);
  }

  public createBeams(notes: Note[], staveNotes: StaveNote[]): Beam[] {
    const beams: Beam[] = [];
    const beamIndexes: number[] = [];

    notes.forEach(note => {
      if (note.hasOwnProperty('beamIndex')) {
        beamIndexes.push(note.beamIndex);
      }
    });

    if (beamIndexes.length) {
      beamIndexes.filter((item, i, ar) => ar.indexOf(item) === i).forEach(index => {
        const noteBeamIndex: number[] = [];
        const beamNotes: StaveNote[] = [];
        notes.filter((note, i) => {
          if (note.beamIndex === index) {
            noteBeamIndex.push(i);
            return note.beamIndex === index;
          }
        });

        noteBeamIndex.forEach(noteIndex => beamNotes.push(staveNotes[noteIndex]));

        const beam = new Beam(beamNotes);
        beams.push(beam);
      });
    }

    return beams;
  }

  public createStave(timeSignature: string, x?: number, y?: number, width?: number): Stave {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    const stave = new this.VF.Stave(x || 0, y || 0, width || this.STAVE_WIDTH);
    stave
      .addClef(this.clef)
      .addTimeSignature(timeSignature);

    stave.setContext(this.context).draw();

    return stave;
  }

  public createTies(notes: Note[], staveNotes: StaveNote[]): StaveTie[] {
    const ties: StaveTie[] = [];
    const tieIndexes: number[] = [];

    notes.forEach((note) => {
      if (note.hasOwnProperty('tieIndex')) {
        tieIndexes.push(note.tieIndex);
      }
    });

    if (tieIndexes.length) {
      tieIndexes.filter((item, i, ar) => ar.indexOf(item) === i).forEach((index) => {
        const noteTiedIndex: number[] = [];
        notes.filter((note, i) => {
          if (note.tieIndex === index) {
            noteTiedIndex.push(i);
            return note.tieIndex === index;
          }
        });

        const tie = new StaveTie({
          first_note: staveNotes[noteTiedIndex[0]],
          last_note: staveNotes[noteTiedIndex[1]],
          first_indices: [0],
          last_indices: [0]
        });

        ties.push(tie);
      });
    }

    return ties;
  }

  public formatAndDraw(stave: Stave, notes: StaveNote[]): void {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    try {
      this.VF.Formatter.FormatAndDraw(this.context, stave, notes);
    } catch (e) {
      throw new Error(e);
    }
  }

  public drawBeams(beams: Beam[]): void {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    beams.forEach(b => {
      try {
        b.setContext(this.context).draw();
      } catch (e) {
        throw new Error(e);
      }
    });
  }

  drawTuplets(tuplets: Tuplet[]): void {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    tuplets.forEach(tuplet => {
      try {
        tuplet.setContext(this.context).draw();
      } catch (e) {
        throw new Error(e);
      }
    });
  }

  public drawTies(ties: StaveTie[]): void {
    if (!this.renderer) {
      throw new Error(this.INIT_ERROR_MESSAGE);
    }

    ties.forEach(tie => {
      try {
        tie.setContext(this.context).draw();
      } catch (e) {
        throw new Error(e);
      }
    });
  }
}
