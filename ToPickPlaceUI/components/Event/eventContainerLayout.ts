import css from 'styled-jsx/css'

const eventContainerLayout = css.global`{
    .main { grid-area: main; }
    .right { grid-area: right; }
    .bottom { grid-area: bottom;}
    
    
    .grid-container {
      display: grid;
      grid-template-areas:
        'main main main main right'
        'main main main main right'
        'main main main main right'
        'main main main main right'
        'bottom bottom bottom bottom bottom';
      grid-gap: 2px;
      background-color: #d2d2d2;
      padding: 2px;
    }
    
    .grid-container > div {
      background-color: rgba(255, 255, 255, 1);
      padding: 5px 0;
    }
}`

const MAIN_AREA = 'main';
const SIDE_AREA = 'right';
const BOTTOM_AREA = 'bottom';

export { eventContainerLayout, MAIN_AREA, SIDE_AREA, BOTTOM_AREA };