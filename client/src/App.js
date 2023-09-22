import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";

import treePlantingContract from "./contracts/TreePlantingContract.json";

function App() {
  const [account, setAccount] = useState(0);


  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [treeSpecies, setTreeSpecies] = useState("");
  const [plantingDate, setPlantingDate] = useState("");


  const treeAddress = treePlantingContract.networks["5777"].address;

  const treeABI = treePlantingContract.abi;

  // const parsecontract = JSON.parse(JSON.stringify(contract_abi))

  const HttpProvider = "http://127.0.0.1:7545";
  // const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  const web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));

  const treeData = new web3.eth.Contract(treeABI, treeAddress);

  let accountmeta = 0;

  useEffect(() => {
    main();
    ethEnabled();
    // getcontract();
  }, []);

  const main = async () => {
    const accounts = await web3.eth.getAccounts();
    accountmeta = accounts[0];
    setAccount(accountmeta);
    console.log(account);
  };


  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      console.log("metamask exist");
      return true;
    }
    console.log("metamask not exist");
    return false;
  };


  const treeplantHandler = async () => {
    await treeData.methods
      .addTreePlantingEvent(latitude, longitude, treeSpecies, plantingDate)
      .send({
        from: account,
        gasPrice: "1000000000", // Replace with an appropriate gas price
        gas: 200000, // Replace with an appropriate gas limit
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {account}
      
      
       
        <br />
        <input
          type="string"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        ></input>
        <input
          type="string"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        ></input>{" "}
        <input
          type="string"
          value={treeSpecies}
          onChange={(e) => setTreeSpecies(e.target.value)}
        ></input>{" "}
        <input
          type="string"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
        ></input>
        <button onClick={treeplantHandler}> treeplantHandler</button>
      </header>
    </div>
  );
}

export default App;
