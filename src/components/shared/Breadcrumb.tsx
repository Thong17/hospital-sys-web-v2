import { Box, Breadcrumbs, IconButton, Link } from '@mui/material'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import useTheme from 'hooks/useTheme'

export interface IBreadcrumb {
  href: string
  label: any
  prefix?: any
  suffix?: any
  options?: { label: String, value: any, prefix?: any, suffix?: any }[]
}

const Breadcrumb = ({ list }: { list: IBreadcrumb[] }) => {
  const { theme } = useTheme()
  return (
    <Box
      sx={{
        padding: '4px 15px 4px 4px',
        width: 'fit-content',
        boxSizing: 'border-box',
        backgroundColor: theme.layout.container,
        borderRadius: theme.radius.rounded,
        border: theme.border.quaternary
      }}
    >
      <Breadcrumbs
        separator={<FiberManualRecordRoundedIcon sx={{ fontSize: '10px' }} />}
        sx={{ width: 'fit-content', '& a': { textDecoration: 'none' } }}
      >
        <ActionButton />
        {list.map((item, key) => (
          <Link key={key} href={item.href}>
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  )
}

const BUTTON_SIZE = '27px'

const ActionButton = () => {
  const { theme } = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.background.tertiary,
        borderRadius: theme.radius.rounded,
        padding: '3px',
      }}
    >
      <IconButton sx={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}>
        <KeyboardArrowLeftRoundedIcon />
      </IconButton>
      <IconButton sx={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}>
        <KeyboardArrowRightRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default Breadcrumb
