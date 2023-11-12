const ImageContainer = ({ url, name, ...props }: { url: any, name?: string }) => {
  return (
    <img width={'100%'} height={'100%'} src={`${import.meta.env.VITE_API_IMAGE_URL}${url}`} alt={name} loading='lazy' {...props} />
  )
}

export default ImageContainer