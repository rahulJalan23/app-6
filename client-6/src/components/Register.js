import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Form = () => {
  const classes = useStyles();
  // create state variables for each input
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      username,
      password,
      name,
    };
    const response = await authService.signup(requestData);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    navigate('/dashboard');
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        Register
      </Typography>

      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="filled"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Username"
          variant="filled"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
