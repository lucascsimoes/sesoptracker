import { ReactElement } from 'react'

import { IoAlertCircleOutline } from "react-icons/io5";

export default function FeedbackException({ children, className }: { children?: string[], className?: string }): ReactElement {
    return (
        <div className={`${ className } bg-card flex items-center gap-4 px-4 py-3`}>
            <IoAlertCircleOutline color='#d03d3d' className='min-w-[23px] w-0' size={23}/>
            <p className='text-[15px]'> { children } </p>
        </div>
    )
}