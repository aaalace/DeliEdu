interface ErrorBlockProps {
  message: string
}

const ErrorBlock = ({message}: ErrorBlockProps) => {
  return (
    <div style={{color: "red", height: "40px"}}>
      {message}
    </div>
  )
}

export default ErrorBlock