import React from 'react'
import './style.css'
const Card = (props) => {
	const { title } = props
	return (
		<div>
			<div className="main_card_auth">
				
				<div className="card_auth">
					<div>
						<p className="auth_text">{title}</p>
					</div>
					{props.children}
				</div>
				
			</div>
		</div>
	)
}

export default Card
