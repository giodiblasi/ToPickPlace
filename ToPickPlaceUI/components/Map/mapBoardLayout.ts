import css from 'styled-jsx/css'

const size = 80;
const mapBoardLayout = css.global`{
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

export { mapBoardLayout, SEAT_AVAILABLE_STYLE, SEAT_BLOCKED_STYLE};