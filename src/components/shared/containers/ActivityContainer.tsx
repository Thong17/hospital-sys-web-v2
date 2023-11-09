import { Stack, Typography } from '@mui/material'
import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { timeFormat } from 'utils/index'
import { LabelDetail } from './LabelContainer'
import ItemContainer from './ItemContainer'

const ActivityContainer = ({ data }: any) => {
  const { theme } = useTheme()
  return (
    <Stack
      direction={'column'}
      sx={{
        borderTop: theme.border.quaternary,
        marginTop: '30px',
        padding: '30px 0',
        '& .section-container': { marginTop: '20px' }
      }}
    >
      <Stack direction={'row'}>
        <LabelDetail label={translate('CREATED_BY') as String}>
          <Typography>{data?.createdBy?.username || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('CREATED_AT') as String}>
          <Typography>
            {timeFormat(data?.createdAt, 'DD MMM, YYYY h:mm:ss A') || '...'}
          </Typography>
        </LabelDetail>
      </Stack>
      <Stack direction={'row'}>
        <LabelDetail label={translate('UPDATED_BY') as String}>
          <Typography>{data?.updatedBy?.username || '...'}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('UPDATED_AT') as String}>
          <Typography>
            {timeFormat(data?.updatedAt, 'DD MMM, YYYY h:mm:ss A') || '...'}
          </Typography>
        </LabelDetail>
      </Stack>
      <Stack direction={'row'}>
        <LabelDetail label={translate('IS_DELETED') as String}>
          <ItemContainer
            text={data?.isDeleted ? translate('TRUE') : translate('FALSE')}
            color={data?.isDeleted ? theme.color.success : theme.color.error}
          />
        </LabelDetail>
        <LabelDetail label={translate('TAGS') as String}>
          <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
            {data?.tags?.map((item: any, key: number) => (
              <ItemContainer
                key={key}
                text={item}
                color={theme.text.secondary}
              />
            ))}
          </Stack>
        </LabelDetail>
      </Stack>
    </Stack>
  )
}

export default ActivityContainer
