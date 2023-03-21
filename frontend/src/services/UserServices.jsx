import { ErrorResponse } from '@remix-run/router';
import axios from 'axios';
import { func } from 'prop-types';

export default {
  FetchCustomer: async function () {
    try {
      const response = await axios.get('http://127.0.0.1:8081/api/customers/getCustomers');
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  Add_Supplier: async function (Name, Email, Address, City, Mobile) {
    try {
      const response = await axios.post('http://127.0.0.1:8081/api/suppliers/addSupplier', {
        Name: Name,
        Email: Email,
        Address: Address,
        City: City,
        Mobile: Mobile,
      });

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  Add_Customer: async function (Name, Email, Address, City, Mobile) {
    try {
      const response = await axios.post('http://127.0.0.1:8081/api/customers/addCustomer', {
        Name: Name,
        Email: Email,
        Address: Address,
        City: City,
        Mobile: Mobile,
      });

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  Add_Item: async function (Name, Purchase_price, Selling_price,Item_color,Total_stocks, file){
    try{
      console.log("From USerservices:",file);
      const response = await axios.post('http://127.0.0.1:8081/api/items/addItems',{
        Name: Name,
        purchase_price: Purchase_price,
        selling_price: Selling_price,
        item_color: Item_color,
        total_stocks: Total_stocks,
        file: file
      },{ headers: {'Content-Type': 'multipart/form-data'}});
      return response;
    }
    catch(error){
      console.log(error);
      return error;
    }
  },

  FetchSupplier: async function () {
    try {
      const response = await axios.get('http://127.0.0.1:8081/api/suppliers/getSuppliers');
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
