import React from 'react'
import * as AntdComponents from 'antd'
import { IoChevronDownSharp } from 'react-icons/io5'
import { HiMiniCurrencyDollar } from 'react-icons/hi2'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MyTokenBid from './MyTokenBid'
import { useGetGoldPriceQuery, useGetTokenGraphDataMutation, useGetTokenGraphPriceQuery } from '../services/apiSlices/GraphSlice'

const filterButton = [
    {
        text: '1w',
        value: '1w'
    },
    {
        text: '1h',
        value: '1h'
    },
    {
        text: '3h',
        value: '3h'
    },
    {
        text: '1d',
        value: '1d'
    },
    {
        text: '1m',
        value: '1m'
    },
]
const GoldPriceOvertime = () => {
    const [selectTab, setSelectTab] = React.useState('1m')
    const [currency, setCurrency] = React.useState('USD')
    // gold price
    const { data,isLoading:goldPriceLoading } = useGetGoldPriceQuery({
        params: { duration: selectTab, currency: currency },
    }, {
        skip: false,
        refetchOnMountOrArgChange: true
    })
    // token price
    const { data: tokenPrices,isLoading:tokenpriceLoading } = useGetTokenGraphPriceQuery({
        params: { user_id: 1029 ,refreshKey:selectTab},
    }, {
        skip: false,
        refetchOnMountOrArgChange: true
    })
    let filterData = tokenPrices?.dataPoints?.filter((data) => data?.date == '2025-01-18')
    console.log('>>tokenPrices', tokenPrices, filterData);

    //   gold price
    const mainData = data?.dataPoints
    const categories = mainData?.map(item => item?.label);
    const goldPriceData = mainData?.map(item => item?.y);

    // token prices
    const tokenPriceData = mainData?.map(gold => {
        const matchedToken = tokenPrices?.dataPoints?.find(token => token?.date === gold?.label);
        return matchedToken ? gold?.y + matchedToken?.coinprice : null;
    })
    const mainTokenPricedata = tokenPriceData?.filter((data)=>data!=null)
   
    console.log('tokenPriceData',mainTokenPricedata);
    
    const options = {
        chart: {
            type: 'area',
            borderRadius: 15,
            spacing: [10, 10, 10, 10],
            width: null,
            backgroundColor: 'transparent',
        },
        title: { text: '' },
        xAxis: {
            categories: categories,
            accessibility: {
                description: 'Months of the year'
            },
            lineColor: 'var(--defaultWhiteColor)',
            labels: {
                style: {
                    color: 'var(--defaultWhiteColor)',
                    fontSize: '0.9rem'
                }
            },
        },
        plotOptions: {
            area: {
                lineWidth: 2,
                marker: {
                    lineWidth: 1,
                },
            },
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },
        yAxis: {
            title: { text: '' },
            labels: {
                format: '{value}',
                style: {
                    color: 'var(--defaultWhiteColor)',
                    fontSize: '0.9rem',
                }
            },
            gridLineWidth: 0,
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [
            {
                name: 'Gold Price',
                data: goldPriceData,
                lineColor: 'var(--defaultWhiteColor)',
                fillColor: 'transparent',
                marker: {
                    lineWidth: 2,
                    lineColor: 'transparent',
                    fillColor: '#fff'
                },
            },
            {
                name: 'Token Price',
                data: mainTokenPricedata,
                lineColor: 'var(--parrotGreen)',
                fillColor: 'transparent',
                marker: {
                    lineWidth: 2,
                    lineColor: 'transparent',
                    fillColor: '#fff'
                },
            },
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 900
                },
                chartOptions: {
                    yAxis: {
                        labels: {
                            style: { fontSize: '0.8rem' }
                        }
                    },
                    xAxis: {
                        labels: {
                            style: { fontSize: '0.8rem' }
                        }
                    },
                    chart: {
                        spacing: [5, 5, 5, 5]
                    },
                }
            }]
        }
    };

    return (
        <div className='mt-5'>
            <AntdComponents.Row gutter={[20, 20]}>
                <AntdComponents.Col xs={24} sm={24} md={24} lg={18} xl={18}>
                    <div className='common_background h-full py-16 px-8'>
                        {/* header */}
                        <div className='flex items-center justify-between'>
                            <AntdComponents.Select
                                value={'gold_price'}
                                options={[
                                    {
                                        value: 'gold_price',
                                        label: 'GOLD PRICE',
                                    }
                                ]}
                                suffixIcon={<IoChevronDownSharp color={'var(--defaultWhiteColor)'} />}
                            />
                            <AntdComponents.Typography className='text-White text-lg font-semibold'>Gold Prices Overtime</AntdComponents.Typography>
                            <AntdComponents.Select
                                value={'usd'}
                                options={[
                                    {
                                        value: 'usd',
                                        label: 'USD',
                                    }
                                ]}
                                onChange={(value) => setCurrency(value)}
                                suffixIcon={<IoChevronDownSharp color={'var(--defaultWhiteColor)'} />}
                                prefix={<HiMiniCurrencyDollar color={'var(--Yellow)'} size={20} />}
                            />
                        </div>
                        {/* filter buttons */}
                        <div className='flex items-center justify-end gap-4 mt-16'>
                            {
                                filterButton?.map((item, index) => {
                                    let isActive = selectTab === item?.value
                                    return (
                                        <div key={index} className={`border border-White px-3 rounded-xl cursor-pointer ${isActive && 'yellow_gradient'}`} onClick={() => setSelectTab(item?.value)}>
                                            <AntdComponents.Typography className={`text-center ${isActive ? 'text-Black' : 'text-White'}`}>{item?.text}</AntdComponents.Typography>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* graph */}
                        <div className='mt-16'>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                containerProps={{ className: 'areaChart' }}
                            />
                        </div>
                    </div>
                </AntdComponents.Col>
                <AntdComponents.Col xs={24} sm={24} md={24} lg={6} xl={6}>
                    <MyTokenBid />
                </AntdComponents.Col>
            </AntdComponents.Row>
        </div>
    )
}

export default GoldPriceOvertime