export interface Note {
  keys: string[];
  duration: string;
  annotation?: string;
  triplet?: boolean;
  tremolo?: boolean;
  accent?: boolean;
  grace?: boolean;
  tieIndex?: number;
  slash?: boolean;
  dotted?: boolean;
  doubleDotted?: boolean;
  tripleDotted?: boolean;
  drag?: boolean;
  beamIndex?: number;
}
