import React , { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import AddCustomer from "../Components/AddCustomer";  

export const SidebarData =[
	{
		title: "Add Customer",
		icon: <GroupIcon />,
		link:"/add-cust",
		component: AddCustomer
	},
	{
		title: "View Customer Table",
		icon: <GroupIcon />,
		link: "/view",
	},
	/*{
		title: "Add Customer",
		icon: <GroupIcon />,
		link: "/",
	},
	{
		title: "Add Customer",
		icon: <GroupIcon />,
		link: "/",
	},
	{
		title: "Add Customer",
		icon: <GroupIcon />,
		link: "/",
	}*/
];

