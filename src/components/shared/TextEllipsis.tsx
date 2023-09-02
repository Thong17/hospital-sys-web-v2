import { CustomTextEllipsis } from "styles"

export const TextEllipsis = ({ children, title = '', ...props }: { children: React.ReactNode, title: string }) => {
  return (
    <CustomTextEllipsis title={title} {...props}>{children}</CustomTextEllipsis>
  )
}
