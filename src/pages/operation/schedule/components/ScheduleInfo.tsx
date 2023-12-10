import { Box, Stack, Typography } from '@mui/material'
import { CustomizedButton } from 'components/shared/buttons/CustomButton'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { RecordDetail } from 'pages/admin/patient/record'
import { useState } from 'react'
import { calculateYearOfDate } from 'utils/index'

const ScheduleInfo = ({ data, records }: any) => {
  const { theme } = useTheme()
  const [isCollapse, setIsCollapse] = useState(true)
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
        {data?.patient?.fullName && (
          <LabelDetail label={translate('PATIENT_FULL_NAME') as String}>
            <Typography>{data?.patient?.fullName}</Typography>
          </LabelDetail>
        )}
        <LabelDetail label={translate('PATIENT_NAME') as String}>
          <Typography>{data?.patient?.user?.username || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('GENDER') as String}>
          <Typography>{data?.patient?.gender || '...'}</Typography>
        </LabelDetail>
        {data?.patient?.dateOfBirth && (
          <LabelDetail label={translate('AGE') as String}>
            <Typography>
              {calculateYearOfDate(data?.patient?.dateOfBirth)}
            </Typography>
          </LabelDetail>
        )}
      </Stack>
      {records?.length > 0 && (
        <Box pb={'20px'}>
          <CustomizedButton
            color={theme.color.info}
            fullWidth
            onClick={() => setIsCollapse(!isCollapse)}
            label={translate('VIEW_HISTORY')}
          />
          {!isCollapse && (
            <Stack direction={'column'} pt={2} gap={2}>
              {records?.map((item: any, key: number) => {
                return <RecordDetail data={item} key={key} />
              })}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ScheduleInfo
