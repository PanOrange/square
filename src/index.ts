import './styles.sass';
import { createEl } from "./lib/createEl";
import { Area } from "./square/square";

const renderCellValues = (cells: any, source: any) => {
  source.flat().forEach((item: number, index: number) => {
    cells[index].innerHTML = item ? item : '';
  })
};

const rootDiv = document.getElementById('root');

function component () {
  const template =
    `<div class="main-grid">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
    </div>`;
  const element = createEl('div');

  element.innerHTML = template;

  return element;
}

rootDiv.appendChild(component());
const cells = rootDiv.querySelectorAll(".cell");

const area = new Area();
area.init();

renderCellValues(cells, area.area);

document.addEventListener('keydown', (event: KeyboardEvent) => {
  const { key } = event;
  console.log(key, ' - is triggered');

  switch (key) {
    case 'ArrowUp':
      break;
    case 'ArrowRight':
      area.rightAction();
      break;
    case 'ArrowDown':
      //...
      break;
    case 'ArrowLeft':
      area.leftAction();
      break;
  }

  renderCellValues(cells, area.area);
});



