import { Card, CardContent, Grid, Typography } from "@material-ui/core";

export default function Balances({ balances, onClick }) {
  
  return (
    <Grid container spacing={2}>
      {balances.map(({ token, qty }) => (
        <Grid item style={{ cursor: "pointer" }} onClick={() => onClick(token)}>
          <Card>
            <CardContent>
              <Typography variant="h4" >{token}</Typography>
            </CardContent>
            <CardContent>
              <Typography >{qty}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}