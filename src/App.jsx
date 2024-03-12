import { useState, useEffect } from "react";
import { Card } from "antd";

export default function App() {
  const { Meta } = Card;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true); //  Go to loading state
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        setError(true);
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setProducts(jsonData.products);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false); // Stop Loading State
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error in Fetching</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto bg-slate-800">
      <div className="flex flex-wrap items-center justify-center h-full gap-8 mx-auto">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable={true}
            bordered={true}
            style={{
              width: 330,
              height: 560,
            }}
            cover={
              <img
                alt="example"
                style={{ height: "200px" }}
                src={product.thumbnail}
              />
            }
          >
            <Meta
              title={
                <span
                  style={{
                    fontSize: "24px",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  {product.title}
                </span>
              }
              description={product.description}
            />
            <div className="flex flex-col justify-end h-full">
              <div className="mt-2 text-lg">
                Discount: {product.discountPercentage}%
              </div>
              <div className="text-lg">Rating: {product.rating}</div>
              <div className="text-lg">Stock: {product.stock}</div>
              <div className="text-lg">Brand: {product.brand}</div>
              <div className="text-lg">Category: {product.category}</div>

              <div className="flex items-center justify-between bottom-3">
                <span className="text-2xl font-bold">${product.price}</span>
                <button className="text-white bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Add to cart
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
