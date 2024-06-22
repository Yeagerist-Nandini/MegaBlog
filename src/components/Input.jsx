import React, { useId } from 'react'

export const Input = React.forwardRef(({
    label,
    type = "text",
    className = '',
    ...props
}, ref) => {
    const id = useId();

    return (
        <div>
            {label &&
                <label htmlFor={id} className=''>
                    {label}
                </label>
            } 

            <input
                type={type}
                ref={ref}
                id={id}
                {...props}
                className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-200 ${className}`} />
        </div>
    )
})

