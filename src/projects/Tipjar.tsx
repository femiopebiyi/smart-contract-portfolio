import { useAddress, useContract, useContractMetadata, useContractRead, Web3Button } from "@thirdweb-dev/react"
import { tipJar_addresss } from "../constants/adrresses"
import { ethers } from "ethers"
import { useState } from "react"


const Tipjar = () => {
  const {contract, isLoading} = useContract(tipJar_addresss)
  const {data, isLoading: isMetadataLoading,} = useContractMetadata(contract)
  const {data: tipJarBal, isLoading: balanceLoading} = useContractRead(contract, "getBalance")
  const [tip, setTip] = useState<string>("")
  const address = useAddress()

  const {data: owner, isLoading: isOwnerLoading} = useContractRead(contract, "owner")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTip(value);
    console.log(value);
  };

  return (
    isLoading ? (
    <div className="loading">
      <p>Loading.......</p>
    </div>
  ) : (
    <div className="erc20">
      <main className="hero">
        <div className="heroimage">
          <img src={data?.image} alt="" />
        </div>

        <div className="hero-deets">
            <h1>{data?.name}</h1>
            <p>{data?.description}</p>
        </div>
      </main>

      <section className="stats">
        <div className="box">
            <h2>Leave a Tip</h2>
            <p>Tip the contract in MATIC</p>
            <div className="tipinput"><Web3Button contractAddress={tipJar_addresss} 
            action={(contract)=> contract.call("tip", [], {
              value: ethers.utils.parseUnits(tip, "ether").toString()
            })} onError={(e)=>{
              if(e.message.includes("user rejected transaction")){
                alert("You rejected the transaction")
              } else if(e.message.includes("missing revert data in call")){
                alert("You might have insufficient balance")
              } else if(e.message.includes("You must send a tip to use this function")){
                alert("Your tip must be greater than 0")
              } else if(e.message.includes("invalid hex string")){
                alert("Your tip must be greater than 0")
              } else if(e.message.includes("invalid decimal value")){
                alert("input a valid number!!")
              }
            }}
            >Tip
            </Web3Button>
            <input type="number" min={0} onChange={handleChange} value={tip}/></div>
            
        
        </div>
        <div className="box">
            <h2>Total Balance in TipJar:</h2>
            <h2 style={{marginTop: "1em"}}><strong>{balanceLoading ? "Loading..." : `${ethers.utils.formatEther(tipJarBal)} MATIC`}</strong></h2>
        </div>
        <div className="box withdraw">
            <h2>Balance Withdrawal</h2>
            {isOwnerLoading ? "Loading..." : owner === address ? (
              <Web3Button contractAddress={tipJar_addresss} action={(contract)=> contract.call("withdrawTip")}>Withdraw Tips</Web3Button>
            ):(
              <p>Only the contract owner can withdraw</p>
            )}
        </div>
      </section>
      
      

    </div>
  )
  )
}

export default Tipjar