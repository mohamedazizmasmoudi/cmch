import React from "react"
import { useEffect, useState } from "react"
import Card from "./Card";
import { getSellerProduct} from "./apiCore";



const ShowProducts = (props) =>{
    const [product, setProduct] = useState(0)
    useEffect(()=>{
        const sellerId = this.props.match.params
        console.log(sellerId)
        getSellerProduct(sellerId).then(
            data => {if(!data.error) setProduct(data)}
        )
    },[])

    return (
        <div>
             <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {product.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {/* {loadMoreButton()} */}
                </div>
        </div>
    )
}

export default ShowProducts