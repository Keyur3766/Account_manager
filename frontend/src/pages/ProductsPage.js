import { Helmet } from 'react-helmet-async';
import { useState, useEffect   } from 'react';
// @mui
import { NavLink as RouterLink } from 'react-router-dom';
import { Container, Stack, Typography, Button} from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';
import UserServices from '../services/UserServices';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Getting items from Backend
  const [data, setData] = useState("");
  const getItemsData = async() => {
    UserServices.FetchItems().then((res)=>{
      setData(res.data);
    });
  };
  
  const PRODUCTDATA = Array.from(data);
  console.log(typeof(PRODUCTDATA));
  // console.log(PRODUCTDATA);


  useEffect(()=>{
    getItemsData();
  },[]);
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <Container>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography> 
          <Button component={RouterLink} to="/dashboard/AddProduct" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Product
          </Button>
        </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTDATA} callback={()=>getItemsData()} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
