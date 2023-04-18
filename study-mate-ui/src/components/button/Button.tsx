type Props = React.ComponentProps<'button'> & {
  label?: string;
  fullwidth?: boolean;
  buttonType?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'ghost';
};

const Button: React.FC<Props> = ({
  className,
  label,
  fullwidth,
  buttonType = 'primary',
  ...props
}) => {
  return (
    <button
      className={`${className} btn btn-${buttonType} ${
        fullwidth ? 'w-100' : ''
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
