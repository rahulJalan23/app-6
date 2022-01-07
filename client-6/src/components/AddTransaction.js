import { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import transService from '../services/transaction';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';

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
  const [amount, setAmount] = useState(0);
  const [party_username, setUsername] = useState('');
  const [type, setType] = useState('paid');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      amount: parseInt(amount),
      party_username,
      type,
    };
    const token = localStorage.getItem('token');
    if (token) {
      console.log(requestData);
      const response = await transService.addTransaction(requestData, token);
      console.log(response);
    } else {
      navigate('/login');
    }
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <>
      <Typography variant="h4" component="h2">
        Add Transaction
      </Typography>

      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          variant="filled"
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          label="Party Username"
          variant="filled"
          required
          value={party_username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="gender"
            value={type}
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
            <FormControlLabel
              value="recieved"
              control={<Radio />}
              label="Recieved"
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
