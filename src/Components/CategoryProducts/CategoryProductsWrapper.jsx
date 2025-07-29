import { useParams } from 'react-router-dom';
import CategoryProducts from '../../Components/CategoryProducts/CategoryProducts';

export default function CategoryProductsWrapper() {
  const { id } = useParams();
  return <CategoryProducts categoryId={id} />;
}