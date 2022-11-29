import React,{useState} from 'react'
import FormCheck from 'react-bootstrap/FormCheck'
const CheckBoxItem = ({label,checked,type}) => {
    const [isChecked,setIsChecked] = useState(checked)
  return (
    <FormCheck 
        label={label}
        checked={isChecked}
        type={type}
        onChange={(e) => setIsChecked(e.target.checked)}
    />
  )
}

export default CheckBoxItem