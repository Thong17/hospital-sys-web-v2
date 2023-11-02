import {
  Box,
  Breadcrumbs,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded'
import useTheme from 'hooks/useTheme'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { translate } from 'contexts/language/LanguageContext'
import { styled } from '@mui/material/styles'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'

const BUTTON_SIZE = '27px'
export interface IBreadcrumb {
  id: string
  href: string
  label: any
  prefix?: any
  suffix?: any
  options?: { label: any; href: any; prefix?: any; suffix?: any }[]
  isCurrent?: boolean
}

const StyledBreadcrumbs = styled(Breadcrumbs)({
  maxWidth: '100%',
  '.MuiBreadcrumbs-ol': {
    flexWrap: 'nowrap',
  },
  '.MuiBreadcrumbs-separator': {
    flexShrink: 0,
  },
  '.MuiBreadcrumbs-li:not(:last-of-type)': {
    overflow: 'hidden',
  },
})

const Breadcrumb = ({
  list,
  step,
  selectedOption,
}: {
  list: IBreadcrumb[]
  step?: number
  selectedOption?: any
}) => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { width } = useDevice()
  const currentIndex = step
    ? step - 1
    : list.findIndex((item) => item.isCurrent)

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
        padding: '4px 5px 4px 4px',
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
      {(list.filter((item) => item.isCurrent).length > 0 ||
        !!(step && step > 0)) && (
        <ActionButton
          onClickNext={
            currentIndex < list.length - 1 ? handleClickNext : undefined
          }
          onClickPrevious={currentIndex > 0 ? handleClickPrevious : undefined}
        />
      )}
      <StyledBreadcrumbs
        separator={<ShortcutRoundedIcon sx={{ fontSize: '23px' }} />}
        maxItems={ width > TABLET_WIDTH ? 3 : 2 }
        sx={{
          width: 'fit-content',
          marginLeft: '5px',
          '& ol.MuiBreadcrumbs-ol': {
            '& li:last-child': {
              display: 'block !important',
            }
          },
          '& a': { textDecoration: 'none' },
          '& li.MuiBreadcrumbs-separator': { margin: '0 3px' },
          '& li:has(a)': {
            padding: '4px 7px',
            borderRadius: theme.radius.quaternary,
          },
          '& li:has(.link-options):has(a)': { padding: '3px 5px 3px 7px' },
          '& li:hover:has(a)': {
            backgroundColor: `${theme.color.info}22`,
            '& *': { color: `${theme.color.info}` },
          },
          '& li:has(a.active)': {
            backgroundColor: `${theme.color.info}22`,
            '& *': { color: `${theme.color.info}` },
          },
          '& li': {
            display: width > TABLET_WIDTH ? 'unset' : 'none',
          }
        }}
      >
        {list.map((item, key) => {
          const isCurrent = currentIndex === key
          return item.options ? (
            <OptionLink
              key={key}
              data={item}
              selected={selectedOption?.[item.id]}
              isCurrent={isCurrent}
            />
          ) : (
            <Link
              key={key}
              to={item.href}
              className={isCurrent ? 'active' : 'inactive'}
              style={{ cursor: isCurrent ? 'default' : 'pointer' }}
            >
              <BreadcrumbLabel
                label={item.label}
                prefix={item.prefix}
                suffix={item.suffix}
              />
            </Link>
          )
        })}
      </StyledBreadcrumbs>
    </Box>
  )
}

const OptionLink = ({ data, selected, isCurrent }: any) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const item: IBreadcrumb = data?.options?.find(
    (option: IBreadcrumb) => option.href === selected
  )

  const handleClick = (event: any) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleChange = (href: string) => {
    navigate(href)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!item)
    return (
      <SubBreadcrumb
        href={data.href}
        label={data.label}
        prefix={data.prefix}
        suffix={data.suffix}
        isCurrent={isCurrent}
        onClick={handleClick}
        onClose={handleClose}
        onChange={handleChange}
        anchorEl={anchorEl}
        options={data?.options}
      />
    )
  return (
    <SubBreadcrumb
      href={item.href}
      label={item.label}
      prefix={item.prefix}
      suffix={item.suffix}
      isCurrent={isCurrent}
      onClick={handleClick}
      onClose={handleClose}
      onChange={handleChange}
      anchorEl={anchorEl}
      options={data?.options}
    />
  )
}

const BreadcrumbLabel = ({ label, prefix, suffix }: any) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      gap={0.5}
      sx={{ '& svg': { fontSize: '17px' } }}
    >
      {prefix && prefix}
      {label && translate(label)}
      {suffix && suffix}
    </Stack>
  )
}

const SubBreadcrumb = ({
  href,
  label,
  prefix,
  suffix,
  isCurrent,
  onClick,
  onClose,
  onChange,
  anchorEl,
  options,
}: any) => {
  return (
    <>
      <Stack
        className='link-option-menu'
        direction={'row'}
        alignItems={'center'}
      >
        <Link
          to={href}
          className={isCurrent ? 'active' : 'inactive'}
          style={{ cursor: isCurrent ? 'default' : 'pointer' }}
        >
          <BreadcrumbLabel label={label} prefix={prefix} suffix={suffix} />
        </Link>
        <IconButton
          onClick={(e) => onClick(e)}
          sx={{ width: '25px', height: '25px' }}
        >
          <ExpandMoreRoundedIcon />
        </IconButton>
      </Stack>
      <Menu
        id='link-option-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => onClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: 'right',
        }}
      >
        {options?.map((option: IBreadcrumb, key: number) => (
          <MenuItem key={key} onClick={() => onChange(option.href)}>
            <BreadcrumbLabel
              label={option.label}
              prefix={option.prefix}
              suffix={option.suffix}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

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
