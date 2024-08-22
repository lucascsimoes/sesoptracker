import { AlertTriangle } from 'lucide-react';
import { ReactElement } from 'react'

import { IoAlertCircleOutline } from "react-icons/io5";

export default function FeedbackException({ children, className }: { children?: string[], className?: string }): ReactElement {
    return (
        <div className={`${ className } flex items-center gap-3 py-3 *:text-red-500`}>
            <AlertTriangle color='#ef4444' className='min-w-[23px] w-0' size={20}/>
            <p className='text-[15px]'> { children } </p>
        </div>
    )
}