import { IconButton, Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Layout } from 'components/layouts/Layout'
import Container from 'components/shared/Container'
import { CustomAreaChart } from 'components/shared/charts/AreaChart'
import SummaryContainer from 'components/shared/containers/SummaryContainer'
import TitleContainer from 'components/shared/containers/TitleContainer'
import SelectInput from 'components/shared/forms/SelectInput'
import { translate } from 'contexts/language/LanguageContext'
import { useEffect, useState } from 'react'
import { getReportSale, getReportTransaction } from 'stores/report/action'
import { selectReportSale } from 'stores/report/selector'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded'
import { useSearchParams } from 'react-router-dom'
import SelectDateRange from 'components/shared/forms/DateRangePicker'
import { currencyFormat, timeFormat } from 'utils/index'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '.'
import useTheme from 'hooks/useTheme'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ListTable from 'components/shared/table/ListTable'

const FILTER_CHART = [
  { value: 'DAILY', label: translate('DAILY') },
  { value: 'MONTHLY', label: translate('MONTHLY') },
  { value: 'YEARLY', label: translate('YEARLY') },
]

export const SaleReport = () => {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const { data } = useAppSelector(selectReportSale)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })
  const [detailDialog, setDetailDialog] = useState<any>({
    open: false,
    list: [],
  })

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

  const handleChangeDetail = async (type: String, data?: any) => {
    let list: any = []
    const params = new URLSearchParams()
    if (type === 'CHART') {
      params.append('start', data?.name)
      params.append('end', data?.name)
    }
    const response = await dispatch(getReportTransaction({ params })).unwrap()
    if (response?.code !== 'SUCCESS') return

    switch (true) {
      case type === 'TOTAL_SALE':
        list = response?.data?.map((item: any, index: number) => ({
          date: timeFormat(item.createdAt, 'DD/MM/YYYY h:mm A'),
          invoice: item.invoice.split('-')[1],
          total: currencyFormat(item.total),
          balance: currencyFormat(response?.data?.slice(0, index + 1).reduce((curr: number, obj: any) => curr + obj.total, 0))
        }))
        break

      case type === 'TOTAL_PROFIT':
        list = response?.data?.map((item: any, index: number) => ({
          date: timeFormat(item.createdAt, 'DD/MM/YYYY h:mm A'),
          invoice: item.invoice.split('-')[1],
          profit: currencyFormat(item.profit),
          balance: currencyFormat(response?.data?.slice(0, index + 1).reduce((curr: number, obj: any) => curr + obj.profit, 0))
        }))
        break

      case type === 'TOTAL_EXPENSE':
        list = response?.data?.map((item: any, index: number) => ({
          date: timeFormat(item.createdAt, 'DD/MM/YYYY h:mm A'),
          invoice: item.invoice.split('-')[1],
          cost: currencyFormat(item.cost),
          balance: currencyFormat(response?.data?.slice(0, index + 1).reduce((curr: number, obj: any) => curr + obj.cost, 0))
        }))
        break

      default:
        list = response?.data?.map((item: any, index: number) => ({
          date: timeFormat(item.createdAt, 'DD/MM/YYYY h:mm A'),
          invoice: item.invoice.split('-')[1],
          total: currencyFormat(item.total),
          balance: currencyFormat(response?.data?.slice(0, index + 1).reduce((curr: number, obj: any) => curr + obj.total, 0))
        }))
        break
    }
    setDetailDialog({ open: true, list })
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={breadcrumbs}
          step={2}
          selectedOption={{ navbar: '/report/sale' }}
        />
      }
    >
      <FormDialog
        justify='center'
        isOpen={detailDialog.open}
        onClose={() => setDetailDialog({ ...detailDialog, open: false })}
        list={<ListTable list={detailDialog.list} />}
      />
      <Container>
        <Stack direction={'row'} p={2} gap={2} sx={{ overflowX: 'auto' }}>
          <SummaryContainer
            label={translate('TOTAL_SALE')}
            value={currencyFormat(data?.totalPayment)}
            icon={<MonetizationOnRoundedIcon fontSize='large' />}
            color={theme.color.info}
          >
            <IconButton
              onClick={() => handleChangeDetail('TOTAL_SALE')}
              size='small'
              sx={{ color: theme.color.info }}
            >
              <ArrowRightAltRoundedIcon />
            </IconButton>
          </SummaryContainer>
          <SummaryContainer
            label={translate('TOTAL_PROFIT')}
            value={currencyFormat(data?.totalPayment - data?.totalCost)}
            icon={<EqualizerRoundedIcon fontSize='large' />}
            color={
              data?.totalPayment - data?.totalCost > 0
                ? theme.color.success
                : theme.color.error
            }
          >
            <IconButton
              onClick={() => handleChangeDetail('TOTAL_PROFIT')}
              size='small'
              sx={{
                color:
                  data?.totalPayment - data?.totalCost > 0
                    ? theme.color.success
                    : theme.color.error,
              }}
            >
              <ArrowRightAltRoundedIcon />
            </IconButton>
          </SummaryContainer>
          <SummaryContainer
            label={translate('TOTAL_EXPENSE')}
            value={currencyFormat(data?.totalCost)}
            icon={<EqualizerRoundedIcon fontSize='large' />}
            color={theme.color.error}
          >
            <IconButton
              onClick={() => handleChangeDetail('TOTAL_EXPENSE')}
              size='small'
              sx={{ color: theme.color.error }}
            >
              <ArrowRightAltRoundedIcon />
            </IconButton>
          </SummaryContainer>
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
            <SelectDateRange
              value={[
                {
                  startDate: new Date(
                    queryParams.get('startDate') || new Date()
                  ),
                  endDate: new Date(queryParams.get('endDate') || new Date()),
                  key: 'selection',
                },
              ]}
              onChange={onChangeDateSelection}
            />
          </Stack>
        </TitleContainer>
        <CustomAreaChart
          height={370}
          labels={[{ name: 'value' }]}
          onClick={(detail: any) => handleChangeDetail('CHART', detail)}
          data={data?.chart?.map((item: any) => ({
            name: item.monthYear,
            value: item.total,
          }))}
        />
      </Container>
    </Layout>
  )
}
