import { useAppDispatch, useAppSelector } from "app/store"
import { useEffect } from "react"
import { getHomeContent } from "stores/home/action"
import { selectHomeContent } from "stores/home/selector"

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
    <div>Home</div>
  )
}

export default Home