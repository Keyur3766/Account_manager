import { useCallback, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  OutlinedInput,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

export default function AddCustomerPage() {
  const [values, setValues] = useState("");
  const [fileState,setFiles] = useState("");
  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleFileChange = useCallback((event)=>{
    setFiles({itemImage: event.target.files[0]})    
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);
  const navigate = useNavigate();


  const SendDataToBackEnd = async () => {
    // const formData = new FormData();
    // formData.append('file', fileState.itemImage)
    try {
      UserServices.Add_Item(product_name,purchase_price,selling_price,item_color,stock_available,fileState.itemImage).then((res) => {
        console.log('success');
        console.log(res);
        // navigate('/dashboard/user');
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(fileState.itemImage);
  const { product_name, purchase_price, selling_price, item_color, stock_available } = values;

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit} encType="multipart/form-data">
      <Card>
        <CardHeader subheader="The information can be edited" title="Add Item" />
        <br />

        <Button sx={{ m: 2 }} onChange={handleFileChange} variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" name="file" required />
        </Button>

        <CardContent sx={{ m: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Enter Product Name here"
                  name="product_name"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Color  (optional)"
                  name="item_color"
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid xs={12} md={6}>
                <FormControl fullWidth sx={{ m: 0 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Purchase Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={handleChange}
                    label="Purchase Price"
                    name="purchase_price"
                    type="number"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth sx={{ m: 0 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Selling Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={handleChange}
                    label="Selling Price"
                    name="selling_price"
                    type="number"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Total stocks available" name="stock_available" onChange={handleChange} type="number" required />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            disabled={!product_name || !purchase_price || !selling_price || !stock_available || !fileState}
            onClick={() => SendDataToBackEnd()}
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
