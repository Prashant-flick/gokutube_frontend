import {useId} from 'react'

const Input = ({
  label,
  type="text",
  placeholder,
  className="",
  name,
  ...props
}) => {
  
  const id = useId();

  return(
    <div className='flex flex-col items-center w-full'>
      {
        label && <label htmlFor={id}
          className='font-semibold text-lg text-gray-900 mb-1 pl-1'
        >
          {label}
        </label>
      }
      <input 
        className={`rounded-md border-none text-white bg-gray-900 pl-2 focus:outline-none focus:border-none ${className}`}
        name={name}
        type={type} 
        placeholder={placeholder ? placeholder : label}
        id={id}
        {...props}
      />
    </div>
  )
}

export default Input