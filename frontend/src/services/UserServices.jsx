import { ErrorResponse } from '@remix-run/router';
import axios from 'axios';
import { saveAs } from 'file-saver';
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
  Add_Challan: async function (customer_id, item_id, quantity) {
    try {
      const response = await axios.post('http://127.0.0.1:8081/api/challans/addChallans', {
        customer_id: customer_id,
        item_id: item_id,
        quantity: quantity,
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
  FetchItems: async function(){
    
    try{
      const response = await axios.get("http://127.0.0.1:8081/api/items/getItems");
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

  Customer_Delete: async function (id) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8081/api/customers/deleteCustomers/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  Supplier_Delete: async function (id) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8081/api/suppliers/deleteSuppliers/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  Item_Delete: async function (id) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8081/api/items/getItems/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  Get_ChallanCountById: async function(id){
    try{
      const response = await axios.get(
        `http://127.0.0.1:8081/api/challans/getChallanCount/${id}`
      );
      return response;
    }
    catch(error){
      console.log(error);
      return error;
    }
  },

  Get_ChallanDetailsById: async function(id){
    try{
      const response = await axios.get(
        `http://127.0.0.1:8081/api/challans/getChallanDetails/${id}`
      );
      return response;
    }
    catch(error){
      console.log(error);
      return error;
    }
  },

  DownloadChallan: async function(inputFields, customerName){
      console.warn(inputFields);
      await axios.post(
        `http://127.0.0.1:8081/api/challans/createChallanPDF`,{
          inputFields : inputFields,
          customerName: customerName
        }
      )
      .then(() =>  axios.get("http://127.0.0.1:8081/api/challans/fetchPDF", {responseType: 'blob'}))
      .then((res)=>{
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'});
        saveAs(pdfBlob,'challans.pdf');
      });
  },

// Save and Download the Invoice
  SaveAndDownloadInvoice: async function(customerId, items){
      console.warn(customerId);
      console.warn(items);

      try{
        await axios.post(
          "http://127.0.0.1:8081/api/invoice/generateInvoice", {
            customerId: customerId,
            items: items
          }
        )
        .then(()=> axios.get("http://127.0.0.1:8081/api/invoice/fetchPDF", {responseType: 'blob'}))
        .then((res)=>{
          const pdfBlob = new Blob([res.data], {type: 'application/pdf'});
          saveAs(pdfBlob,'invoice.pdf');
        });
        
      }
      catch(error){
        console.log(error);
      }
      
  }
};
