import css from 'styled-jsx/css'

const layoutStyle =  css.layout`
.column {
  float: left;
  adding: 10px;
 }

/* Left and right column */
.column.side {
  width: 25%;
}

/* Middle column */
.column.middle {
  width: 75%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
@media screen and (max-width: 600px) {
  .column.side, .column.middle {
    width: 100%;
  }
}
* {
  box-sizing: border-box;
}`;

const SIDE_COLUMN = 'column side';
const MIDDLE_COLUMN = ' column middle';
export { layoutStyle as styleLayout, SIDE_COLUMN, MIDDLE_COLUMN}