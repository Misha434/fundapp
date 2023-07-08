import React, { useState, useEffect } from "react";
import GreeterContract from "./contracts/Greeter.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

const App = () => {
  const [state, setState] = useState({ greeting: '', web3: null, accounts: null, contract: null });

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = GreeterContract.networks[networkId];
        const instance = new web3.eth.Contract(
          GreeterContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setState({ web3, accounts, contract: instance });

        console.log(state);

        const response = await instance.methods.greet().call()
        setState(prevState => ({...prevState, greeting: response }));

      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    }
    loadBlockchainData();
  }, [state]);

  const handleGreetingChange = (e) => {
    const inputVal = e.target.value
    setState(prevState => ({...prevState, greeting: inputVal }))
  }

  const formSubmitHandler = async () => {
    const { accounts, contract, greeting } = state;
    await contract.methods.setGreeting(greeting).send({from: accounts[0]});
  }

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <h1>Greeter</h1>
      {state.greeting}
      <form>
        <label>
          New Greeting:
          <input type="text" value={state.greeting} onChange={handleGreetingChange} />
        </label>
      </form>
      <button onClick={formSubmitHandler}> Submit </button>
    </div>
  );
}

export default App;
