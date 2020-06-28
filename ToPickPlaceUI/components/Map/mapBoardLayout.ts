import css from 'styled-jsx/css'

const size = 80;
const mapBoardLayout = css.global`{
  .main-map { grid-area: main; }
  .right-map { grid-area: right; align-self: center;}
  .left-map { grid-area: left; align-self: center;}
  .bottom-map { grid-area: bottom;}
  .top-map { grid-area: top;}
  
  
  .map-container {
    display: grid;
    grid-template-areas:
      'top top top top top'
      'left main main main right'
      'bottom bottom bottom bottom bottom';
    grid-gap: 2px;
    
    padding: 2px;
  }
    
    .map-container > div {
      background-color: rgba(255, 255, 255, 1);
      padding: 5px 0;
    }

    .item-map {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .seat-available {
      background-color: rgba(143, 198, 255, 1);
      padding: 5px 0;
      width: ${size}px;
      height: ${size}px;
    }
    .seat-blocked {
      background-color: rgba(205, 205, 205, 1);
      padding: 5px 0;
      width: ${size}px;
      height: ${size}px;
    }
}`

const SEAT_AVAILABLE_STYLE = 'seat-available';
const SEAT_BLOCKED_STYLE = 'seat-blocked';
const MAIN_AREA = 'main-map';
const LEFT_AREA = 'left-map';
const RIGHT_AREA = 'right-map';
const BOTTOM_AREA = 'bottom-map';
const TOP_AREA = 'top-map';


export { mapBoardLayout, SEAT_AVAILABLE_STYLE, SEAT_BLOCKED_STYLE, MAIN_AREA, LEFT_AREA, RIGHT_AREA, TOP_AREA, BOTTOM_AREA};