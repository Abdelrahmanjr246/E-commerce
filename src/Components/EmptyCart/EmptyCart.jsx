import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import GoBack from '../goBack/goBack';

export default function EmptyCart() {
  return (
    <section className=" bg-mainBg p-5 m-4  rounded-3xl">
        <header className="flex items-center gap-6">
            <GoBack/>
            <h2 className="flex items-center gap-2">
                <span className="text-2xl font-bold text-darkPrimary">Shop Cart</span>
                <FontAwesomeIcon icon={faOpencart} className="text-primary" />
            </h2>
        </header>
        <footer className="p-5 m-16 flex flex-col justify-center items-center gap-2 text-center">
            <p className="text-nowrap text-darkPrimary">There are no items yet.</p>
            <Link className="btn text-nowrap " to={'/products'}>Add Your First Product To Cart</Link>
        </footer>
    </section>

  )
}
