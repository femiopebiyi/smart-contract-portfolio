import { useContract, useContractMetadata } from "@thirdweb-dev/react";

import { Link } from "react-router-dom";
import { MediaRenderer } from "thirdweb/react";
import { client } from "../client";


type ContractCardType = {
  title: string;
  address: string;
  description: string
  href: string;
}

const ContractCard = (props: ContractCardType) => {
  const {address,description,title, href} = props
  const {contract} = useContract(address)
  const {data, isLoading,} = useContractMetadata(contract)

  
  return (
    <Link to={`/${href}`}>
    <div className="card">
      <div className="image">
        <img  src={data?.image} className="media" />
      </div>
      <div className="deets">
        <h1>{data?.name}</h1>
        <p>{description}</p>
      </div>
    </div>
    </Link>
  )
}

export default ContractCard
