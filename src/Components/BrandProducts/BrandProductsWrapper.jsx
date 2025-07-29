import React from 'react'
import { useParams } from 'react-router-dom';
import BrandProducts from './BrandProducts';

export default function BrandProductsWrapper() {
  const { id } = useParams();
  return <BrandProducts brandId={id} />;
}
