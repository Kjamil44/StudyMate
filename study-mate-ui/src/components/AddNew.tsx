import { Link } from 'react-router-dom';

type Props = { title: string };

const AddNew: React.FC<Props> = ({ title }) => {
  const borderDashed = {
    border: '0.5px dashed #4e4e4e',
  };

  return (
    <div className="col-12 col-md-4 col-lg-4 p-3 cursor-pointer">
      <Link
        className="text-decoration-none d-flex flex-column justify-content-center align-items-center rounded rounded-3 h-100 w-100 p-5"
        style={borderDashed}
        to={'create'}
      >
        <div className="mb-1 bg-success text-dark rounded rounded-circle px-2 d-flex align-items-center justify-content-center">
          +
        </div>
        <div className="fs-14px fw-bold text-dark">{title}</div>
      </Link>
    </div>
  );
};

export default AddNew;