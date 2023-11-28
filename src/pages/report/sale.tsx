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
import { useSearchParams } from 'react-router-dom'
import SelectDateRange from 'components/shared/forms/DateRangePicker'
import { timeFormat } from 'utils/index'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '.'
import useTheme from 'hooks/useTheme'

const FILTER_CHART = [
  { value: 'DAILY', label: translate('DAILY') },
  { value: 'MONTHLY', label: translate('MONTHLY') },
  { value: 'YEARLY', label: translate('YEARLY') },
]

export const SaleReport = () => {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const { data } = useAppSelector(selectReportSale)
  const [queryParams, setQueryParams] = useSearchParams()

  useEffect(() => {
    dispatch(getReportSale({ params: queryParams }))
  }, [queryParams])

  const handleChangeQuery = (newQuery: any) => {
    const query = Object.fromEntries(queryParams.entries())
    setQueryParams({ ...query, ...newQuery })
  }

  const handleChangeChart = (event: any) => {
    const value = event.target.value
    handleChangeQuery({ chart: value })
  }

  const onChangeDateSelection = (data: any) => {
    const startDate = timeFormat(data.selection?.startDate, 'yyyy-M-D')
    const endDate = timeFormat(data.selection?.endDate, 'yyyy-M-D')
    handleChangeQuery({ startDate, endDate })
  }

  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/report/sale' }} />}>
      <Container>
        <Stack direction={'row'} p={2} gap={2} sx={{ overflowX: 'auto' }}>
          <SummaryContainer
            label={translate('TOTAL_SALE')}
            value={data?.totalPayment}
            icon={<MonetizationOnRoundedIcon fontSize='large' />}
            color={theme.color.info}
            children={undefined}
          />
          <SummaryContainer
            label={translate('TOTAL_PROFIT')}
            value={data?.totalPayment - data?.totalCost}
            icon={<EqualizerRoundedIcon fontSize='large' />}
            color={(data?.totalPayment - data?.totalCost) > 0 ? theme.color.success : theme.color.error}
            children={undefined}
          />
          <SummaryContainer
            label={translate('TOTAL_EXPENSE')}
            value={data?.totalCost}
            icon={<EqualizerRoundedIcon fontSize='large' />}
            color={theme.color.error}
            children={undefined}
          />
        </Stack>
        <TitleContainer text={translate('TITLE_SALE_REPORT') as String}>
          <Stack direction={'row'} gap={1}>
            <SelectInput
              options={FILTER_CHART}
              onChange={handleChangeChart}
              width={'130px'}
              defaultValue={'DAILY'}
              height='35px'
            />
            <SelectDateRange value={[{
              startDate: new Date(queryParams.get('startDate') || new Date()),
              endDate: new Date(queryParams.get('endDate') || new Date()),
              key: 'selection',
            }]} onChange={onChangeDateSelection} />
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
