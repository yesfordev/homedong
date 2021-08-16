import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
    ${reset}

    * {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
      box-sizing: border-box;
      & div, a, span, p, th, td, .button, abbr, .MuiTableCell-root, .MuiTableCell-Body, caption, .MuiTable-stickyHeader, li, ul, .MuiButtonBase-root, .MuiTypography-root, .MuiInput-inputMarginDense, .MuiTextField-root, .MuiFormControl-root {
        font-family: 'Cafe24SquareAir';
      }
    }

    body, html {
      margin: 0;
      padding: 0;
      font-size: 16px;
    }



    button {
      background: none;
      color: inherit;
      border: none;
      cursor: pointer;
      outline: inherit;
    }
    
    a {
      color: inherit;
      text-decoration: none;
    }
    
    li {
      list-style: none;
    }

    input:focus {
      outline: none;
    }

`;

export default globalStyles;
