import React, { useId } from 'react'
 
export const Select = React.forwardRef(({
    options,
    label,
    className='',
    ...props
}, ref) => {
    const id = useId();

    return (
        <div className='w-full'>
            {label &&
                <label htmlFor={id} className=''>
                    {label}
                </label>
            }

            <select
                {...props}
                ref={ref}
                id={id}
                className={`${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

        </div>
    )
})
