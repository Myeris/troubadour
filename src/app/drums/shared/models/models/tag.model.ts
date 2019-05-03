export interface Tag {
  name: string;
  color: string;
  weight?: number;
  $key?: string;
  $exist?: () => boolean;
}
