import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Layout } from 'components/layouts/Layout'
import { useEffect } from 'react'
import { getHomeContent } from 'stores/home/action'
import { selectHomeContent } from 'stores/home/selector'

const Home = () => {
  const { data } = useAppSelector(selectHomeContent)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getHomeContent())
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>A</span>
        <span>A</span>
      </Box>
    </Layout>
  )
}

export default Home
