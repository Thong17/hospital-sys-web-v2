import { Box, Button, Menu, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
import { forwardRef, useState } from 'react'

import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { timeFormat } from 'utils/index'

const theme = getTheme()

interface IDateRangePickerProps {
  value: any
  onChange: (data: any) => void
}

const StyledDateRange = styled(DateRange)(({}: {}) => ({
  backgroundColor: theme.background.secondary,
  boxShadow: theme.shadow.quaternary,
  borderRadius: theme.radius.primary,
  overflow: 'hidden',
  '& .rdrMonthAndYearWrapper select': {
    filter: 'invert(0.5)'
  },
  '& .rdrMonths .rdrMonth .rdrWeekDays span': {
    color: `${theme.text.primary} !important`,
  },
  '& .rdrMonths .rdrMonth .rdrDay.rdrDayPassive span span': {
    color: `${theme.text.quaternary} !important`,
  },
  '& .rdrMonths .rdrMonth .rdrDay span span': {
    color: `${theme.text.primary} !important`,
  },
  '& .rdrDateDisplayWrapper': {
    backgroundColor: theme.background.secondary
  }
}))

const SelectDateRange = forwardRef(({ value, onChange }: IDateRangePickerProps, ref) => {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  return (
    <Box ref={ref}>
      <Button
        id='profile-menu'
        onClick={(event: any) => setAnchorEl(event.currentTarget)}
        sx={{
          border: theme.border.tertiary,
          borderRadius: theme.radius.primary,
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          textTransform: 'none',
          color: theme.text.secondary
        }}
      >
        {value.map((item: any) => `${timeFormat(item.startDate, 'DD MMM, YYYY')} - ${timeFormat(item.endDate, 'DD MMM, YYYY')}`).join(', ')}
      </Button>
      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{ '& ul': { padding: 0 }, '& .MuiPopover-paper': { background: 'none', marginTop: '7px' } }}
      >
        <StyledDateRange
          editableDateInputs={true}
          onChange={onChange}
          moveRangeOnFirstSelection={false}
          ranges={value}
        />
      </Menu>
    </Box>
  )
})

export default SelectDateRange
