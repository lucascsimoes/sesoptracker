import { useState, useEffect } from 'react'
import * as Styled from './style'

import { Transition  } from 'react-transition-group'

export default () => {

    const [isOpen, setIsOpen] = useState(false)
    function checkInsideModal(e:React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            toggleModal()
        }
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);

        if (!isOpen) {
          document.body.classList.add('modal-open');
        } else {
          document.body.classList.remove('modal-open');
        }
      };

    return (
        <>
        <Styled.Container onClick={toggleModal}>
            <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/><circle cx="336" cy="128" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="176" cy="256" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="336" cy="384" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
            <p> Filtros </p>
        </Styled.Container>

        <Transition in={isOpen} timeout={300} unmountOnExit>
            {(state:string) => (
                <Styled.FiltersContainer className={state}
                    onClick={e => checkInsideModal(e)}>
                    <main>
                        <header>
                            <svg onClick={toggleModal} viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
                            <p> Filtros </p>
                        </header>

                        <Styled.ChangeCardVisual>
                            <button>
                                
                            </button>
                            <button>

                            </button>
                            <button>

                            </button>
                        </Styled.ChangeCardVisual>

                        <section>
                            <h4> Mostrar </h4>

                            <Styled.FilterRow gap={20}>
                                <button> Todos </button>
                                <button> Apenas em manutenção </button>
                                <button> Apenas disponíveis </button>
                            </Styled.FilterRow>
                        </section>
                    </main>
                </Styled.FiltersContainer>
            )}

        </Transition>
        </>
    )
}