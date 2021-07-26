import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles"
import DialogContent from '@material-ui/core/DialogContent';
 

const useStyles = makeStyles(theme =>({
	dialogWrapper : {
		padding: theme.spacing(2),
		position:'absolute',
		top: theme.spacing(2),
	},
}));

export default function ProductDialog(props){
	const {children, openProductDialog, setOpenProductDialog} = props;
	const classes = useStyles();

	return (
			<div>
				<Dialog open={openProductDialog} maxWidth="md" className = {classes.dialogWrapper}>
					<DialogContent dividers>
						{children}
					</DialogContent>
				</Dialog>
			</div>
		);
}
