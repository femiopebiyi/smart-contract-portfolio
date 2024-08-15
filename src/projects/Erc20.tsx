import { useAddress, useContract, useContractMetadata, useTokenBalance, useTokenSupply, Web3Button, useConnectionStatus } from "@thirdweb-dev/react"
import { erc20_addresss } from "../constants/adrresses"
import { Link } from "react-router-dom"

export default function Erc_20(){
    const {contract} = useContract(erc20_addresss)
  const {data, isLoading,} = useContractMetadata(contract)
  const {data: tokenSupply, isLoading: supplyLoading} = useTokenSupply(contract)
  const address = useAddress()
  const {data: tokenBalance, isLoading: balanceLoading} = useTokenBalance(contract, address)
  const connectionStatus = useConnectionStatus();


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
            <h2>Token Stats</h2>
        
            <p>Total token supply: <strong>{supplyLoading ? "Loading...." : `${tokenSupply?.displayValue} ${tokenSupply?.symbol}`}</strong></p>
            
        </div>
        <div className="box">
            <h2>Total Balance in wallet:</h2>
            <p><strong>{connectionStatus !== "connected" ? "Please Connect Wallet" : (balanceLoading ? "Loading...." : `${tokenBalance?.displayValue} ${tokenSupply?.symbol}`)}</strong></p>
            <Web3Button contractAddress={erc20_addresss} action={(contract)=> contract.erc20.burn(10)} className="burn-btn">Burn 10 Tokens</Web3Button>
        </div>
        <div className="box">
            <h2>Earn Tokens</h2>
            <p>Earn more tokens by staking ERC721 NFT</p>
            <div className="stake-btn">
                <Link to="/staking">
                    <button>Stake ERC721</button>
                </Link>
                <Link to="/Erc721">
                    <button>Claim ERC721</button>
                </Link>
            </div>
        </div>
      </section>
    </div>
  )
);

}