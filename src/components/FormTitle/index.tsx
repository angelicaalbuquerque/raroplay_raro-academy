import "./FormTitle.css";

type FormTitleProps = {
  title: string;
};

export const FormTitle: React.FC<FormTitleProps> = (props) => {
  return <h2 className="formTitle">{props.title}</h2>;
};
