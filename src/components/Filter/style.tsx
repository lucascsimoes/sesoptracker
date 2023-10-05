import styled from "styled-components";

export const Container = styled.button `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 55px;
    width: 140px;
    border-radius: 10px;
    background: var(--secondary-background);
    border: none;
    cursor: pointer;

    svg {
        min-width: 24px;
        width: 0;
    }

    p {
        font-size: 15px;
    }
`


interface FiltersContainerProps {
    'data-show'?: boolean;
}

export const FiltersContainer = styled.div<FiltersContainerProps> `
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    transition: background .5s;

    &.entering {
        background: #0000005d;
        transition: background .5s;

        & > main {
            transform: translateY(0);
            opacity: 1;
            transition: transform .5s, opacity .5s;
        }
    }

    & > main {
        width: 40vw;
        height: 90vh;
        min-width: 600px;
        border-radius: 15px;
        background: var(--secondary-background);
        transform: translateY(200px);
        opacity: 0;
        transition: transform .5s, opacity .5s;
        padding-inline: 40px;

        header {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            height: 60px;
            border-bottom: 1px solid var(--terciary-background);

            svg {
                position: absolute;
                top: 0;
                bottom: 0;
                left: -15px;
                margin-block: auto;
                min-width: 26px;
                width: 0;
                cursor: pointer;
            }

            p {
                font-weight: 600;
            }
        }

        @media (max-width: 700px) {
            width: 100%;
            min-width: auto;
            border-radius: 0;
        }
    }
`