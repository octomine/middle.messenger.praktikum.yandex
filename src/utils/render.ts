import Block from '../components/common/block';

export const render = (query: string, block: Block<any> | null) => {
  const root = document.querySelector(query);
  root.innerHTML = '';
  root?.append(block?.getContent() as Node);
  block?.dispatchComponentDidMount();

  return root;
};
