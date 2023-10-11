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
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: transparent;
    transition: opacity 0.5s, transform 0.5s, background 0.5s;

    &.entering {
        opacity: 0;
        transform: translateY(50%);
    }

    &.entered {
        opacity: 1;
        transform: translateY(0);
        animation: backgroundFade .5s .25s forwards;
    }

    &.exiting {
        opacity: 0;
        transform: translateY(50%);
        animation: backgroundFade .5s forwards reverse; 
    }

    &.exited {
        opacity: 0;
        transform: translateY(50%);
    }

    @keyframes backgroundFade {
        from {
            background: transparent;
        }
        to {
            background: #00000060;
        }
    }

    & > main {
        width: 40vw;
        height: 90vh;
        min-width: 600px;
        border-radius: 15px;
        background: var(--secondary-background);
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

        section > h4 {
            font-size: 18px;
            margin-bottom: 20px;
        }

        @media (max-width: 700px) {
            width: 100%;
            min-width: auto;
            border-radius: 0;
        }
    }
`

export const ChangeCardVisual = styled.section `
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    padding-block: 30px;

    button {
        min-width: 140px;
        height: 170px;
        background: none;
        border: 1px solid var(--terciary-background);
        border-radius: 5px;
        cursor: pointer;
    }
`

interface FilterRowProps {
    gap: number;
}

export const FilterRow = styled.div<FilterRowProps> `
    display: flex;
    justify-content: center;
    gap: ${({ gap }) => gap + "px"};

    & > * {
        flex: 1;
    }
`