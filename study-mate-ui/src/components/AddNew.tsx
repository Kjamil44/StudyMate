import { Link } from 'react-router-dom';
import "./AddNew.css";

type Props = {
  title: string;
  state?  : Record<string, any | undefined>;
  style?: {};
};

const AddNew: React.FC<Props> = ({ title, state, style }) => {
  console.log(style);

  return (
    <div className="p-3 cursor-pointer" style={{maxWidth: "280px"}}>
      <Link
        className="add-new__container"
        to={'create'}
        state={state}
        style={style}
      >
        <svg className='add-new__icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="add-square"> <g> <rect data-name="--Rectangle" fill="none" height="20" id="_--Rectangle" rx="2" ry="2" stroke="#678983" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="20" x="2" y="2"></rect> <line fill="none" stroke="#678983" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="15.5" x2="8.5" y1="12" y2="12"></line> <line fill="none" stroke="#678983" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="15.5" y2="8.5"></line> </g> </g> </g> </g></svg>
        <div className="add-new__text">{title}</div>
      </Link>
    </div>
  );
};

export default AddNew;
