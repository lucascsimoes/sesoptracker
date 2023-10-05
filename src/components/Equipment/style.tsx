import styled from "styled-components";

export const Container = styled.div `
    position: relative;
    width: 260px;
    min-height: 320px;
    background: var(--secondary-background);
    border-radius: 10px;
    overflow: hidden;
    padding: 45px 20px 0;

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

    & > p {
        color: var(--primary);
        font-weight: 700;
        margin-bottom: 10px;
        font-style: italic;
    }

    & > h1 {
        display: flex;
        align-items: flex-end;
        font-size: 34px;
        margin-bottom: 20px;

        span {
            font-weight: 400;
            font-size: 18px;
            opacity: .4;
            margin-left: 10px;
            transform: translateY(-5px);
        }
    }
`

export const Info = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 5px;

    p {
        opacity: .7;
        font-style: italic;
    }

    span {
        font-size: 14px;
    }
`

export const Commands = styled.div `
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 1px;
    margin-top: 30px;
    border-radius: 5px;
    overflow: hidden;

    & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 32px;
        background: var(--terciary-background);
        cursor: pointer;
        transition: background .25s;
        border-bottom: 3px solid var(--primary-background);

        &:hover {
            border-bottom: 3px solid transparent;
            transition: background .25s;

            svg {
                filter: brightness(30%);
            }
        }
    }

    svg {
        min-width: 20px;
        width: 0;
        fill: white;
        opacity: .6;
    }

    .historic:hover {
        background: var(--primary);
        
        svg {
            fill: var(--primary);

            path {
                color: var(--primary);
            }
        }
    }

    .edit:hover {
        background: var(--yellow);

        svg {
            fill: var(--yellow);

            path {
                color: var(--yellow);
            }
        }
    }

    .delete:hover {
        background: var(--red);

        svg {
            fill: var(--red);

            path {
                color: var(--red);
            }
        }
    }
`