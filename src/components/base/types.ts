import Block from "./Block";

export type TBlockProps = object & {
  block?: string,
  modifiers?: string,
  styles?: string,
  events?: object,
  children?: Record<string, Block>
};
