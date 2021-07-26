import React, { useState } from "react";
import {Grid,LinearProgress,Select,OutlinedInput,MenuItem} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {ResponsiveContainer,ComposedChart,Line,PieChart,Pie,Cell,YAxis,XAxis} from "recharts";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Widget from "../Components/Widget";
import Dot from "../Components/Dot";

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(5)
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  progressSection: {
    marginBottom: theme.spacing(1),
  },
  progressTitle: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgb(236, 236, 236)',
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    //backgroundColor: '#009688',
    marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  progressBarWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  legendElementText: {
    marginLeft: theme.spacing(1),
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  }

}));


export default function Sales(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [data, upDateData] = React.useState([]);
  const [productData, upDateProductData] = React.useState([]);
  const [orderData, upDateOrderData] = React.useState([]);
  const [firstLoad, setLoad] = React.useState(true);
  

  async function getCustomerData(){                    //Fetches the customer data to be displayed in table
      let response = await fetch("/api/customer");
      let body = await response.json();
      upDateData(body);      
  }

  async function getProductData(){
    let response = await fetch("/api/products");
    let body = await response.json();
    upDateProductData(body);
  }

  async function getOrderData(){
    let response = await fetch("/api/orders");
    let body = await response.json();
    upDateOrderData(body);
  }

  if (firstLoad) {                                         //Loads the webpage for the first time when user lands on it
    getCustomerData();
    getProductData();
    getOrderData();
    setLoad(false);
  }

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  //Counting the number of customers
  var count=0;
  var resCustomerGenderArr = [];
  var resCustomerSalesArr = [];
  
  var countMales = 0;
  var countFemales = 0;
  for (let i = 0; i < data.length; i++) {
      count = count+1;
      resCustomerGenderArr.push(data[i].gender);
      if(!resCustomerSalesArr.find(element => element.Date === data[i].dob)){
        resCustomerSalesArr.push(
        {sales: data[i].sales,
          Date: data[i].dob
        });
      }
      
      else {
        const found = resCustomerSalesArr.findIndex(element => element.Date === data[i].dob)
        var sum = resCustomerSalesArr[found].sales;
        sum = sum + data[i].sales;
        resCustomerSalesArr[found].sales = sum; 
        console.log("sum", sum);
      }
      
      if(resCustomerGenderArr[i] === "F"){
        countFemales= countFemales +1;
      } 
      else if(resCustomerGenderArr[i] === "M"){
        countMales = countMales+1;
      }
  }
  console.log("countFemales", countFemales);
  console.log(resCustomerSalesArr); 
  resCustomerSalesArr.sort((a,b) => {
    if(a.Date > b.Date){
      return 1;
    }
    else{
      return -1;
    }
  });
   

  //Counting number of products
  var countProducts =0;
  var resCategoryArr = [];
  var countTShirt= 0;
  var countWatch = 0;
  var countJeans =0;
  var countShoes = 0;
  for (let i = 0; i < productData.length; i++) {
      countProducts = countProducts+1; 
      resCategoryArr.push(productData[i].category);
      if(resCategoryArr[i] === "T-shirt" || resCategoryArr[i] === "T-Shirt" || resCategoryArr[i]=== "t-shirt"){
        countTShirt = countTShirt +1;
      }

      if(resCategoryArr[i] === "Jeans" || resCategoryArr[i] === "jeans" ){
        countJeans = countJeans +1;
      }

      if(resCategoryArr[i] === "Watch" || resCategoryArr[i] === "watch" ){
        countWatch = countWatch +1;
      }

      if(resCategoryArr[i] === "Shoes" || resCategoryArr[i] === "shoes" ){
        countShoes = countShoes +1;
      }

  }
  console.log(resCategoryArr);
  console.log(countTShirt);

  const PieChartData = [
    { name: "T-Shirt", value: countTShirt, color: "primary" },
    { name: "Jeans", value: countJeans, color: "secondary" },
    { name: "Watch", value: countWatch, color: "warning" },
    { name: "Shoes", value: countShoes, color: "success" },
  ];

  //COunting number of orders
  var countOrders =0;
  var topSellingProduct = [];
  for (let i = 0; i < orderData.length; i++) {
      countOrders = countOrders+1;
      topSellingProduct.push({
          name: orderData[i].productName,
          quantity: orderData[i].quantity,
        });
  }
  
  topSellingProduct.sort((a,b) => {
    if(a.quantity > b.quantity){
      return -1;
    }
    else{
      return 1;
    }
  });
  console.log(topSellingProduct);
  const listItems = topSellingProduct.map((item, key) => {
                        return <li key={key}>{item.name} {item.quantity}</li>});


  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12} >
          <Widget
            title="Top Selling Product"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            
            <ul> {listItems}</ul>
            

          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Gender Ratio"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Female
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Male
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Male
              </Typography>
              <LinearProgress
                variant="determinate"
                value={countMales}
                classes={{ barColorPrimary: classes.progressBarPrimary }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Female
              </Typography>
              <LinearProgress
                variant="determinate"
                value={countFemales}
                classes={{ barColorPrimary: classes.progressBarWarning }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Database overview"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                Total Products {countProducts}
              </Typography>
              <LocalOfferIcon style={{ marginLeft: 40}} color="secondary"/>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                Total Customers {count}
              </Typography>
              <PermContactCalendarIcon style={{ marginLeft: 40}} color="primary"/>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                Total Orders {countOrders}
              </Typography>
              <ShoppingCartIcon style={{ marginLeft: 40}} color="secondary"/>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Product Category" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  
                  <PieChart>
                    <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Sales chart
                </Typography>
                
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={resCustomerSalesArr}
              >
                <YAxis
                  ticks={[0, 25000, 50000, 75000, 100000]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  dataKey="Date"
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                
                <Line 
                  type="linear"
                  dataKey="sales"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        
      </Grid>
    </>
  );
}

