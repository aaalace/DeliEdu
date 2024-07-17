import "./index.scss"

interface CustomHRProps {
  text: string
}

const CustomHR = ({text}: CustomHRProps) => {
  return (
    <div className="custom-hr">
      <div>{text}</div>
      <hr></hr>
    </div>
  )
}

export default CustomHR;