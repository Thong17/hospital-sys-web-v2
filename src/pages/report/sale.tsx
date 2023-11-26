import { Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Layout } from 'components/layouts/Layout'
import Container from 'components/shared/Container'
import { CustomAreaChart } from 'components/shared/charts/AreaChart'
import SummaryContainer from 'components/shared/containers/SummaryContainer'
import TitleContainer from 'components/shared/containers/TitleContainer'
import SelectInput from 'components/shared/forms/SelectInput'
import { translate } from 'contexts/language/LanguageContext'
import { useEffect } from 'react'
import { getReportSale } from 'stores/report/action'
import { selectReportSale } from 'stores/report/selector'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded'

export const SaleReport = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectReportSale)

  useEffect(() => {
    dispatch(getReportSale())
  }, [])

  return (
    <Layout>
      <Container>
        <Stack direction={'row'} p={2} gap={2} sx={{ overflowX: 'auto' }}>
          <SummaryContainer
            label={translate('TOTAL_SALE')}
            value={data?.totalPayment}
            icon={<MonetizationOnRoundedIcon fontSize='large' />}
            children={undefined}
          />
          <SummaryContainer
            label={translate('TOTAL_PROFIT')}
            value={data?.totalPayment - data?.totalCost}
            icon={<EqualizerRoundedIcon fontSize='large' />}
            children={undefined}
          />
        </Stack>
        <TitleContainer text={translate('TITLE_SALE_REPORT') as String}>
          <Stack direction={'row'} gap={1}>
            <SelectInput
              options={[{ value: 'DAILY', label: translate('DAILY') }]}
              width={'130px'}
              defaultValue={'DAILY'}
              height='35px'
            />
          </Stack>
        </TitleContainer>
        <CustomAreaChart
          height={370}
          labels={[{ name: 'value' }]}
          data={data?.chart?.map((item: any) => ({
            name: item.monthYear,
            value: item.total,
          }))}
        />
      </Container>
    </Layout>
  )
}
