import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListSubheader, TextField
} from "@material-ui/core";
import { useContext, useState } from "react";
import { AuthContext } from "../../lib/authContext";
import useMetamask from "../../lib/useMetamask";
import DialogWithAction from "../common/DialogWithAction";

export default function AccountList() {
  const { web3 } = useMetamask();
  const { accounts } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState();
  const [error, setError] = useState();

  async function sign() {
    try {
      const response = await web3.eth.personal.sign(message, selected, 'test');
      console.log(response);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <Grid>
      <List
        subheader={<ListSubheader>Your accounts</ListSubheader>}
      >
        {accounts.map((account, i) => (
          <ListItem key={account}>
            <Card>
              <CardHeader title={`Account ${i + 1}`} />
              <CardContent>{account}</CardContent>
              <CardActions>
                <Button onClick={() => setSelected(account)}>Select</Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
      <DialogWithAction
        open={!!selected}
        title={`Selected account ${selected}`}
        content={
            <TextField
            label="Message"
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        }
        buttonLabel="Send"
        onClick={sign}
        errorMessage={error}
      />
    </Grid>
  );
}
