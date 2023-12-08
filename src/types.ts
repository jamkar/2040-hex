export type Axis = "x" | "y" | "z";

export interface Cell {
  x: number;
  y: number;
  z: number;
  value: number;
}

export interface KeyToAxis {
  [key: string]: {
    axis: Axis;
    reverse: boolean;
  };
}

export interface InitParams {
  hostname: string;
  port: string;
  radius: string;
}
