import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import AddCustomer from "../Components/AddCustomer";  

const useStyles = makeStyles(theme =>({
	dialogWrapper : {
		padding: theme.spacing(2),
		position:'absolute',
		top: theme.spacing(2),
	},
}));

export default function Popup(props){
	const {title, children, openPopup, setOpenPopup} = props;
	const classes = useStyles();

	const handleClose = () => {
    	setOpenPopup(false);
  	};

	return (
			<div>
				<Dialog open={openPopup} onClose = {handleClose} maxWidth="md" className = {classes.dialogWrapper}>
					
					<DialogContent dividers>
						{children}
					</DialogContent>
				</Dialog>
			</div>
		);
}
