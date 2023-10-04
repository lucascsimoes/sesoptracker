import styled from "styled-components";

export const Container = styled.main `
    padding-inline: 200px;
`

export const Title = styled.h1 `
    text-align: center;
    font-weight: 900;
    font-size: 38px;
    margin-block: 200px;

    span {
        color: var(--primary);
        font-weight: 100;
        font-style: italic;
        font-size: 28px;
        margin-left: 5px;
        letter-spacing: 2px;
    }
`

export const Filters = styled.div `
    border: 1px solid red;
`