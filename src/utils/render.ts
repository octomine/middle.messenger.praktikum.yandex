import Block from '../components/common/block';

export const render = (query: string, block: Block<unknown>) => {
  const root = document.querySelector(query);
  root?.append(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};
