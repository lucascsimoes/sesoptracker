import styled from "styled-components";

export const Container = styled.main `
    max-width: 1400px;
    padding-inline: 30px;
    width: 100%;
    margin: 0 auto;
`

export const Title = styled.h1 `
    text-align: center;
    font-weight: 900;
    font-size: clamp(2rem, 1.6585rem + 1.9512vw, 4rem);
    margin-top: 200px;

    span {
        color: var(--primary);
        font-weight: 100;
        font-style: italic;
        font-size: clamp(1.3125rem, 1.0884rem + 1.2805vw, 2.625rem);
        margin-left: 5px;
        letter-spacing: 2px;
    }
`

export const Subtitle = styled.p `
    text-align: center;
    font-size: clamp(0.75rem, 0.622rem + 0.7317vw, 1.5rem);
    max-width: 500px;
    width: 100%;
    margin: 10px auto 100px;
`

export const Filters = styled.div `
    display: flex;
    gap: 20px;
`

export const Table = styled.div `
    margin-top: 40px;

    header {
        display: flex;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid var(--secondary-background);

        p {
            flex: 1;
            padding: 20px 25px;
            opacity: .4;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
        }
    }
`