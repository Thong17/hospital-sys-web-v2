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
        backgroundColor: `${theme.color.info}22`,
        padding: '0 20px',
        borderRadius: theme.radius.ternary,
      }}
    >
      <Stack direction={'row'}>
        <LabelDetail label={translate('FULL_NAME') as String}>
          <Typography>{data?.patient?.fullName || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('USERNAME') as String}>
          <Typography>{data?.patient?.username || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('GENDER') as String}>
          <Typography>{data?.patient?.gender || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('DATE_OF_BIRTH') as String}>
          <Typography>
            {data?.patient?.dateOfBirth
              ? timeFormat(data?.patient?.dateOfBirth, 'DD MM YYYY')
              : '...'}
          </Typography>
        </LabelDetail>
      </Stack>
    </Box>
  )
}

export default ScheduleInfo
