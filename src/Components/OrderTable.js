import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/EditTwoTone';
import OrderDialog from "../Components/OrderDialog";    
import UpdateOrder from "../Components/UpdateOrder"; 
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: '#f44336',
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `10px`,
    height: "100%",
    width: "99%",
    marginTop: theme.spacing(5)
  },
  link: {
    color: "rgba(0,0,0,0.65)",
    textDecoration: "none",
    marginLeft: "10%",
    alignSelf: "flex-start",
    "&:hover": {
      color: "rgba(0,0,0,1)"
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    '& > *': {
      marginRight:theme.spacing(1)
    }
  },
  topLeftBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
     position: 'absolute',
     bottom:' 325px',
     left: '1100px',
     width: '100%',
     height: '15%',
  }
}));

export default function OrderTable() {
  const classes = useStyles();
  const [data, upDateData] = React.useState([]);
  const [firstLoad, setLoad] = React.useState(true);
  const [product, setProduct] = React.useState([]);
  const [openOrderDialog, setOpenOrderDialog] = React.useState(false);
  const[recordForEdit, setRecordForEdit] = React.useState(null);

  let isLoading = true;

  async function getProductData() {                       //Fetches the customer data to be displayed in table
    let response = await fetch("/api/orders");
    let body = await response.json();
    console.log(body);
    upDateData(body);
  }

  if (firstLoad) {                                         //Loads the webpage for the first time when user lands on it
    getProductData();
    setLoad(false);
  }

  if (data.length > 0) isLoading = false;
 
  async function deleteProduct(id) {                       //deletes a customer with a given rowId
    axios.delete('/api/orders/'+id).
    then(response =>{
      if(response.data != null){
        setProduct(axios.get('api/orders').then((res) => upDateData(res.data)));
      }
      });
  };

  async function addOrUpdateOrderDialog(rowId){              //invokes a dialog to either add or update customer
    setRecordForEdit(rowId);
    setOpenOrderDialog(true);
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ShoppingCartIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
        Order Directory
      </Typography>

      <Box component="span"  m={1} className={classes.topLeftBox} >
      <Button className = {classes.root} variant="contained" onClick={() => {addOrUpdateOrderDialog(null)}}>
        <AddShoppingCartIcon  color="primary" />
      </Button>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          style={{ width: "80%", margin: "0 10px" }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Amount</TableCell> 
                <TableCell align="center">Actions</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.productName}</TableCell>
                  <TableCell align="center">{row.customerName}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">
                      <ButtonGroup>
                      <Button size="sm" onClick={() => {addOrUpdateOrderDialog(row.id)}} > <EditIcon  color="primary" /> </Button>
                      <Button size="sm" onClick={() => {deleteProduct(row.id)}}><DeleteIcon color="secondary"/> </Button>
                      </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <OrderDialog 
          openOrderDialog= {openOrderDialog}
          setOpenOrderDialog = {setOpenOrderDialog}>
        <UpdateOrder
          recordForEdit = {recordForEdit}
          openOrderDialog= {openOrderDialog}
          setOpenOrderDialog = {setOpenOrderDialog}
        />
      </OrderDialog>
    </div >

  );
}
