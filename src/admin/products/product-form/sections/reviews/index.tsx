import React, { useEffect, useState } from "react"
import {GoStar} from "react-icons/go";
import Card from "src/admin/components/shared/card"
import type { WidgetConfig } from "@medusajs/admin"
import { ProductReview } from "src/models/product-review";

const Reviews = ({ id }:{
  id:string
}) => {
  const [reviews, setReviews] = useState<ProductReview[] | null>(null)

  useEffect(() => {
    fetch(`/admin/products/${id}/reviews`, {
      credentials: "include",
    })
    .then((response) => response.json())
    .then(({ product_reviews }) => {
      setReviews(product_reviews);
    })
    .catch((e) => console.error(e));
  }, []);
  

  return (
    <Card>
            {reviews?.length === 0 &&  <span>There are no reviews for this product</span>}
      {reviews?.length &&
        reviews?.map((review) => (
          <div key={review?.id} className="bg-slate-100 p-2 mb-2"      
          >
            <div 
                style={{display:'flex', justifyContent:'space-between'}}
           >
              <div style={{marginRight:4}}>
                <p style={{fontWeight:700, marginBottom:3}} >
                  {review.title}
                </p>
              </div>
              <div style={{marginRight:4}}>
                {Array(review.rating)
                  .fill(0)
                  .map(() => (
                    <GoStar color="yellow" size={16}/>
                  ))}
              </div>
            </div>
            <p >By {review.user_name}</p>
            <br />
            <p>{review.content}</p>
            <br />
            <p>{review?.created_at.toDateString()}</p>
            
          </div>
        ))}
    </Card>
  )
}

export default Reviews
  
