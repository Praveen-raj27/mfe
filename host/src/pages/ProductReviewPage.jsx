import { useParams } from "react-router-dom";
import ReviewApp from "reviews/ReviewApp";

export default function ProductReviewPage() {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Reviews</h1>

      <p>Product ID: {productId}</p>

      <ReviewApp productId={Number(productId)} />
    </div>
  );
}