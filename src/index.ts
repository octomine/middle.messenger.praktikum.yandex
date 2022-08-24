import Block from './components/base'
import ButtonTest from './components/base/ButtonTest';

const btn = new ButtonTest({
  label: 'click',
  events: {
    click: (evt: PointerEvent) => console.log(`CLICK!!1 ${evt}`)
  }
});

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', btn);
btn.setProps({ label: 'see events' });
