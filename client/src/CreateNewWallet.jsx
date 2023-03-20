import { useState, useCallback } from "react";
import server from "./server";

const CreateNewWallet = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const getNewWallet = useCallback(async () => {
    const { data } = await server.get("create-new-wallet");

    setPrivateKey(data.privateKey);
    setPublicKey(data.publicKey);
  }, []);

  return (
    <div>
      <h1>Create New Wallet with some funds (100 tokens)</h1>
      <input type="submit" onClick={getNewWallet} className="button" value="Create" />
      {privateKey && (
        <>
          <h3>Private Key</h3>
          <div>{privateKey}</div>
        </>
      )}
      {publicKey && (
        <>
          <h3>Public Key</h3>
          <div>{publicKey}</div>
        </>
      )}
    </div>
  )
}

export default CreateNewWallet