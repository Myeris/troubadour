import {Component, Input, OnInit} from '@angular/core';
// app
import {Exercise} from '../../models/exercise.model';

@Component({
  selector: 'app-tab-display',
  templateUrl: './tab-display.component.html',
  styleUrls: ['./tab-display.component.scss']
})
export class TabDisplayComponent implements OnInit {
  @Input() public exercise: Exercise;
  public rand: number = Math.floor(Math.random() * 1000);

  constructor() { }

  ngOnInit() {
  }

  private createStave(): void {
    // this.vexflowService
    //   .initVexflow('stave-' + this.rand)
    //   .then(() => {
    //     const notes: StaveNote[] = [];
    //     const tripletList: StaveNote[] = [];
    //     const beamList: StaveNote[] = [];
    //     const triplets: Tuplet[] = [];
    //     const stave = this.vexflowService.createStave(this.exercise.tab.timeSignature);
    //     let ties: StaveTie[] = [];
    //     let beams: Beam[] = [];
    //
    //     this.exercise.tab.notes.forEach(note => {
    //       const staveNote: StaveNote = this.vexflowService.createNote(note, this.exercise.hand);
    //       notes.push(staveNote);
    //       if (note.triplet) {
    //         tripletList.push(staveNote);
    //       }
    //
    //       if (note.beamIndex) {
    //         beamList.push(staveNote);
    //       }
    //     });
    //
    //     ties = this.vexflowService.createTies(this.exercise.tab.notes, notes);
    //
    //     if (beamList.length) {
    //       beams = this.vexflowService.createBeams(this.exercise.tab.notes, notes);
    //     } else {
    //       beams = this.vexflowService.generateBeams(notes);
    //     }
    //
    //     if (tripletList.length) {
    //       tripletList.forEach((triplet, index) => {
    //         if (index % 3 === 0) {
    //           triplets.push(this.vexflowService.createTriplets(tripletList.slice(index, index + 3)));
    //         }
    //       });
    //     }
    //
    //     this.vexflowService.formatAndDraw(stave, notes);
    //     if (beams.length) this.vexflowService.drawBeams(beams);
    //     if (triplets.length) this.vexflowService.drawTuplets(triplets);
    //     if (ties.length) this.vexflowService.drawTies(ties);
    //   })
    //   .catch(err => console.warn(err));
  }
}
