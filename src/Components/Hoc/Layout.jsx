import React from 'react'
import Navbar from '../Navbar/Navbar'

const Layout = (props) => {
	return (
		<React.Fragment>
			<Navbar />
			<div className="bodydiv">
				{props.children}
			</div>
		</React.Fragment>
	);
}

export default Layout
