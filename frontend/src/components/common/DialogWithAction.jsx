import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";

export default function DialogAction({
  open,
  title,
  content,
  buttonDisabled = false,
  onClick,
  buttonLabel,
  errorMessage
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={buttonDisabled}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </DialogActions>
      {errorMessage && (
        <DialogContent>
          <Typography style={{ color: "red" }}>
            {errorMessage}
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
}
