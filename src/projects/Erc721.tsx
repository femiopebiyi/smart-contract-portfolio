import { useClaimedNFTSupply, useContract, useContractMetadata, useTotalCount, Web3Button } from "@thirdweb-dev/react"
import { erc20_addresss, erc721_addresss } from "../constants/adrresses"

export default function Erc_721(){
const {contract} = useContract(erc721_addresss)
  const {data, isLoading,} = useContractMetadata(contract)

  const {data: totalSupply, isLoading: totalSupplyLoading}= useTotalCount(contract)
  
  const {data: totalClaimedSupply, isLoading: claimedSupplyLoading} = useClaimedNFTSupply(contract)
    return(

        isLoading ? (
    <div className="loading">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="erc721">
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
            <h2>Claim ERC721</h2>
            <p>claim an ERC721 nft for free!!</p>
            <Web3Button contractAddress={erc721_addresss} action={(contract)=>contract.erc721.claim(1)} >Claim NFT</Web3Button>
            
        </div>
        <div className="box">
            <h2>contract stats</h2>
            <p>Total Supply: <strong>{totalSupplyLoading ? "Loading...." : totalSupply?.toNumber()}</strong></p>
            <p>Total Claimed: <strong>{claimedSupplyLoading ? "Loading...": totalClaimedSupply.toNumber()}</strong></p>
            
        </div>
        <div className="box">
            <h2>Earn Tokens</h2>
            <p>Earn more tokens by staking ERC721 NFT</p>
            <div className="stake-btn">
                
            </div>
        </div>
      </section>
      </div>
  )
  
    )
}