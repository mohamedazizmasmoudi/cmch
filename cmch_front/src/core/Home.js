import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Menu from './Menu';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
<<<<<<< HEAD
        <Layout
            title=""
            description="Node React E-commerce App"
            className="container-fluid"
        >
            
=======
        <>
        <Menu />
>>>>>>> 4ebf1f4bf8e542ed1f7ca750deee3338fb2a663b
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="container row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="container row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
