import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import {Typography} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import UserServices from '../services/UserServices';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function GetChallans(props) {

  const location = useLocation();
  const { id } = location.state || {}; 
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const groupedData = {};
  const [filteredData,setfilteredData] = useState(null);
  const GetChallanData = (my_id) => {  
    try{
      UserServices.Get_ChallanDetailsById(my_id).then((res) => {
        const resdata = res.data;
        console.warn(resdata);
        setData(resdata);
        resdata.forEach((item)=>{
          if(!groupedData[item.issue_date]){
            groupedData[item.issue_date] = [];
          }
          groupedData[item.issue_date].push(item);

          
        })

        setfilteredData(groupedData);
        console.log(groupedData[resdata[0].issue_date]); 
        
      });
      
      
    }
    catch(error){
      console.log(error);
    }
  };
  
 

useEffect(() => {
  GetChallanData(id);
  // setLoading(false);

}, []);


  if(filteredData==null){
    console.log("runnig");
    return (<div>loading....</div>);
  }
  console.warn(typeof(filteredData));
  return (
    <>
    
    <Typography variant="h4" component="h2" sx={{ml:6}}>
        Date: 9th April, 2023
    </Typography>
    <br/>
    <TableContainer sx={{width:900, mx:'auto'}} component={Paper}>
      <Table  sx={{ minWidth: 700}} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Quantity.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      
          {filteredData[data[0].issue_date].map((row) => (
            <TableRow key={row.challan_id}>
              <TableCell>{row.item.Name}</TableCell>
              <TableCell align="right">{row.totalQuantity}</TableCell>
              <TableCell align="right">{row.item.selling_price}</TableCell>
              <TableCell align="right">{ccyFormat(10)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

            <br/>
            <br/>

    

    </>
  );
}
