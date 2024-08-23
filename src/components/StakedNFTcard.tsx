import { MediaRenderer, ThirdwebNftMedia, useAddress, useContract, useNFT, Web3Button } from "@thirdweb-dev/react"
import { erc721_addresss, erc_staking_addresss } from "../constants/adrresses"

type NFTProps = {
        tokenId: number;
    }

export default function StakedNFTCard({tokenId}: NFTProps ){

    
const address = useAddress()

    const {contract: erc721con, isLoading: loadingNFT} = useContract(erc721_addresss, "signature-drop")
    const {contract: staking, isLoading: loadingStake} = useContract(erc_staking_addresss)

    const {data: nftMetadata, isLoading: nftmetadataLoading} = useNFT(erc721con, tokenId)
    

    return (
        <div>
            
        <MediaRenderer src={nftMetadata?.metadata.image}/>
            <div>
                <p>{nftMetadata?.metadata.name}</p>
                <p>TokenId: {nftMetadata?.metadata.id}</p>

            </div>

            <Web3Button contractAddress={erc_staking_addresss} action={(contract)=>{contract.call(
                "withdraw",
                [[tokenId]]
            )}}>Unstake</Web3Button>
        </div>
    )
}