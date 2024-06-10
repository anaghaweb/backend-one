import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
// import Reviews from "./sections/reviews";
import { useParams } from "react-router-dom";
import React from 'react';

const ProductForm = ({product, notify}:ProductDetailsWidgetProps) => {
    const {id} = useParams()
    if(!id){
        return <h1 className="text-center text-xl">No products found</h1>
    }
    return (
        <div className="mt-large">
            {/* <h1>Product <span>{product.title}</span> Reviews</h1> */}
  {/* <Reviews id={product.id} /> */}
</div>
    )
};

export const config: WidgetConfig = {  
    zone: "product.details.after",  
  }  

  export default ProductForm;
    
  