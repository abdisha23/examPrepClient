import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Button, IconButton, InputAdornment, ThemeProvider, createTheme, CssBaseline, GlobalStyles, styled } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../features/user/userSlice';

// Custom styles for buttons
const CustomButton = styled(Button)({
  background: '#4CAF50', // Green background
  color: 'white', // White text
  '&:hover': {
    background: '#45A049', // Dark green on hover
  },
});

// Custom styles for the "Forgot Password" button
const ForgotPasswordButton = styled(Button)({
  width: '100%',
  fontSize: '0.5rem', // Adjust font size as needed
  padding: '4px', // Increase padding for larger appearance
  marginTop: '10px', // Add margin for spacing
  background: '#1976d2', // Blue background
  color: 'white', // White text
  '&:hover': {
    background: '#1565c0', // Dark blue on hover
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#C6B2CE',
    },
    secondary: {
      main: '#99C4E0',
    },
    background: {
      default: '#f0f0f0',
    },
  },
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showIncorrectDialog, setShowIncorrectDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address!')
      .required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const { isSuccess } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isSuccess) {
      // window.location.reload();
      navigate('/');
    } else {
      navigate('');
    }
  }, [isSuccess]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          backgroundColor: theme.palette.background.default,
        },
      }} />
      <Container maxWidth="sm" style={{ marginTop: '70px', marginBottom: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton variant="contained" fullWidth type="submit">Login</CustomButton>
            </Grid>
            <Grid item xs={12}>
              <ForgotPasswordButton color="inherit" variant="outlined" component={Link} to="/forgot-password">
                Forgot Password
              </ForgotPasswordButton>
            </Grid>
            <Grid item xs={12}>
              <Button color="inherit" variant="outlined" fullWidth component={Link} to="/student">Sign Up</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
