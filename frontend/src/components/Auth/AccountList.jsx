import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography
} from "@material-ui/core";
import { useContext, useState } from "react";
import { AuthContext } from "../../lib/authContext";
import { AppContext } from "../../lib/appContext";
import useMetamask from "../../lib/useMetamask";
import { useEffect } from "react";

export default function AccountList() {
  const { web3 } = useMetamask();
  const { accounts } = useContext(AuthContext);
  const { account: selected, setSignature, setAccount } = useContext(AppContext);
  const [error, setError] = useState();

  useEffect(() => {
    if (!selected) return;

    async function sign() {
      try {
        // TO-DO Get message secret from server
        const response = await web3.eth.personal.sign("TEST_SECRET", selected);
        setSignature(response);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    }
    sign();
  }, [selected, setSignature, web3]);

  return (
    <Grid>
      <List
        subheader={<ListSubheader>Your accounts</ListSubheader>}
      >
        {accounts.map((account, i) => (
          <ListItem key={account}>
            <Card>
              <CardHeader title={`Account ${i + 1}`} />
              <CardContent>
                {account}
                {selected === account && (
                  <Typography
                    style={{ color: "red", fontWeight: "bold", fontSize: "0.8rem" }}
                  >
                    {error}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button onClick={() => setAccount(account)}>Select</Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
