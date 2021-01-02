import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'


export default function Snack({ message, type, open, close }) {
	const color = {
		success: "#f42b68;;",
		error: "#FF0000"
	}

	const useStyles = makeStyles(theme => ({
		root: {
			'& .MuiSnackbarContent-root': {
				backgroundColor: color[type],

			},

		},


	}));


	const classes = useStyles();
	return (
		<div>
			<Snackbar

				className={classes.root}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				onClose={close}
				message={message}
				action={
					<React.Fragment>
						<IconButton
							aria-label="close"
							color="inherit"
							onClick={close}
							style={{ outline: "none" }}
						>
							<CloseIcon />
						</IconButton>
					</React.Fragment>
				}
			/>
		</div>
	);
}