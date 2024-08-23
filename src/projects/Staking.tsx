import { useAddress, useContract,useContractMetadata, useContractRead, useOwnedNFTs, useTokenBalance, Web3Button } from "@thirdweb-dev/react"
import { erc20_addresss, erc721_addresss, erc_staking_addresss } from "../constants/adrresses"
import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import StakedNFT from "../components/StakedNFTs"
import { useReadContract } from "thirdweb/react"
import StakedNFTCard from "../components/StakedNFTcard"



const Staking = () => {
    const {contract} = useContract(erc_staking_addresss)
  const {data, isLoading,} = useContractMetadata(contract)
  const {contract: erc20addy} = useContract(erc20_addresss)
  const [claimableRewards, setClaimableRewards] = useState<BigNumber | null>(null)
  const {contract: erc721con} = useContract(erc721_addresss)

  const address = useAddress()
  const {data: tokenBalance, isLoading: balanceLoading} = useTokenBalance(erc20addy, address)
  const {data: nftsOwned, isLoading: loadingnftsowned} = useOwnedNFTs(erc721con, address)
  const {data: stakedTokens, isLoading: stakeTokensLoading} = useContractRead(contract,"getStakeInfo", [address])

  useEffect(()=>{
    if(!contract || !address) return

    async function getClaimableRewards(){
      const claimableRewards = await contract?.call("getStakeInfo", [address])
      setClaimableRewards(claimableRewards[1])
    }


    getClaimableRewards()
  }, [address, contract, claimableRewards])
  


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

      <section className="stats ">
        <div className="box claim-div">
            <h2>Token Stats</h2>
            <p><strong>{balanceLoading ? "Loading" : `${parseFloat(tokenBalance?.displayValue ?? "0.0000").toFixed(4)} ${tokenBalance?.symbol}`}</strong></p>
            <p>Reward: <strong>
              {claimableRewards
                ? parseFloat(ethers.utils.formatEther(claimableRewards)).toFixed(4)
                : "0.0000"}
            </strong></p>
            <Web3Button contractAddress={erc_staking_addresss} action={(contract) => contract.call("claimRewards")}
              onSuccess={()=>{
                alert("reward claimed")
                setClaimableRewards(ethers.constants.Zero)
              }}
              isDisabled = {!claimableRewards || claimableRewards.isZero()}
              >Claim Rewards</Web3Button>
        </div>
        <div className="box stake-div">
            <h2>Unstaked NFTS</h2>
            

            {loadingnftsowned ? (<p>Loading...</p>):
            (
              nftsOwned && nftsOwned.length > 0 ? (
              nftsOwned.map((nft, index)=>{
                return <div key={index} className="staked">
                  <StakedNFT nft={nft}/>
                </div>
              })
              ):
              (<p>No NFTs owned</p>)
            )}
            
        </div>
        <div className="box staked-div">
            <h2>Staked NFTs</h2>
            <div className="stake-btn">
                {stakeTokensLoading ? (<p>Loading...</p>):(
                  (stakedTokens && stakedTokens[0]?.length > 0) ? (
                    stakedTokens[0].map((stakedToken: BigNumber, index: number)=>{
                      return <div key={index} className="staked">
                        <StakedNFTCard tokenId={stakedToken.toNumber()}/>
                      </div>
                    })
                  ):(
                    <p>No nfts staked</p>
                  )
                )}
            </div>
        </div>
      </section>
    </div>
  )
  )
}

export default Staking
