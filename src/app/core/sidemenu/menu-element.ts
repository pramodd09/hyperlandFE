export const menus = [

{

'name': 'User',
'icon': 'widgets',
'open': false,
'link': false,
'sub': [
{
'name': 'Associate',
'icon': 'widgets',
'link': 'user/useragent',
'open': false
},
{
'name': 'Daily Expenses',
'icon': 'widgets',
'link': 'user/daily-expenses',
'open': false
},
{
'name': 'Booking',
'icon': 'widgets',
'link': 'transaction/bookingform',
'open': false
},
/* {
'name': 'Expenses',
'icon': 'widgets',
'link': 'user/dailyexpense',
'open': false
}, */
{
'name': 'Verify Transaction',
'icon': 'widgets',
'link': 'transaction/verifytransaction',
'open': false
}
]
},

{
'name': 'Admin',
'icon': 'widgets',
'open': false,
'link': false,
'sub': [
{
'name': 'Role-Configuration',
'icon': 'widgets',
'link': 'master/role',
'open': false,
},
{
'name': 'Firm-master',
'icon': 'widgets',
'link': 'master/masterfirm',
'open': false,
},
{
'name': 'City-master',
'icon': 'widgets',
'link': 'master/mastercity',
'open': false,
},
{
'name': 'Project-master',
'icon': 'widgets',
'link': 'master/masterproject',
'open': false,
},
{
'name': 'Block-master',
'icon': 'widgets',
'link': 'master/masterblock',
'open': false,
},
{
'name': 'Type-master',
'icon': 'widgets',
'link': 'master/mastertype',
'open': false,
},
{
'name': 'PLC-master',
'icon': 'widgets',
'link': 'master/masterplc',
'open': false,
},
{
'name': 'Location-master',
'icon': 'widgets',
'link': 'master/masterlocation',
'open': false,
},
{
'name': 'Bank-master',
'icon': 'widgets',
'link': 'master/masterbank',
'open': false,
},
{
'name': 'Additional Charges',
'icon': 'widgets',
'link': 'master/masteradditionalcharges',
'open': false,
},
{
'name': 'Investor-master',
'icon': 'widgets',
'link': 'master/masterinvestor',
'open': false,
},
{
'name': 'Investment-master',
'icon': 'widgets',
'link': 'master/masterinvestment',
'open': false,
},
{
'name': 'Expense-Category',
'icon': 'widgets',
'link': 'master/expensecategory',
'open': false,
},
{
'name': 'Farmer-master',
'icon': 'widgets',
'link': 'master/farmer',
'open': false,
},
{
'name': 'Land-master',
'icon': 'widgets',
'link': 'master/land',
'open': false,
}

]
},
{
'name': 'Report',
'icon': 'widgets',
'open': false,
'link': false,
'sub': [
{
'name': 'Booking Report',
'icon': 'widgets',
'link': 'report/bookingreport',
'open': false,
},
{
'name': 'Customer Report',
'icon': 'widgets',
'link': 'report/customerreport',
'open': false,
},
{
'name': 'Transaction Report',
'icon': 'widgets',
'link': 'report/transactionreport',
'open': false,
},
{
'name': 'Agent Leg Report',
'icon': 'widgets',
'link': 'report/networkreport',
'open': false,
}
]
},
{
'name': 'Accounts',
'icon': 'widgets',
'open': false,
'link': false,
'sub': [
{
'name': 'Farmer Payment',
'icon': 'widgets',
'link': 'accounts/farmer-payment-details',
'open': false,
},
{
'name': 'Agent Payment',
'icon': 'widgets',
'link': 'accounts/associate-payment-details',
'open': false,
},
{
'name': 'Customer Installment',
'icon': 'widgets',
'link': 'accounts/customer-installment-details',
'open': false,
}


]
},
{
'name': 'Transaction',
'icon': 'widgets',
'open': false,
'link': false,
'sub': [
{
'name': 'registry-form',
'icon': 'widgets',
'link': 'transaction/registryform',
'open': false,
}

]
}

];
