import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 55px;
    border-radius: 10px;
    background: var(--secondary-background);

    input {
        position: relative;
        background: transparent;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        border: none;
        outline: none;
        padding-right: 60px;
        font-size: 17px;
        z-index: 0;
    }

    & > svg {
        min-width: 24px;
        width: 0;
        margin-inline: 25px;
        opacity: .5;
    }

    & > div.isNull {
        display: none;
    }

    & > div:not(.isNull) {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 24px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 11px;
        opacity: .5;
        background-color: var(--terciary-background);
        z-index: 1;
    }
`