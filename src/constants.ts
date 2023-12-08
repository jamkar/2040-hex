import { Axis, KeyToAxis } from "./types";

export const HOST_PARAM = "hostname";
export const RADIUS_PARAM = "radius";
export const PORT_PARAM = "port";
export const DEFAULT_PORT = "80";
export const KEYBOARD_EVENT = "keydown";
export const KEYS = ["w", "s", "a", "e", "q", "d"];
export const AXES: Axis[] = ["x", "y", "z"];

export const keyToAxis: KeyToAxis = {
  w: {
    axis: "x",
    reverse: false,
  },
  s: {
    axis: "x",
    reverse: true,
  },
  a: {
    axis: "y",
    reverse: false,
  },
  e: {
    axis: "y",
    reverse: true,
  },
  q: {
    axis: "z",
    reverse: false,
  },
  d: {
    axis: "z",
    reverse: true,
  },
};
