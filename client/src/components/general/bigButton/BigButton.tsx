import "./index.scss"

interface BigButtonProps {
  text: string,
  onClick: any,
  args?: any
}

const BigButton = (props: BigButtonProps) => {

  return (
    <button className="big-button" type="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default BigButton;