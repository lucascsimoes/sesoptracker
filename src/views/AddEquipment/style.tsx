import styled from "styled-components";

export const Container = styled.form `
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 50px;

    aside {
        position: sticky;
        top: 20px;
        margin-top: 30vh;
        max-width: 350px;
        width: 100%;

        section {
            display: flex;
            flex-direction: column;
            gap: 30px;
            padding: 40px 25px;
            border-radius: 10px;
            background: var(--secondary-background);
        }
        
        button[type="submit"] {
            width: 100%;
            height: 70px;
            border-radius: 5px;
            background: var(--primary);
            border: none;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            margin-top: 20px;

            &:disabled {
                background: var(--gray);
                opacity: .3;
                cursor: default;
            }
        }
    }

    main {
        position: relative;
        max-width: 40vw;
        width: 100%;
        padding: 80px 40px;

        h2 {
            text-align: center;
            margin-bottom: 80px;
        }
    }
`

export const FormField = styled.fieldset `
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    gap: 20px;
    position: relative;
    margin-block: 40px;
    border: none;

    legend {
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 1px;
        opacity: .4;
        margin-bottom: 10px;

        span {
            color: var(--red);
            opacity: 1;
            font-size: 16px;
        }
    }

    & > p {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 15px;
        font-size: 13px;
        opacity: .3;
        letter-spacing: 1px;
        cursor: default;
    }

    input {
        width: 100%;
        background: var(--secondary-background);
        border: none;
        border-radius: 5px;
        height: 50px;
        font-size: 18px;
        letter-spacing: 3px;
        padding-inline: 20px;
        border: 1px solid var(--terciary-background);

        &:focus {
            outline: 1px solid var(--primary);

            & ~ legend {
                opacity: 1;
            }
        }

        &#createLocal {
            padding-left: 70px;
        }
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex: 1;
        min-height: 100px;
        border: 1px solid var(--terciary-background);
        background: none;
        border-radius: 5px;
        cursor: pointer;

        &.active {
            border: 1px solid var(--primary);
            background-color: var(--primary-opacity);

            p, path {
                color: var(--primary);
            }
        }

        svg {
            min-width: 40px;
            width: 0;

            path {
                color: var(--gray);
            }
        }

        p {
            font-size: 16px;
            text-transform: uppercase;
            color: var(--gray);
        }
    }
`


interface ToDoItemProps {
    isEmpty: boolean
}

export const ToDoItem = styled.div<ToDoItemProps> `
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    opacity: ${({ isEmpty }) => isEmpty ? ".4" : "1"};
    
    & > div {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 3px solid var(--terciary-background);

        svg {
            position: absolute;
            min-width: 26px;
            width: 0;
            top: -10px;
            right: -11px;
            
            path {
                color: var(--primary);
            }
        }
    }
`