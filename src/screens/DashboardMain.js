import React from 'react'
import QuantityTopSection from './QuantityTopSection'
import GoldPriceOvertime from './GoldPriceOvertime'
import LastComp from './LastComp'
import { useGetTokenDataMutation } from '../services/apiSlices/TokenSlice'

const DashboardMain = () => {
  const [getTokenData,{data:tokenData}] = useGetTokenDataMutation()

  React.useEffect(()=>{
    let payload ={
      'userid':1015
    }
    getTokenData(payload)
  },[])
  return (
    <div className='common_container py-5'>
        <QuantityTopSection tokenData={tokenData}/>
        <GoldPriceOvertime />
        <LastComp tokenData={tokenData}/>
    </div>
  )
}

export default DashboardMain