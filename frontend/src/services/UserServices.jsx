import axios from 'axios';
import { saveAs } from 'file-saver';
import Cookie from 'js-cookie';


export default {
  FetchCustomer: async function () {
    try {

      const response = await axios.get('http://127.0.0.1:8081/api/customers/getCustomers', 
        // {
        //     withCredentials: true, // Send cookies with the request
        // },
      );
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

  Update_ChallanStatusById: async function(id){
    try{
      const response = await axios.put(
        `http://127.0.0.1:8081/api/challans/updateChallan/${id}`
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
  },

  // Generate token for sign-in functionality
  GenerateLoginToken: async function(email, password){

    try{
      const response = await axios.post(
        "http://127.0.0.1:8081/api/login/generateToken", {
          username: email,
          password: password
        }
      );

      if(response.status===200){
        Cookie.set('jwtToken', JSON.stringify(response.data), { expires: 1/24 });
        // localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.warn(response)
      return response;
    }
    catch(error){
      // console.log(error);
      return error;
    }
  },
  // Remove token for Logout functioality
  RemoveToken: async function(){
    try{
      const response = await axios.post(
        "http://127.0.0.1:8081/api/login/logout", {
        }
      );
      if(response.status===200){
        Cookie.remove('jwtToken');
      }
      return response;
    }
    catch(error){
      console.log(error);
      return error;
    }
  },

  UpdateStockIN: async function(id, quantity){
    try{
        const response = await axios.put(
          `http://127.0.0.1:8081/api/items/updateStockIn/${id}`,
          {
            quantity: quantity
          }
        );

        return response;
    }
    catch(error){
      console.log(error);
      return error;
    }
  },
  UpdateStockOUT: async function(id, quantity){
    try{
        const response = await axios.put(
          `http://127.0.0.1:8081/api/items/updateStockOut/${id}`,
          {
            quantity: quantity
          }
        );

        return response;
    }
    catch(error){
      console.log(error);
      return error;
    }
  }
}
