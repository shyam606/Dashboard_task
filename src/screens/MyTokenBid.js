import * as AntdComponents from 'antd'
import React from 'react'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { HiMiniCurrencyDollar } from 'react-icons/hi2'
import { IoChevronDownSharp } from 'react-icons/io5'
import { MdCurrencyRupee } from 'react-icons/md'
import { useBuyCoinsMutation } from '../services/apiSlices/TokenSlice'
import { toast } from 'react-toastify'

const MyTokenBid = () => {
    const [buttonState, setButtonState] = React.useState('Token')
    const [buyToken, { isLoading, isSuccess }] = useBuyCoinsMutation()
    const handleSubmit = () => {
        let payload = {
            "userid": 1015,
            "qty": 1,
            "unit_amount": 250,
            "amount": 18000,
            "goldBalance": true,
            "accountBalance": false,
            "submittype": buttonState === 'Token' ? 'buy' : "Bid" // “Bid” for bid and buy for “Buy"
        }
        buyToken(payload)
    }
    React.useEffect(() => {
        if (isSuccess){
            toast.success('Token Buy Successfully')
        }
    }, [isSuccess])
    return (
        <div className='common_background min-h-96 p-5'>
            <div className='flex justify-end'>
                <div className='yellow_gradient rounded-lg flex items-center py-2 px-4 w-fit'>
                    <HiMiniCurrencyDollar color={'var(--Yellow)'} size={20} />
                    <AntdComponents.Typography className='font-bold text-md'>My Token</AntdComponents.Typography>
                </div>
            </div>
            <div>
                <AntdComponents.Typography className='font-semibold text-lg text-White'>Live Gold Price</AntdComponents.Typography>
                <AntdComponents.Typography className='text-TextYellow font-semibold'>$20990/Per 250 Gram</AntdComponents.Typography>
            </div>
            <div className='mt-4'>
                <AntdComponents.Typography className='font-semibold text-lg text-White'>Token Price</AntdComponents.Typography>
                <AntdComponents.Typography className='text-TextYellow font-semibold'>$2000</AntdComponents.Typography>
            </div>
            {/* buttons */}
            <div className='bg-White h-10 rounded-full flex justify-between py-1 px-1 mt-5'>
                <AntdComponents.Button type='ghost' className={`${buttonState === 'Token' ? 'yellow_gradient' : 'bg-Grey'} font-semibold rounded-full`} onClick={() => setButtonState('Token')}>BUY Token</AntdComponents.Button>
                <AntdComponents.Button type='ghost' className={`${buttonState === 'Bidding' ? 'yellow_gradient' : 'bg-Grey'} font-semibold rounded-full`}
                    onClick={() => setButtonState('Bidding')}>Bidding</AntdComponents.Button>
            </div>
            {/*  AICG Box*/}
            <div className='border-2 border-White rounded-lg mt-5 p-2 h-24'>
                <AntdComponents.Typography className='font-bold text-White'>AICG</AntdComponents.Typography>
                <AntdComponents.Typography className='font-bold text-White text-xl mt-5'>0</AntdComponents.Typography>
            </div>
            <div className='flex items-center justify-center gap-3 mt-4'>
                <div className='bg-Yellow w-fit rounded-full'>
                    <CgArrowsExchangeV color='var(--defaultWhiteColor)' size={25} />
                </div>
                <AntdComponents.Typography className='text-White font-semibold'>1 Token = 250 Gold Gram Gold</AntdComponents.Typography>
            </div>
            {/*  AMOUNT Box*/}
            <div className='border-2 border-White rounded-lg mt-5 p-2 h-24'>
                <div className='flex justify-between items-center'>
                    <AntdComponents.Typography className='font-bold text-White'>Amount</AntdComponents.Typography>
                    <div className='border border-White px-3 rounded-lg  py-1 flex gap-2'>
                        <HiMiniCurrencyDollar color={'var(--Yellow)'} size={20} />
                        <AntdComponents.Typography className='text-White font-semibold'> USD</AntdComponents.Typography>
                    </div>
                </div>
                <AntdComponents.Typography className='font-bold text-White text-xl mt-5'>0</AntdComponents.Typography>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <AntdComponents.Checkbox><span className='text-White'>Use Gold Balance</span></AntdComponents.Checkbox>
                <AntdComponents.Checkbox><span className='text-White'>Use Account Balance</span></AntdComponents.Checkbox>
            </div>
            {/* submit button */}
            <div className='text-center mt-8 mb-6'>
                <AntdComponents.Button loading={isLoading} type='ghost' className='yellow_gradient px-14 py-5 text-lg font-semibold'
                    onClick={() => handleSubmit()}
                >Buy Now</AntdComponents.Button>
            </div>
            {/*  */}
            <div className='flex items-center gap-3 justify-between'>
                <div className='w-full'>
                    <AntdComponents.Typography className='text-White font-semibold'>Select Duration</AntdComponents.Typography>
                    <AntdComponents.Select
                        className='w-full mt-1'
                        value={'15_days'}
                        options={[
                            {
                                value: '15_days',
                                label: '15 Days',
                            }
                        ]}
                        suffixIcon={<IoChevronDownSharp color={'var(--defaultWhiteColor)'} />}
                    />
                </div>
                <div className='w-full mt-2'>
                    <AntdComponents.Typography className='text-White font-semibold'>Select Currency</AntdComponents.Typography>
                    <div className='border-2 border-White flex items-center justify-center rounded-md h-10 mt-1'>
                        <AntdComponents.Typography className='text-White'>INR</AntdComponents.Typography>
                        <MdCurrencyRupee color={'var(--defaultWhiteColor)'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyTokenBid