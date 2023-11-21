import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { useParams } from 'react-router'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectPatientRecord } from 'stores/patient/selector'
import { useEffect } from 'react'
import { getPatientRecord } from 'stores/patient/action'
import { Box, Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import { calculateYearOfDate, renderColor, timeFormat } from 'utils/index'
import ItemContainer from 'components/shared/containers/ItemContainer'
import useLanguage from 'hooks/useLanguage'

const PatientRecord = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectPatientRecord)

  useEffect(() => {
    dispatch(getPatientRecord({ id }))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/admin/patient/detail/${id}/record`,
              label: translate('RECORD'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/patient' }}
        />
      }
    >
      <Container>
        <Box
          sx={{
            backgroundColor: theme.layout.sidebar,
            padding: '0 20px',
            borderRadius: theme.radius.ternary,
          }}
        >
          <Stack direction={'row'}>
            {data?.patient?.fullName && (
              <LabelDetail label={translate('FULL_NAME') as String}>
                <Typography>{data?.patient?.fullName}</Typography>
              </LabelDetail>
            )}
            <LabelDetail label={translate('USERNAME') as String}>
              <Typography>{data?.patient?.username || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('GENDER') as String}>
              <Typography>{data?.patient?.gender || '...'}</Typography>
            </LabelDetail>
            {data?.patient?.dateOfBirth && (
              <LabelDetail label={translate('DATE_OF_BIRTH') as String}>
                <Typography>
                  {`${calculateYearOfDate(
                    data?.patient?.dateOfBirth
                  )} ${translate('YEARS_OLD')}`}
                </Typography>
              </LabelDetail>
            )}
            {data?.detail?.bloodType && (
              <LabelDetail label={translate('BLOOD_TYPE') as String}>
                <Typography>{data?.detail?.bloodType || '...'}</Typography>
              </LabelDetail>
            )}
            {data?.detail?.allergies?.length > 0 && (
              <LabelDetail label={translate('TAGS') as String}>
                <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
                  {data?.detail?.allergies?.map((item: any, key: number) => (
                    <ItemContainer
                      key={key}
                      text={item}
                      color={theme.text.secondary}
                    />
                  ))}
                </Stack>
              </LabelDetail>
            )}
            {data?.detail?.chronics?.length > 0 && (
              <LabelDetail label={translate('TAGS') as String}>
                <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
                  {data?.detail?.chronics?.map((item: any, key: number) => (
                    <ItemContainer
                      key={key}
                      text={item}
                      color={theme.text.secondary}
                    />
                  ))}
                </Stack>
              </LabelDetail>
            )}
          </Stack>
        </Box>
        <Stack direction={'column'} py={2} gap={2}>
          {data?.records?.map((item: any, key: number) => {
            return <RecordDetail data={item} key={key} />
          })}
        </Stack>
      </Container>
    </Layout>
  )
}

export const RecordDetail = ({ data }: any) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()
  return (
    <Box
      sx={{
        border: theme.border.dashed,
        borderRadius: theme.radius.ternary,
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        '& .section-container': {
          width: 'fit-content',
          minWidth: '150px',
          background: `none`,
          marginTop: '10px',
          marginBottom: 0,
          borderRadius: theme.radius.ternary,
        },
      }}
    >
      {data?.doctor?.username && (
        <LabelDetail label={translate('DOCTOR') as String}>
          <Typography>{data?.doctor?.username}</Typography>
        </LabelDetail>
      )}
      {data?.patientRecord?.condition && (
        <LabelDetail label={translate('CONDITION') as String}>
          <ItemContainer
            text={translate(data?.patientRecord?.condition)}
            color={renderColor(data?.patientRecord?.condition, theme)}
          />
        </LabelDetail>
      )}
      <LabelDetail label={translate('DATE') as String}>
        <Typography>
          {timeFormat(data?.startedAt, 'DD MMM, YYYY h:mm A') || '...'}
        </Typography>
      </LabelDetail>
      <Stack
        direction={'column'}
        width={'100%'}
        gap={'20px'}
        sx={{
          '& .section-container': {
            width: '100% !important',
            background: `none !important`,
            border: theme.border.quaternary
          },
        }}
      >
        {data?.patientRecord?.symptoms?.length > 0 && (
          <LabelDetail label={translate('SYMPTOMS') as String}>
            <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
              {data?.patientRecord?.symptoms?.map((item: any, key: number) => (
                <ItemContainer
                  key={key}
                  text={item?.name?.[lang] || item?.name?.['English']}
                  color={theme.text.secondary}
                />
              ))}
            </Stack>
          </LabelDetail>
        )}
        {data?.patientRecord?.diagnose && (
          <LabelDetail label={translate('DIAGNOSE') as String}>
            <Typography>{data?.patientRecord?.diagnose}</Typography>
          </LabelDetail>
        )}
        {data?.patientRecord?.treatments?.length > 0 && (
          <LabelDetail label={translate('TREATMENTS') as String}>
            <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
              {data?.patientRecord?.treatments?.map(
                (item: any, key: number) => (
                  <ItemContainer
                    key={key}
                    text={item?.name?.[lang] || item?.name?.['English']}
                    color={theme.text.secondary}
                  />
                )
              )}
            </Stack>
          </LabelDetail>
        )}
        {data?.patientRecord?.comment && (
          <LabelDetail label={translate('COMMENT') as String}>
            <Typography>{data?.patientRecord?.comment}</Typography>
          </LabelDetail>
        )}
      </Stack>
    </Box>
  )
}

export default PatientRecord
