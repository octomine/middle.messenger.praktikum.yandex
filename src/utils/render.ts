import Block from "../components/base"

export const render = (query: string, block: Block<unknown>) => {
  const root = document.querySelector(query);
  root.append(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}
