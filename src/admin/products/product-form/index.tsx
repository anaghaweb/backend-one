import type { WidgetConfig } from "@medusajs/admin"
import Reviews from "./sections/reviews"
import { useParams } from "react-router-dom"

export default function Product_form () {
    const {id} = useParams()
    if(!id){
        return null
    }
    return (
        <div className="mt-large">
  <Reviews id={id} />
</div>
    )
}

export const config: WidgetConfig = {  
    zone: "product.details.after",  
  }  
    
  