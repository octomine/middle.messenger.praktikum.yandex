import Block from '../components/common/block';

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }
  // console.log('render');
  root.innerHTML = '';
  root.append(block.getContent()!);
  block?.dispatchComponentDidMount();

  return root;
};
