import './index.scss'

interface InputProps {
  label: string,
  type: any,
  value: string,
  setValue: (s: string) => void
}

const Input = (props: InputProps) => {

  return (
    <div className="input-container">
      <label className="input-label">
        {props.label}
        <input
          className="input-field"
           type={props.type}
           onChange={(e) => props.setValue(e.target.value)}
           value={props.value}
        />
      </label>
    </div>
  )
}

export default Input