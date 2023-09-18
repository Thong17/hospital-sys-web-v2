import { ReactElement } from "react"

const Container = ({ children }: { children: ReactElement }) => {
  return (
    <div>{children}</div>
  )
}

export default Container