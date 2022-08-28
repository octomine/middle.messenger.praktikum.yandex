import Block from "./Block";

export type TBlockProps = Record<string, unknown> & {
  events?: Record<string, () => void>,
  children?: Record<string, Block>
};
