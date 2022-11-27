import React,{useState} from 'react'

const CheckBoxItem = ({label,required,checked}) => {
    const [isChecked,setIsChecked] = useState(checked)
  return (
    <div className='ma1'>
        <input 
            type="checkbox" 
            id={`checkbox-${label}`} 
            name={`checkbox-${label}`}
            required={required}
            className="mt1"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label 
            for={`checkbox-${label}`}
            className="ml2"
        >
            {label}
        </label>
    </div>
  )
}

export default CheckBoxItem