import React from 'react'
import * as AntdComponents from 'antd'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ProgressBars from './ProgressBars';
const LastComp = ({tokenData}) => {
    const QuantityData = {
        chart: {
            type: "pie",
            height:250,
            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                depth: 40,
                edgeWidth: 0,
                borderColor: "transparent",
                size: "100%",
                startAngle: 70,
                dataLabels: {
                    enabled: true,
                    distance: -30,
                    formatter: function () {
                        return `<span style="color: ${this.point.color === "#363f7f" ? "#fff" : "#000"}">${this.y}%</span>`;
                    },
                    style: {
                        fontSize: "16px",
                        color: "#fff",
                        textOutline: "none",
                    },
                },
            },
        },
        series: [
            {
                type: "pie",
                name: "Percentage",
                data: [
                    {
                        name: "Sold Tokens",
                        y: parseFloat(((tokenData?.AvilableTokenBalace || 0) / (tokenData?.total_allotted_data || 1) * 100).toFixed(2)),
                        color: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0.2, "#FFD700"], // Dark Gold (Top)
                                [0.5, "#FFF8DC"], // Light Yellow (Middle)
                                [1, "#FFD700"], // Dark Gold (Bottom)
                            ],
                        },
                    },
                    {
                        name: "Available Quantity",
                        y: parseFloat(((tokenData?.profitLoss || 0) / (tokenData?.total_allotted_data || 1) * 100).toFixed(2)),
                        color: "#363f7f",
                    },
                ],
                
            },
        ],
        credits: {
            enabled: false,
        },
    };
    return (
        <div className='mt-5'>
            <AntdComponents.Row gutter={[20,20]}>
                <AntdComponents.Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className='common_background p-5'>
                        <AntdComponents.Typography className='text-center text-White text-lg font-semibold'>Current Status of the <br /> of the Token</AntdComponents.Typography>
                        <div>
                            <HighchartsReact highcharts={Highcharts} options={QuantityData} />
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='border border-White py-2 w-60 rounded-md'>
                                <AntdComponents.Typography className='text-White text-center'>Total Quantity = <span className='text-White'>{tokenData?.total_allotted_data}</span></AntdComponents.Typography>
                            </div>
                            <div className='border border-White py-2 w-60 mt-2 rounded-md'>
                                <AntdComponents.Typography className='text-White text-center'>Available Token = <span className='text-TextYellow'>{tokenData?.AvilableTokenBalace.toFixed(2)}</span></AntdComponents.Typography>
                            </div>
                            <div className='border border-White py-2 w-60 mt-2 rounded-md'>
                                <AntdComponents.Typography className='text-White text-center'>sold Token = <span className='text-TextYellow'>{tokenData?.profitLoss}</span></AntdComponents.Typography>
                            </div>
                        </div>
                    </div>
                </AntdComponents.Col>
                <AntdComponents.Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <ProgressBars tokenData={tokenData}/>
                </AntdComponents.Col>
            </AntdComponents.Row>
        </div>
    )
}

export default LastComp