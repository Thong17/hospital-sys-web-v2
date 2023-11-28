import useTheme from 'hooks/useTheme'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import { currencyFormat } from 'utils/index'

const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props
  const { theme } = useTheme()

  return (
    <g transform={`translate(${cx},${cy})`}>
      <foreignObject x={-60} y={-5} textAnchor='middle' width='150' height='25'>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              backgroundColor: theme.text.primary,
              minWidth: 10,
              minHeight: 10,
              display: 'block',
              borderRadius: '50%',
              position: 'absolute',
              top: -0,
              left: '43%',
              transform: 'translate(-100%, 0)'
            }}
          ></span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            color: theme.text.secondary,
            height: '100%'
          }}
        >
          {currencyFormat(payload.value)}
        </div>
      </foreignObject>
    </g>
  )
}

export const CustomAreaChart = ({
  width = '100%',
  height = 350,
  labels,
  data,
}: any) => {
  const { theme } = useTheme()
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 25,
          right: 30,
          left: -20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='20%' stopColor={theme.text.primary} stopOpacity={0.1} />
            <stop offset='95%' stopColor={theme.layout.container} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' />
        <YAxis />
        {labels?.map((item: any, key: number) => {
          return (
            <Area
              key={key}
              type='monotone'
              dataKey={item.name}
              dot={<CustomizedDot data={item} />}
              stroke={theme.text.tertiary}
              fill='url(#colorUv)'
            />
          )
        })}
      </AreaChart>
    </ResponsiveContainer>
  )
}
