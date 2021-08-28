import { useState, useContext, useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import * as API from '../../api';
import { AppContext } from "../../lib/appContext";
import Balances from "../Balances";
import Deposit from "../Deposit";

export default function TradingView() {
  const { account, signature } = useContext(AppContext);
  const [balances, setBalances] = useState();
  const [selected, setSelected] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    API.getBalances(signature, account)
      .then(setBalances)
      .catch(e => setError(e.message));
    // eslint-disable-next-line
  }, []);

  if (!balances) return <Grid container justifyContent="center"><CircularProgress /></Grid>
  if (error) alert(error);

  // TO-DO build tabs and components
  return (
    <>
      <Balances balances={balances} onClick={setSelected} />
      {selected && <Deposit token={selected} onSuccess={setBalances} />}
    </>
  );
}