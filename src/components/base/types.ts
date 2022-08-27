import Block from "./Block";

export type TBlockProps = Record<string, string> & {
  events?: object,
  children?: Record<string, Block>
};
