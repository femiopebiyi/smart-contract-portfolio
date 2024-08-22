import { useAddress, useContract, useContractMetadata, useContractRead, Web3Button } from "@thirdweb-dev/react"
import { profileStatus_addresss } from "../constants/adrresses"
import { useState } from "react"



const Profile = () => {

  const {contract} = useContract(profileStatus_addresss)
const address = useAddress()
const {data, isLoading, isError} = useContractMetadata(contract)
const {data: userStatus, isLoading: statusLoading} = useContractRead(contract, "getStatus", [address])
const {data: currentStatus, isLoading: currentstatusLoading} = useContractRead(contract, "userCurrentStatus", [address])
const [status, setStatus]  = useState("")

async function updateStatus() {
  if(!currentStatus.exists){
    await contract?.call("createStatus", [status])
    setStatus("")
    return;

  }

  await contract?.call("updateStatus", [status])
  setStatus("")
}

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
            <h2>Current Status</h2>
            <p>{userStatus}</p>
            
        </div>
        <div className="box">
            <h2>Update Status</h2>
            <input type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            />
            <Web3Button contractAddress={profileStatus_addresss} action={updateStatus}>updateStatus</Web3Button>
            
        </div>
        <div className="box two-btn">
            <h2>Status Exists</h2>
            <p>{`${currentStatus}`}</p>
            
        </div>
      </section>
    </div>
  )
  )
}

export default Profile
