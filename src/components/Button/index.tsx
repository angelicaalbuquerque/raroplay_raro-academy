import "./Button.css";

type ButtonProps = {
  type?: "submit";
  disabled?: boolean;
  children: string;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  disabled = false,
}) => {
  return (
    <button type={type} disabled={disabled} className="btnForm">
      <p>{children}</p>
    </button>
  );
};
