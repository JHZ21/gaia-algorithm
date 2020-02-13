import { Node } from "../DoubleLinkedList";
export type MapType<T> = {
  [key: number]: T;
};
export function hasOwnProperty(
  obj: any,
  key: string | symbol | number
): boolean {
  return Object.hasOwnProperty.call(obj, key);
}
