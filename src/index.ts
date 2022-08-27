import Block from './components/base'
import ButtonTest from './components/base/ButtonTest';
import Box from './components/base/Box';


const btn = new ButtonTest({
  label: 'click',
  events: {
    click: (evt: PointerEvent) => console.log(`CLICK!!1 ${evt}`)
  }
});
const box = new Box({ button: btn });

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', box);
// btn.setProps({ label: 'see events' });
