import { FC } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { generateColor } from 'utils'

const CustomizedDot: FC<any> = (props: any) => {
  const { cx, cy, icon } = props

  return (
    <image x={cx + 5} y={cy - 15} width={30} height={30} xlinkHref={`${import.meta.env.VITE_API_IMAGE_URL}${icon}`} style={{ borderRadius: 50 }} />
  )
}

export interface ILabelChart {
  name: string,
  profile: string
}

export interface IDataChart {
  name: string,
  title: string,
  data: Object
}

export const CustomLineChart = ({ width = '100%', height = 300, labels, data }: any) => {  
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        data={data}
        margin={{
          top: 25,
          right: 40,
          left: 0,
          bottom: 10,
        }}
      >
        <Tooltip />
        <YAxis />
        <XAxis dataKey='title' />
        {labels?.map((item: any, key: number) => {
          return (
            <Line
              key={key}
              type='monotone'
              dataKey={item.name}
              stroke={generateColor()}
              dot={<CustomizedDot icon={item.profile} />}
              strokeDasharray='3 3'
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
