import { FC, ReactElement } from 'react'
import { Box, styled } from '@mui/material'
import Navbar from 'components/shared/Navbar'
import { useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import Footer from 'components/shared/Footer'
import {
  COLLAPSED_SIDEBAR_WIDTH,
  EXPANDED_SIDEBAR_WIDTH,
  FOOTER_HEIGHT,
  NAVBAR_HEIGHT,
} from 'constants/layout'
import Sidebar from 'components/shared/Sidebar'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import Bottombar from 'components/shared/Bottombar'
import useTheme from 'hooks/useTheme'

export const LAYOUT_TRANSITION: string = '0.3s ease'

interface ILayout {
  navbar?: ReactElement
  children: any
}

const WrapContainer = styled('div')({
  position: 'relative',
  height: '100%',
  transition: LAYOUT_TRANSITION,
})

const ContentContainer = styled(Box)({
  width: '100%',
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
  boxSizing: 'border-box',
})

export const Layout: FC<ILayout> = ({ navbar, children }) => {
  const { isOpenedSidebar, isAttachedSidebar } = useAppSelector(selectConfig)
  const { width } = useDevice()
  const { theme } = useTheme()

  return (
    <Box component={'div'} sx={{ backgroundColor: theme.layout.container, color: theme.text.secondary }}>
      <Box
        sx={{
          backgroundColor: theme.layout.container,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></Box>
      {width > TABLET_WIDTH && <Sidebar />}
      <WrapContainer
        style={{
          marginLeft:
            width > TABLET_WIDTH
              ? `${
                  isOpenedSidebar && isAttachedSidebar
                    ? EXPANDED_SIDEBAR_WIDTH
                    : COLLAPSED_SIDEBAR_WIDTH
                }px`
              : 0,
          width:
            width > TABLET_WIDTH
              ? `calc(100% - ${
                  isOpenedSidebar && isAttachedSidebar
                    ? EXPANDED_SIDEBAR_WIDTH
                    : COLLAPSED_SIDEBAR_WIDTH
                }px)`
              : '100%',
          paddingBottom: width > TABLET_WIDTH ? 0 : FOOTER_HEIGHT,
        }}
      >
        <Navbar navbar={navbar} />
        <ContentContainer sx={{ padding: `${NAVBAR_HEIGHT}px 0px 0 0px`, boxSizing: 'border-box' }}>
          {children}
        </ContentContainer>
        {width > TABLET_WIDTH ? <Footer /> : <Bottombar />}
      </WrapContainer>
    </Box>
  )
}
