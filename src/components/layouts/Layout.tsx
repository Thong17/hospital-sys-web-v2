import { FC, ReactElement } from 'react'
import { Box, styled } from '@mui/material'
import Navbar from 'components/shared/Navbar'
import { useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import Footer, { FOOTER_HEIGHT } from 'components/shared/Footer'
import { COLLAPSED_SIDEBAR_WIDTH, EXPANDED_SIDEBAR_WIDTH, NAVBAR_HEIGHT, SIDE_PADDING } from 'constants/layout'
import Sidebar from 'components/shared/Sidebar'

export const LAYOUT_TRANSITION: string = '0.3s ease'

interface ILayout {
  navbar?: ReactElement
  children: any
}

const WrapContainer = styled('div')({
  position: 'relative',
  height: '100%',
  transition: LAYOUT_TRANSITION
})

const ContentContainer = styled('div')({
  width: '100%',
  padding: `${NAVBAR_HEIGHT}px ${SIDE_PADDING}px 0 ${SIDE_PADDING}px`,
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
  backgroundColor: 'blueviolet',
  boxSizing: 'border-box',
})

export const Layout: FC<ILayout> = ({ children }) => {
  const { isOpenedSidebar, isAttachedSidebar } = useAppSelector(selectConfig)

  return (
    <Box component={'div'}>
      <Sidebar />
      <WrapContainer
        style={{
          marginLeft: `${
            (isOpenedSidebar && isAttachedSidebar)
              ? EXPANDED_SIDEBAR_WIDTH
              : COLLAPSED_SIDEBAR_WIDTH
          }px`,
          width: `calc(100% - ${
            (isOpenedSidebar && isAttachedSidebar)
              ? EXPANDED_SIDEBAR_WIDTH
              : COLLAPSED_SIDEBAR_WIDTH
          }px)`,
        }}
      >
        <Navbar />
        <ContentContainer>{children}</ContentContainer>
        <Footer />
      </WrapContainer>
    </Box>
  )
}
