import React, { useEffect, useState } from "react";
import { GoStar } from "react-icons/go";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { ProductReview } from "src/models/product-review";
import { Button, Container, Heading, Text, clx } from "@medusajs/ui";

const ReviewWidget = ({ product, notify }: ProductDetailsWidgetProps) => {
  const [reviews, setReviews] = useState<ProductReview[] | null>(null);

  useEffect(() => {
    fetch(`/products/${product.id}/reviews`, {
      credentials: "include",
    })
    .then((response) => response.json()) // Parse JSON data here
    .then((data) => setReviews(data.product_reviews)) // Use parsed data
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container className="flex flex-col text-ui-fg-subtle mt-10 h-auto px-2">
        <Heading level="h1" className="text-ui-fg-base">Get started</Heading>
      {!reviews && (
        <Text>There are no reviews for this product</Text>
      )}`
      {reviews &&
        reviews.length > 0 &&
        reviews?.map((review) => (
          <div key={review?.id} className="bg-slate-100 p-2 mb-2">
            <div className="flex justify-between">
              <div className="mr-4">
                <Text className="text-ui-fg-base mb-3 font-bold">
                  {review.title}
                </Text>
              </div>
              <div className="flex mr-4">
                {Array(review.rating)
                  .fill(0)
                  .map((index) => (
                    <GoStar key={index} color="yellow" size={14} />
                  ))}
              </div>
            </div>
            <Text className="text-ui-fg-base">By {review.user_name}</Text>
            <br />
            <Text>{review.content}</Text>
            <br />
            <Text className="text-ui-fg-base">{new Date(review?.created_at).toDateString()}</Text>
          </div>
        ))}
    </Container>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default ReviewWidget;
