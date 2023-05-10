import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import UserServices from '../../../services/UserServices';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const sendDataForValidation = async() => {
    try{
      UserServices.GenerateLoginToken(email, password).then((res)=>{
        if(res.status===200){
          console.log(res);
          console.warn("success");
          navigate('/dashboard', { replace: true });
        }
        if(res.status===400){
          console.warn("UserName or password is incorrect");
        }
      })
      .catch((error)=>{
          navigate('/login');
      })
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        <TextField name="email" onChange={(e)=> setEmail(e.target.value)} value={email} label="Email address" />

        <TextField
          name="password"
          label="Password"
          onChange={(e)=> setPassword(e.target.value)} value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={sendDataForValidation}>
        Login
      </LoadingButton>
    </>
  );
}
