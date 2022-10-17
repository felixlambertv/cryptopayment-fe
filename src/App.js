import "./App.css";
import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const [status, setStatus] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const be = "https://jnb4v3dr6g.execute-api.ap-southeast-1.amazonaws.com/dev";
  // const be = "http://localhost:8080";

  async function doPayment() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    setUniqueCode(paymentAmount.substring(paymentAmount.length - 4));
    const signer = provider.getSigner();

    http.req;

    const melAddress = "0x4098224Fe5343BF1702e115EDE343Cc0eFCC01D8";
    const melAbi = [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function balanceOf(address) view returns (uint)",
      "function transfer(address to, uint amount)",
      "event Transfer(address indexed from, address indexed to, uint amount)",
    ];
    const melContract = new ethers.Contract(melAddress, melAbi, provider);

    const signerAddress = await signer.getAddress();
    const balance = await melContract.balanceOf(signerAddress);
    const transferAmount = ethers.BigNumber.from(paymentAmount);
    await melContract
      .connect(signer)
      .transfer("0x15e976d0e97a0181964ed7b1929b83009311d7fd", transferAmount);
  }

  async function getPaymentStatus() {
    console.log(uniqueCode);
    const response = await axios.get(`${be}/api/v1/payment/${uniqueCode}`);

    console.log(response.data);
    setStatus(response.data.status);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          onChange={(e) => setPaymentAmount(e.target.value)}
        ></input>
        <button onClick={doPayment}>TRF</button>
        <button onClick={getPaymentStatus}>Update</button>
        <p>{status}</p>
      </header>
    </div>
  );
}

export default App;
