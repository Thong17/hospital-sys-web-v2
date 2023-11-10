import { Box, Stack, Tooltip, Typography } from '@mui/material'
import { CustomizedIconButton } from 'components/shared/buttons/ActionButton'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { languages } from 'contexts/language/constant'
import useDevice from 'hooks/useDevice'
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { getTheme } from 'contexts/theme/ThemeContext'
import { translate } from 'contexts/language/LanguageContext'
const theme = getTheme()

let columns: ITableColumn<any>[] = [
  ...Object.keys(languages).map((key) => ({
    label: `Name\u00a0${key}`,
    id: `name${key}`,
  })),
  { label: translate('STATUS') as string, id: 'status' },
  { label: translate('DESCRIPTION') as string, id: 'description' },
  { label: translate('NAVIGATION') as string, id: 'navigation' },
  { label: translate('PRIVILEGE') as string, id: 'privilege' },
  { label: translate('VALIDATION') as string, id: 'validation' },
  { label: translate('ACTION') as string, id: 'action', align: 'right' },
]

const ProductImportTable = ({ data, onRemove }: any) => {
  const { width } = useDevice()
  return (
    <Box
      sx={{
        height: '80vh',
        width: width > 1024 ? '90vw' : 'calc(100vw - 64px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflow: 'auto'
      }}
    >
      {/* TODO: style */}
      <StickyTable
        rows={data?.map((item: any) => mapData(item, onRemove))}
        pagination={false}
        columns={columns}
      />
    </Box>
  )
}

const mapData = ({ data, result }: any, onRemove: (_data: any) => void) => {
  const validation = result?.error ? (
    <Stack direction={'column'}>
      {Object.keys(result?.error || {})?.map((key, index) => (
        <Tooltip
          key={index}
          title={`${key}: ${translate(result?.error?.[key]?.message)}`}
        >
          <Typography
            maxWidth={250}
            noWrap
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            variant={'p' as any}
            sx={{ color: theme.color.error }}
          >
            {`* ${key}: ${translate(result?.error?.[key]?.message)}`}
          </Typography>
        </Tooltip>
      ))}
    </Stack>
  ) : (
    <Typography
      maxWidth={250}
      noWrap
      textOverflow={'ellipsis'}
      overflow={'hidden'}
      variant={'p' as any}
      sx={{ color: theme.color.success }}
    >
      {translate('VALIDATED')}
    </Typography>
  )
  const obj: any = {
    status: data?.status,
    description: data?.description,
    navigation: (
      <Tooltip title={JSON.stringify(data?.navigation)}>
        <DataObjectRoundedIcon fontSize='small' />
      </Tooltip>
    ),
    privilege: (
      <Tooltip title={JSON.stringify(data?.privilege)}>
        <DataObjectRoundedIcon fontSize='small' />
      </Tooltip>
    ),
    validation,
    action: (
      <Stack direction={'row'} gap={1} justifyContent={'end'}>
        <CustomizedIconButton
          onClick={() => onRemove(data)}
          color={theme.color.error}
          icon={<CloseRoundedIcon fontSize='small' />}
        />
      </Stack>
    ),
  }
  Object.keys(data?.name || {}).forEach((key) => {
    obj[`name${key}`] = data?.name?.[key]
  })
  return obj
}

export default ProductImportTable
