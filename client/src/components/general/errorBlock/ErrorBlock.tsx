interface ErrorBlockProps {
  message: string
}

const ErrorBlock = ({message}: ErrorBlockProps) => {
  return (
    <div style={{color: "red"}}>
      {message}
    </div>
  )
}

export default ErrorBlock