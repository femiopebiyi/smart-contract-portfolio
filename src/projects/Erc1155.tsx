import { ThirdwebNftMedia, useAddress, useConnectionStatus, useContract, useContractMetadata, useOwnedNFTs, useTotalCirculatingSupply, useTotalCount, Web3Button } from "@thirdweb-dev/react"
import { erc1155_addresss } from "../constants/adrresses"
import { Link } from "react-router-dom"


const Erc_1155 = () => {
  const {contract} = useContract(erc1155_addresss)
const address = useAddress()
  const {data, isLoading,} = useContractMetadata(contract)
  const connectionStatus = useConnectionStatus();

  const {data: contractNFTSupply, isLoading: contractNFTSupplyIsLoading} = useTotalCount(contract)

  const {data: totalCirculatingSupply, isLoading: totalCirculatingSupplyLoading} = useTotalCirculatingSupply(contract,0)

  const {data: ownedNfts, isLoading: ownedNFTsIsLoading} = useOwnedNFTs(contract, address)
    return(

        isLoading ? (
    <div className="loading">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="erc1155">
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
            <h2>Claim ERC1155</h2>
            <p>Claim an ERC1155 NFT for for 10 ERC20 tokens(ABEFE)</p>
            <Web3Button contractAddress={erc1155_addresss} action={(contract)=>contract.erc1155.claim(2,1)} onSuccess={()=>{alert("NFT claimed")}} className="claim-1155">Claim NFT</Web3Button>
            
        </div>
        <div className="box">
            <h2>Contract Stats</h2>
            <p>Total NFTs: <strong>{contractNFTSupplyIsLoading ? "Loading...": contractNFTSupply?.toNumber()}</strong></p>
            <p>Total Circulating Supply: <strong>{totalCirculatingSupplyLoading ? "Loading...": totalCirculatingSupply?.toNumber()}</strong></p>
            
        </div>
        <div className="box">
            <h2>Your NFTs</h2>
            {connectionStatus !== "connected" ? "Connect Wallet to View" : ownedNFTsIsLoading ? (<p>Loading...</p>):(
          ownedNfts?.map((nft)=> {
            return <p key={nft.metadata.id}>{nft.metadata.name} Owned: {nft.quantityOwned}</p>
          })
          ) }
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
            <button className="stake-nft" disabled>{nft.quantityOwned} of this owned</button>
            </Link>
              
            </div>
          })
          ) }
      </div>}
      </div>
  )
  
    )
}

export default Erc_1155
