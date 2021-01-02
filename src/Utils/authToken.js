import axios from "axios";

let authToken = (token) => {
	if (token) {
		axios.defaults.headers.common['jwt'] = token;

	} else {
		delete axios.defaults.headers.common['jwt'];
		
	}
};
export default authToken