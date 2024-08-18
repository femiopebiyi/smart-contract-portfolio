import { ThirdwebNftMedia, useAddress, useClaimedNFTSupply, useConnectionStatus, useContract, useContractMetadata, useOwnedNFTs, useTotalCount, Web3Button } from "@thirdweb-dev/react"
import { erc20_addresss, erc721_addresss } from "../constants/adrresses"
import { Link } from "react-router-dom"

export default function Erc_721(){
const {contract} = useContract(erc721_addresss)
const address = useAddress()
  const {data, isLoading,} = useContractMetadata(contract)

  const {data: totalSupply, isLoading: totalSupplyLoading}= useTotalCount(contract)
  
  const {data: totalClaimedSupply, isLoading: claimedSupplyLoading} = useClaimedNFTSupply(contract)
  const connectionStatus = useConnectionStatus();

  const {data: ownedNfts, isLoading: ownedNFTsIsLoading} = useOwnedNFTs(contract, address)
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
            <p>Claim an ERC721 NFT for free!!</p>
            <Web3Button contractAddress={erc721_addresss} action={(contract)=>contract.erc721.claim(1)} className="claim-btn" isDisabled = {
              (totalSupply?.toNumber() === totalClaimedSupply?.toNumber()) ? true:false
            } onSuccess={()=>{alert("NFT claimed!")}}>{(totalSupply?.toNumber() === totalClaimedSupply?.toNumber()) ? "Sold Out!!" : "Claim NFT"}</Web3Button>
            
        </div>
        <div className="box">
            <h2>Contract Stats</h2>
            <p>Total Supply: <strong>{totalSupplyLoading ? "Loading...." : totalSupply?.toNumber()}</strong></p>
            <p>Total Claimed: <strong>{claimedSupplyLoading ? "Loading...": totalClaimedSupply?.toNumber()}</strong></p>
            
        </div>
        <div className="box">
            <h2>Your NFTs</h2>
            <p>Total Owned: <strong>{connectionStatus !== "connected" ? "Connect Wallet to View" : ownedNFTsIsLoading ? "Loading...": ownedNfts?.length}</strong></p>
        </div>
      </section>

      {connectionStatus === "connected" && <div className="nft-title"><h1>My NFTs:</h1></div>}

      {connectionStatus === "connected" && <div className="mynfts">
        {ownedNFTsIsLoading ? (<p>Loading...</p>):(
          ownedNfts?.map((nft)=> {
            return <div className="nft-card" key={nft.metadata.id}>
              <div className="nft-img-con">
            <ThirdwebNftMedia metadata={nft.metadata}/>
              </div>
              <h2>{nft.metadata.name}</h2>
            <Link to= "/staking">
            <button className="stake-nft">Stake NFT</button>
            </Link>
              
            </div>
          })
          ) }
      </div>}
      </div>
  )
  
    )
}