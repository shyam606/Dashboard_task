import React from 'react'
import * as AntdComponents from 'antd'

const ProgressBars = ({tokenData}) => {
    return (
        <>
            <div className='common_background p-5'>
                {/* progress 1 */}
                <div className='flex items-center gap-3 w-full mt-8'>
                    <AntdComponents.Typography className='text-White w-1/2'>Total Quantity = {tokenData?.total_allotted_data}</AntdComponents.Typography>
                    <AntdComponents.Progress
                        percent={100}
                        showInfo={false}
                        percentPosition={{
                            align: 'start',
                            type: 'inner',
                        }}
                        size={[300, 20]}
                        trailColor='var(--Grey)'
                        strokeColor="var(--skyBlueDark)"
                        strokeLinecap="butt"
                    />
                </div>
                {/* progress 2 */}
                <div className='flex items-center gap-3 w-full mt-8'>
                    <AntdComponents.Typography className='text-White w-1/2'>Available Token = {tokenData?.AvilableTokenBalace.toFixed(2)}</AntdComponents.Typography>
                    <AntdComponents.Progress
                        percent={(tokenData?.AvilableTokenBalace / tokenData?.total_allotted_data) * 100}
                        showInfo={false}
                        percentPosition={{
                            align: 'start',
                            type: 'inner',
                        }}
                        size={[300, 20]}
                        trailColor='var(--Grey)'
                        strokeColor="var(--Yellow)"
                        strokeLinecap="butt"
                    />
                </div>
                {/* progress 3 */}
                <div className='flex items-center gap-3 w-full mt-8'>
                    <AntdComponents.Typography className='text-White w-1/2'>sold Token = {tokenData?.profitLoss}</AntdComponents.Typography>
                    <AntdComponents.Progress
                        percent={(tokenData?.profitLoss / tokenData?.total_allotted_data) * 100}
                        showInfo={false}
                        percentPosition={{
                            align: 'start',
                            type: 'inner',
                        }}
                        size={[300, 20]}
                        trailColor='var(--Grey)'
                        strokeColor="var(--parrotGreen)"
                        strokeLinecap="butt"
                    />
                </div>
            </div>
            <div className='common_background mt-5 flex items-center gap-10 px-5 py-16'>
                <AntdComponents.Progress
                    strokeLinecap="butt"
                    strokeColor="var(--Yellow)"
                    type="circle"
                    trailColor='var(--Grey)'
                    percent={85}
                    strokeWidth={11}
                    format={() => <span style={{ color: 'white' }}>
                        {Math.round((tokenData?.profitLoss / tokenData?.total_allotted_data) * 100)}%
                    </span>}
                />
                <div>
                    <AntdComponents.Typography className='text-White text-2xl text-center font-bold'>Yaaay!</AntdComponents.Typography>
                    <AntdComponents.Typography className='text-White text-lg'>Average Token Sold</AntdComponents.Typography>
                </div>
            </div>
        </>
    )
}

export default ProgressBars