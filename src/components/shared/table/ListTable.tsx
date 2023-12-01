import { Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { translate } from 'contexts/language/LanguageContext'
import useDevice from 'hooks/useDevice'

const ListTable = ({ list }: { list: any[] }) => {
  const { theme } = useTheme()
  return (
    <Stack
      direction={'column'}
      gap={1}
      sx={{
        boxSizing: 'border-box',
        padding: '10px',
        borderRadius: theme.radius.primary,
        border: theme.border.dashed,
        overflowY: 'auto',
        height: '100%',
        width: '51vw'
      }}
    >
      {list?.map((item: any, key: number) => (
        <Item data={item} key={key} />
      ))}
    </Stack>
  )
}

const Item = ({ data }: any) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        width: '100%',
        backgroundColor: `${theme.color.info}22`,
        padding: '5px 10px',
        borderRadius: theme.radius.primary,
        boxSizing: 'border-box'
      }}
    >
      {Object.keys(data || {}).map((item: any, key: number) => {
        return (
          <Stack key={key} sx={{ width: '30%' }}>
            <Typography sx={{ color: theme.text.quaternary, fontSize: theme.responsive[device]?.text.tertiary }}>{translate(item.toUpperCase()) as String}</Typography>
            <Typography>{data?.[item] ?? '...'}</Typography>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default ListTable
