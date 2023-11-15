import { Box, Stack, Typography } from '@mui/material'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { timeFormat } from 'utils/index'

const ScheduleInfo = ({ data }: any) => {
  const { theme } = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.layout.sidebar,
        padding: '0 20px',
        borderRadius: theme.radius.ternary,
        boxShadow: theme.shadow.quaternary,
      }}
    >
      <Stack direction={'row'}>
        {data?.patient?.fullName && <LabelDetail label={translate('FULL_NAME') as String}>
          <Typography>{data?.patient?.fullName}</Typography>
        </LabelDetail>}
        <LabelDetail label={translate('USERNAME') as String}>
          <Typography>{data?.patient?.username || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('GENDER') as String}>
          <Typography>{data?.patient?.gender || '...'}</Typography>
        </LabelDetail>
        {data?.patient?.dateOfBirth && <LabelDetail label={translate('DATE_OF_BIRTH') as String}>
          <Typography>
            {timeFormat(data?.patient?.dateOfBirth, 'DD MM YYYY')}
          </Typography>
        </LabelDetail>}
      </Stack>
    </Box>
  )
}

export default ScheduleInfo
