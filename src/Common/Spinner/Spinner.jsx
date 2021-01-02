import React from 'react'
import './Style.css'
const Spinner = () => {
	return (
		<div className="loader-root">
			<div className="loader-content">
				
				<div className="dot-load">
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
				</div>
			</div>
		</div>
	)
}

export default Spinner
