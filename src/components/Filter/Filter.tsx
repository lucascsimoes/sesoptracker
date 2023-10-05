import { useState, useEffect } from 'react'
import * as Styled from './style'

export default () => {

    const [isOpen, setIsOpen] = useState(false)
    const [animation, setAnimation] = useState("")
    function checkInsideModal(e:React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            toggleModal("exiting")
        }
    }

    function toggleModal(type:string) {

        setAnimation(type)

        setTimeout(() => {
            if (type == "entering") {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }, 500)
    }

    return (
        <>
        <Styled.Container onClick={() => (setIsOpen(true), setAnimation("entering"))}>
            <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/><circle cx="336" cy="128" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="176" cy="256" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="336" cy="384" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
            <p> Filtros </p>
        </Styled.Container>

        { isOpen &&
            <Styled.FiltersContainer 
                data-show={isOpen} 
                className={animation}
                onClick={e => checkInsideModal(e)}>
                <main>
                    <header>
                        <svg onClick={() => toggleModal("exiting")} viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
                        <p> Filtros </p>
                    </header>
                </main>
            </Styled.FiltersContainer>
        }
        </>
    )
}