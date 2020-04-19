import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import {Link} from "react-router-dom";
import Footer from "./Footer";
import Menu from "./Menu";


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            console.log(data)
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.sellercategoryy);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.sellercategoryy]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };


    return (
        <>
        <Menu />
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                    </ul>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Sellers</h2>
                    <div className="row">
                        {filteredResults.map((seller, i) => (
                            <div key={i} className="col-4 mb-3">
                                <div className="card ">
                                    <div className="card-header card-header-1 ">{seller.name}</div>
                                    <Link to={`/shop/seller/${seller._id}`}>check seller</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
            <Footer position/>
        </>
    );
};

export default Shop;
