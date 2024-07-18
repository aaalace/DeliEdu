import "./index.scss"

interface ButtonProps {
  text: string,
  onClick: any,
  args?: any,
  customizeClassName?: string
}

const Button = (props: ButtonProps) => {

  return (
    <button
      className={props.customizeClassName || "button"}
      type="button"
      onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button