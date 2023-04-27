type Props = React.ComponentProps<'input'> & {
  label?: string;
  type?: React.ComponentProps<'input'>['type'];
  error?: boolean;
};

const Input: React.FC<Props> = (props) => {
  return (
    <div className="form-group">
      {props.label && (
        <label htmlFor={`input-${props.name}`}>{props.label}</label>
      )}
      <input
        id={`input-${props.name}`}
        className={`form-control bg-light ${props.error ? 'border border-danger' : ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;
