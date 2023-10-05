import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle `
    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-Thin.ttf);
        font-weight: 100;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-ExtraLight.ttf);
        font-weight: 200;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-Light.ttf);
        font-weight: 300;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-Regular.ttf);
        font-weight: 400;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-Medium.ttf);
        font-weight: 500;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-SemiBold.ttf);
        font-weight: 600;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-Bold.ttf);
        font-weight: 700;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-ExtraBold.ttf);
        font-weight: 800;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(../fonts/Montserrat-Black.ttf);
        font-weight: 900;
    }

    :root {
        --primary-background: #1C1C1C;
        --secondary-background: #282828;
        --terciary-background: #383838;
        --primary: #8DE786;

        --red: #d33f3f;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        color: white;
        font-family: 'Montserrat', sans-serif;
    }

    html, body {
        min-height: 100vh;
        background: var(--primary-background);
    }
`

export default GlobalStyle