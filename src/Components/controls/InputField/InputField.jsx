import React from 'react'
import './style.css'
const InputField = (props) => {
	const { name, value, onChange, placeholder, type, IconEmail, IconPassword, IconPerson} = props
	return (
		<div>
			<div className="input_field">
				<input
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					type={type}	
				/>
				
				<div className="inputfield_icon">
					{IconEmail && <IconEmail  />  }
					{IconPassword && < IconPassword/>}
					{IconPerson && <IconPerson/>}
				</div> 
			</div>
		</div>
	)
}

export default InputField
