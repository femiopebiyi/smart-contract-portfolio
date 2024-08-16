import { useAddress, useContract, useContractMetadata, useOwnedNFTs, useTotalCirculatingSupply, useTotalCount, Web3Button } from "@thirdweb-dev/react"
import { erc1155_addresss } from "../constants/adrresses"


const Erc_1155 = () => {
  const {contract} = useContract(erc1155_addresss)
const address = useAddress()
  const {data, isLoading,} = useContractMetadata(contract)

  const {data: contractNFTSupply, isLoading: contractNFTSupplyIsLoading} = useTotalCount(contract)

  const {data: totalCirculatingSupply, isLoading: totalCirculatingSupplyLoading} = useTotalCirculatingSupply(contract,0)

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
            <h2>Claim ERC1155</h2>
            <p>Claim an ERC1155 NFT for for 10 ERC20 tokens(ABEFE)</p>
            <Web3Button contractAddress={erc1155_addresss} action={(contract)=>contract.erc1155.claim(0,1)}>Claim NFT</Web3Button>
            
        </div>
        <div className="box">
            <h2>Contract Stats</h2>
            <p>Total NFTs: <strong>{contractNFTSupplyIsLoading ? "Loading...": contractNFTSupply?.toNumber()}</strong></p>
            <p>Total Circulating Supply: <strong>{totalCirculatingSupplyLoading ? "Loading...": totalCirculatingSupply?.toNumber()}</strong></p>
            
        </div>
        <div className="box">
            <h2>Your NFTs</h2>
            {ownedNFTsIsLoading ? (<p>Loading...</p>):(
          ownedNfts?.map((nft)=> {
            return <p key={nft.metadata.id}>TokenId{nft.metadata.id} Owned: {nft.quantityOwned}</p>
          })
          ) }
        </div>
      </section>

      <div className="nft-title"><h1>My NFTs:</h1></div>

      <div className="mynfts">
        
      </div>
      </div>
  )
  
    )
}

export default Erc_1155
