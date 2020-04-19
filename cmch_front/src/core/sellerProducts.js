import React from "react"
import { useEffect, useState } from "react"
import Card from "./Card";
import { getSellerProduct} from "./apiCore";



const ShowProducts = props =>{
    const [product, setProduct] = useState(0)
   
    useEffect(()=>{
        const sellerId = props.match.params.sellerId
        getSellerProduct(sellerId).then(
            data => {setProduct(data.product)}
        )
    },[])

    return (
        <div>
             <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {console.log(product)}
                        {Object.keys(product).map((key, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product[key]} />
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