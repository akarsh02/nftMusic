import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useUser } from "../../context/userContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userCTX, connectWalletCTX } = useUser();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install Metamask Wallet");
        return;
      }

      const accounts: any = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      if (accounts[0]) {
        connectWalletCTX({ address: accounts[0] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center ">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="font-semibold text-2xl">Wallet not connected</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Connect Metamask and choose Polygon Mumbai network.
          </Typography>
          <button className="profileButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        </Box>
      </Modal>
    </div>
  );
}
