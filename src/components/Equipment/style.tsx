import styled from "styled-components";

export const Container = styled.div `
    position: relative;
    width: 260px;
    min-height: 300px;
    background: var(--secondary-background);
    border-radius: 10px;
    overflow: hidden;
    padding: 45px 20px 20px;
    cursor: pointer;
    transition: transform .35s;

    &:hover {
        transform: translateY(-15px);
        transition: transform .35s;
    }

    /* &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: var(--primary);
        box-shadow: 0px 0px 30px 5px var(--primary);
        transition: width .5s, opacity .3s;
    }

    &:hover::after {
        opacity: 1;
        width: 100%;
        transition: width .5s, opacity .3s;
    } */

    .manutencao {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        gap: 20px;
        padding-inline: 20px;
        background: var(--red);

        svg {
            min-width: 22px;
            width: 0;
        }

        p {
            font-size: 12px;
            font-style: italic;
        }
    }

    h1 {
        font-style: italic;
        font-size: 28px;
        letter-spacing: 1px;
        margin-bottom: 15px;
    }

    & > :nth-last-child(2) {
        border: none;
    }
`

export const Info = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 8px;
    border-bottom: 1px solid var(--terciary-background);

    p {
        opacity: .7;
        font-style: italic;
    }

    span {
        font-size: 15px;
    }
`