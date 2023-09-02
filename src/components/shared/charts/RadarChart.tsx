import useTheme from 'hooks/useTheme'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

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

export const CustomRadarChart = ({
  width = '100%',
  height = 500,
  data,
  radars,
}: any) => {
  const { theme } = useTheme()
  return (
    <ResponsiveContainer width={width} height={height}>
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey='subject'
          tick={{ fill: theme.text.secondary }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        {radars.map((radar: any, key: number) => (
          <Radar
            key={key}
            name={radar.name}
            dataKey={radar.dataKey}
            stroke={theme.color.info}
            fill={`${theme.color.info}55`}
            fillOpacity={0.6}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  )
}
