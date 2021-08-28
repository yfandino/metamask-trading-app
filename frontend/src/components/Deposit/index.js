import { useContext, useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import * as API from "../../api";
import { AppContext } from "../../lib/appContext";

export default function Deposit({ token, onSuccess }) {
  const { account, signature } = useContext(AppContext);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function deposit() {
    API.deposit(signature, account, token, parseInt(amount))
      .then(onSuccess)
      .catch(setError);
  }

  function onChange(e) {
    setAmount(e.target.value)
  }

  if(error) alert(error);
  
  return (
    <Grid container spacing={2} style={{ marginTop: "2rem" }}>
      <TextField
        type="number"
        label="Add token to your account"
        InputProps={{
          startAdornment: <InputAdornment position="start">{token}</InputAdornment>,
        }}
        onChange={onChange}
      />
      <Button type="button" onClick={deposit} variant="contained" color ="primary">Deposit</Button>
    </Grid>
  );
}