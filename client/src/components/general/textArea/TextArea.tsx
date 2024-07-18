import './index.scss'

interface TextAreaProps {
  label: string,
  value: string,
  setValue: (s: string) => void,
  maxLength: number
}

const TextArea = (props: TextAreaProps) => {

  return (
    <div className="textarea-container">
      <label className="textarea-label">
        {props.label}
        <textarea
          className="textarea-field"
          onChange={(e) => props.setValue(e.target.value)}
          value={props.value}
          maxLength={props.maxLength}
        />
      </label>
      <div className="counter"
      >
        {props.value.length} / {props.maxLength}
      </div>
    </div>
  )
}

export default TextArea;