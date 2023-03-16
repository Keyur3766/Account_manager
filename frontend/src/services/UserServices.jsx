import { ErrorResponse } from "@remix-run/router";
import axios from "axios";


export default{
    FetchCustomer: async function(){
        try{
            const response = await axios.get(
                "http://127.0.0.1:8081/api/customers/getCustomers"
            );
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    Add_Customer: async function (
        Name,
        Email,
        Address,
        City,
        Mobile,
      ) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8081/api/customers/addCustomer",
            {
              Name: Name,
              Email: Email,
              Address: Address,
              City: City,
              Mobile: Mobile,
            }
          );
    
          return response;
        } catch (error) {
          console.log(error);
        }
    }
}