import useTheme from 'hooks/useTheme'
import {
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  Cell,
  Tooltip,
} from 'recharts'
import { currencyFormat } from 'utils/index'

const CustomizedLabel = (props: any) => {
  const { x, y, width, value, color } = props

  return (
    <g transform={`translate(${0},${y})`}>
      <foreignObject
        x={x}
        y={-23}
        textAnchor='middle'
        width={width}
        height='20'
      >
        <div style={{ display: 'grid', placeItems: 'center', color: color }}>
          {currencyFormat(value, 'PCT')}
        </div>
      </foreignObject>
    </g>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: `#00000055`, color: '#fff', padding: '5px 10px', borderRadius: 7 }}>
        <p>{`${label} : ${payload[0].value}%`}</p>
      </div>
    )
  }

  return null
}

export const CustomBarChart = ({
  width = '100%',
  height = 300,
  labels,
  data,
}: any) => {
  const { theme } = useTheme()
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data}
        margin={{
          top: 25,
          right: 40,
          left: 0,
          bottom: 10,
        }}
      >
        <XAxis dataKey='name' style={{ color: '#fff' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <YAxis />
        {labels?.map((item: any, key: number) => {
          return (
            <Bar
              barSize={37}
              key={key}
              type='monotone'
              dataKey={item.name}
              stroke={theme.text.tertiary}
              strokeWidth={0}
              radius={[7, 7, 0, 0]}
              label={<CustomizedLabel />}
            >
              {data.map((item: any, key: number) => {
                return (
                  <Cell
                    key={key}
                    fill={item.color}
                    style={{ filter: `drop-shadow(0 0 3px ${item.color})` }}
                  />
                )
              })}
            </Bar>
          )
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}
