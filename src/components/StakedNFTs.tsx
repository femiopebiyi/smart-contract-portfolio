import { ThirdwebNftMedia, useAddress, useContract, Web3Button } from "@thirdweb-dev/react"
import { NFT } from "@thirdweb-dev/sdk"
import { erc721_addresss, erc_staking_addresss } from "../constants/adrresses"

type NFTProps = {
        nft: NFT
    }



export default function StakedNFT({nft}: NFTProps){

    const address = useAddress()

    const {contract: erc721con, isLoading: loadingNFT} = useContract(erc721_addresss, "signature-drop")
    const {contract: staking, isLoading: loadingStake} = useContract(erc_staking_addresss)

    async function stakeNFT(nftId: number[]){
        if(!address) return

        const isApproved = await erc721con?.isApproved(address, erc_staking_addresss)

        if(!isApproved){
            await erc721con?.setApprovalForAll(erc_staking_addresss, true)

        }

        await staking?.call("stake", [nftId])
    }

    return (
        <div className="stake-card">
            <ThirdwebNftMedia metadata={nft.metadata}/>
            <div className="nft-infp">
                <h3>{nft.metadata.name}</h3>
                <p>TokenId: {nft.metadata.id}</p>
            </div>

            <Web3Button contractAddress={erc_staking_addresss} action={()=>{ stakeNFT([parseInt(nft.metadata.id)])}}>Stake</Web3Button>
        </div>


    )
}