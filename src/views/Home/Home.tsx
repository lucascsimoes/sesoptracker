import * as Styled from './style'

export default () => {
    return (
        <Styled.Container>
            <Styled.Title> SESOP<span>tracker</span> </Styled.Title>
            
            <Styled.Filters>
                <SearchBar/>
            </Styled.Filters>
        </Styled.Container>
    )
}