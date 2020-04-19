import React from "react"
import { useEffect, useState } from "react"
import Card from "./Card";
import { getSellerProduct} from "./apiCore";



const ShowProducts = props =>{
    const [product, setProduct] = useState(0)
   
    useEffect(()=>{
        const sellerId = props.match.params.sellerId
        getSellerProduct(sellerId).then(
            data => {setProduct(data)}
        )
    },[])

    return (
        <div>
             <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
<<<<<<< HEAD
                        {console.log(product)}
=======
>>>>>>> 5fcebfd743f56f91599a727786ec19da2efa9f12
                        {/* {product.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))} */}
                    </div>
                    <hr />
                    {/* {loadMoreButton()} */}
                </div>
        </div>
    )
}

export default ShowProducts