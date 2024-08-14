import ContractCard from "../components/ContractCard"
import { contractDetails } from "../constants/contractDetails"

const Home = () => {
  return (
    <div>
    Femi is home!

    <div className="card-container">
        {contractDetails.map((detail, index)=>{
            return <ContractCard title={detail.title} description={detail.description} address={detail.contractAddress} key={index} href={detail.href}/>
        })}
    </div>
    </div>
  )
}

export default Home
