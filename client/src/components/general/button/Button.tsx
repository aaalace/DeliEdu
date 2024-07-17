import "./index.scss"

interface ButtonProps {
  text: string,
  onClick: any,
  args?: any
}

const Button = (props: ButtonProps) => {

  return (
    <button className="button" type="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button