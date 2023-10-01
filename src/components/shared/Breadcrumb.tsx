import { Box, Breadcrumbs, IconButton } from '@mui/material'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded'
import useTheme from 'hooks/useTheme'
import { Link, useNavigate } from 'react-router-dom'

export interface IBreadcrumb {
  href: string
  label: any
  prefix?: any
  suffix?: any
  options?: { label: String; value: any; prefix?: any; suffix?: any }[]
  isCurrent?: boolean
}

const Breadcrumb = ({ list, step }: { list: IBreadcrumb[], step?: number }) => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const currentIndex = step ? step - 1 : list.findIndex((item) => item.isCurrent)

  const handleClickPrevious = () => {
    const targetPage = list[currentIndex - 1]
    if (targetPage) navigate(targetPage.href)
  }

  const handleClickNext = () => {
    const targetPage = list[currentIndex + 1]
    if (targetPage) navigate(targetPage.href)
  }

  return (
    <Box
      sx={{
        padding: '4px 15px 4px 4px',
        width: 'fit-content',
        height: '42px',
        boxSizing: 'border-box',
        backgroundColor: theme.layout.container,
        borderRadius: theme.radius.rounded,
        border: theme.border.quaternary,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {(list.filter((item) => item.isCurrent).length > 0 || !!(step && step > 0)) && (
        <ActionButton
          onClickNext={currentIndex < list.length - 1 ? handleClickNext : undefined}
          onClickPrevious={currentIndex > 0 ? handleClickPrevious : undefined}
        />
      )}
      <Breadcrumbs
        separator={<ShortcutRoundedIcon sx={{ fontSize: '23px' }} />}
        sx={{
          width: 'fit-content',
          marginLeft: '15px',
          '& a': { textDecoration: 'none' },
        }}
      >
        {list.map((item, key) => {
            const isCurrent = currentIndex === key 
            return <Link
                key={key}
                to={item.href}
                style={{ color: isCurrent ? theme.text.quaternary : 'inherit', cursor: isCurrent ? 'default' : 'pointer' }}
            >
                {item.prefix && item.prefix}
                {item.label && item.label}
                {item.suffix && item.suffix}
            </Link>
        })}
      </Breadcrumbs>
    </Box>
  )
}

const BUTTON_SIZE = '27px'

const ActionButton = ({
  onClickPrevious,
  onClickNext,
}: {
  onClickPrevious?: () => any
  onClickNext?: () => any
}) => {
  const { theme } = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.background.tertiary,
        borderRadius: theme.radius.rounded,
        padding: '3px',
      }}
    >
      {onClickPrevious && (
        <IconButton
          onClick={() => onClickPrevious()}
          sx={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        >
          <KeyboardArrowLeftRoundedIcon />
        </IconButton>
      )}
      {onClickNext && (
        <IconButton
          onClick={() => onClickNext()}
          sx={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        >
          <KeyboardArrowRightRoundedIcon />
        </IconButton>
      )}
    </Box>
  )
}

export default Breadcrumb
