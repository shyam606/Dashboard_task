import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as AntdComponents from 'antd'

const QuantityTopSection = ({ tokenData }) => {
  console.log('tokenData', tokenData);

  const QuantityData = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 250
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: '<b>Quantity:{point.y}</b>'
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
          distance: 40,
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
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Top to Bottom
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
            color: "#363f7f"
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className='common_background py-10'>
      <AntdComponents.Row align={'middle'}>
        <AntdComponents.Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div>
            <HighchartsReact highcharts={Highcharts} options={QuantityData} />
          </div>
        </AntdComponents.Col>
        <AntdComponents.Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className='flex flex-col items-center'>
            <AntdComponents.Typography className='text-White text-lg'>Total Quantity = {tokenData?.total_allotted_data}</AntdComponents.Typography>
            <div className='border border-White py-2 w-52 mt-7 rounded-md'>
              <AntdComponents.Typography className='text-White text-center'>Used Quantity = <span className='text-TextYellow'>{tokenData?.profitLoss}</span></AntdComponents.Typography>
            </div>
            <div className='border border-White py-2 w-52 mt-4 rounded-md'>
              <AntdComponents.Typography className='text-White text-center'>Available Quantity = <span className='text-TextYellow'>{tokenData?.AvilableTokenBalace.toFixed(2)}</span></AntdComponents.Typography>
            </div>
          </div>
        </AntdComponents.Col>
      </AntdComponents.Row>
    </div>
  )
}

export default QuantityTopSection