import { TestBed } from '@angular/core/testing';
import * as Vex from 'vexflow';
// app
import { VexflowService } from './vexflow.service';
import { Note } from '../../models/note.model';

describe('VexflowService', () => {
  let service: VexflowService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [VexflowService]
    });

    service = bed.get(VexflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('context', () => {
    it('should get the context', () => {
      expect((service as any).renderer).toBeUndefined();
      (service as any).renderer = { getContext: () => true };
      expect(service.context).toBeDefined();
    });

    it('should throw an error', () => {
      expect((service as any).renderer).toBeUndefined();
      expect(() => service.context).toThrow(new Error('VEXFLOW: Renderer is not init'));
    });
  });

  describe('initVexflow', () => {
    it('should return an error', () => {
      service.initVexflow('foo')
        .catch((err) => expect(err).toBe('Cannot find div with ID foo'));
    });

    it('should resolve the Promise', () => {
      const div = document.createElement('div');
      div.id = 'id';
      document.body.appendChild(div);

      service.initVexflow(div.id)
        .then(() => expect(true).toBeTruthy()); // just checking response goes through the right resolution
    });
  });

  describe('createNote', () => {
    it('should throw an error', () => {
      expect(() => service.createNote({} as Note, 'R'))
        .toThrow(new Error('VEXFLOW: Renderer is not init'));
    });

    it('should create a basic note', () => {
      (service as any).renderer = {};

      const res = service.createNote({ keys: ['c/5'], duration: '16' }, 'R');

      expect(res.keys).toEqual(['c/5']);
      expect(res.duration).toEqual('16');
      expect(res.attrs.type).toEqual('StaveNote');
    });

    it('should create a grace note', () => {
      (service as any).renderer = {};

      const res = service.createNote({ keys: ['c/5'], duration: '16', grace: true }, 'R');

      expect(res.keys).toEqual(['c/5']);
      expect(res.duration).toEqual('16');
      expect(res.attrs.type).toEqual('GraceNote');
    });
  });

  describe('createTriplets', () => {
    it('should throw an error', () => {
      expect(() => service.createTriplets([]))
        .toThrow(new Error(((service as any).INIT_ERROR_MESSAGE)));
    });

    it('should return a Tuplet', () => {
      (service as any).renderer = {};

      const notes = [
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 })
      ];

      const res = service.createTriplets(notes);
      expect(res.attrs.type).toBe('Tuplet');
    });
  });

  describe('generateBeams', () => {
    it('should throw an error', () => {
      expect(() => service.generateBeams([]))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });

    it('should generate beams', () => {
      (service as any).renderer = {};

      const notes = [
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 })
      ];

      const res = service.generateBeams(notes);
      expect(res.length).toBe(1);
    });
  });

  describe('createBeam', () => {
    it('should throw an error', () => {
      expect(() => service.createBeam([]))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });

    it('should return a Beam', () => {
      (service as any).renderer = {};

      const notes = [
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 })
      ];

      const res = service.createBeam(notes);
      expect(res.attrs.type).toBe('Beam');
    });
  });

  describe('createBeams', () => {
    it('should throw an error', () => {
      expect(() => service.createBeams([], []))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });

    it('should return an empty list', () => {
      (service as any).renderer = {};

      expect(service.createBeams([], []).length).toBe(0);
    });

    it('should return a list of Beams', () => {
      (service as any).renderer = {};

      const notes: Note[] = [
        { keys: ['c/5'], duration: '16', beamIndex: 1 },
        { keys: ['c/5'], duration: '16', beamIndex: 1 }
      ];

      const staveNotes = [
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 })
      ];

      const res = service.createBeams(notes, staveNotes);
      expect(res.length).toBe(1);
    });
  });

  describe('createStave', () => {
    it('should throw an error', () => {
      expect(() => service.createStave('4/4'))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });

    it('should return a Stave', () => {
      // TODO
    });
  });

  describe('createTies', () => {
    it('should throw an error', () => {
      expect(() => service.createTies([], []))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });

    it('should return a list StaveTie', () => {
      (service as any).renderer = {};

      const notes: Note[] = [
        { keys: ['c/5'], duration: '16', tieIndex: 1 },
        { keys: ['c/5'], duration: '16', tieIndex: 1 }
      ];

      const staveNotes = [
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 }),
        new Vex.Flow.StaveNote({ keys: ['c/5'], duration: '16', slash: false, stem_direction: -1 })
      ];

      const res = service.createTies(notes, staveNotes);
      expect(res.length).toBe(1);
    });
  });

  describe('formatAndDraw', () => {
    it('should throw an error', () => {
      expect(() => service.formatAndDraw({}, []))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });
  });

  describe('drawBeams', () => {
    it('should throw an error', () => {
      expect(() => service.drawBeams([]))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });
  });

  describe('drawTuplets', () => {
    it('should throw an error', () => {
      expect(() => service.drawTuplets([]))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });
  });

  describe('drawTies', () => {
    it('should throw an error', () => {
      expect(() => service.drawTies([]))
        .toThrow(new Error((service as any).INIT_ERROR_MESSAGE));
    });
  });
});
