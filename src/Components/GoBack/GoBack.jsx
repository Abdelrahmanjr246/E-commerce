import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function GoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      onClick={goBack}
      className="back-icon flex-shrink-0 self-start ms-6 cursor-pointer size-[35px] rounded-full bg-primary flex justify-center items-center duration-300 hover:-translate-x-1 hover:scale-105"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
    </button>
  );
}
