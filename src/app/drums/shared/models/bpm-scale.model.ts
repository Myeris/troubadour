export interface BpmScale {
  start: number;
  stop: number;
  step: number;
  $key?: string;
  $exist?: () => boolean;
}
