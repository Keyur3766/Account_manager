import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Popover, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const [open, setOpen] = useState(null);

  const { Name, selling_price, purchase_price, item_color, total_stocks, imageType, imageData, imageName } = product;
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  return (
    <>
    <Card>
    
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {(
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            
          </Label>
        )} */}
        
        <StyledProductImg alt={Name} src={`data:${imageType};base64,${imageData}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {Name}
          </Typography>
        </Link>

        <Typography component="span" variant="body1">
          Purchase Price: &nbsp; {purchase_price}
        </Typography>

        <Typography variant="subtitle1">
          Sale Price: &nbsp;
          {fCurrency(selling_price)}
        </Typography>


        
        <Typography variant="subtitle2" >
          Available: &nbsp;
          {total_stocks}
          &nbsp;
        </Typography>
        
      </Stack>
      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
    </Card>
    <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
          
  );
}
