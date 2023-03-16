import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import UserServices from '../services/UserServices';

const cities = [
  {
    value: 'rajkot',
    label: 'Rajkot'
  },
  {
    value: 'ahmedabad',
    label: 'Ahmedabad'
  },
  {
    value: 'delhi',
    label: 'Delhi'
  },
  {
    value: 'kolkata',
    label: 'Kolkata'
  }
];

export default function AddCustomerPage()
{
  const [values, setValues] = useState("");

  const handleChange = useCallback(
    (event) => {
  
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const SendDataToBackEnd = async () => {
    try {
      UserServices.Add_Customer(
        custname,
        email,
        address,
        city,
        phone
      ).then((res) => {
        console.log("success");
      });
      
    } catch (error) {
      console.log(error);
    }
  };
// const [name,setName] = useState("");
// const [email,setEmail] = useState("");
// const [address,setAddress] = useState("");
// const [city,setCity] = useState("");
// const [mobile,setMobile] = useState("");

const {custname,email,address,city,phone} = values;

// console.log(phone);
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <br/>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Specify your company or customer name"
                  label="Customer name"
                  name="custname"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select City"
                  name="city"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value="rajkot"
                  
                >
                  {cities.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                 
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  
                />
              </Grid>
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={()=> SendDataToBackEnd()}>
            Save details
          </Button>

        </CardActions>
      </Card>
    </form>
  );
};
