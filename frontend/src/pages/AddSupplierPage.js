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
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import UserServices from '../services/UserServices';

// import label from 'src/components/label';

const cities = [
  {
    value: 'rajkot',
    label: 'Rajkot',
  },
  {
    value: 'ahmedabad',
    label: 'Ahmedabad',
  },
  {
    value: 'delhi',
    label: 'Delhi',
  },
  {
    value: 'kolkata',
    label: 'Kolkata',
  },
];

export default function AddSupplierPage() {
  const [values, setValues] = useState({
    suppliername: '',
    email: '',
    address: '',
    city: 'Rajkot',
    phone: '',
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const navigate = useNavigate();

  const SendDataToBackEnd = async () => {
    try {
      UserServices.Add_Supplier(suppliername, email, address, city, phone).then((res) => {
        console.log('success');
        
        console.log(res);
        navigate('/dashboard/supplier');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { suppliername, email, address, city, phone } = values;
  

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <br />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Specify  company or Supplier name"
                  label="Supplier name"
                  name="suppliername"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select City"
                  name="city"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.city}
                >
                  {cities.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Email Address" name="email" onChange={handleChange}  />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Phone Number" name="phone" onChange={handleChange} type="number" required/>
              </Grid>
              <Grid xs={12} md={12}>
                <TextField fullWidth label="Address" name="address" onChange={handleChange} required />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" disabled={!suppliername || !phone || !city || !address} onClick={() => SendDataToBackEnd()}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
