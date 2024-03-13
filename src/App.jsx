import { useState, useEffect } from "react";
import { Card } from "antd";

export default function App() {
  const { Meta } = Card;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);

  function onClickButton() {
    setCart(false);
  }

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
    // setCart(false);
  }, []);

  if (!cart) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen mx-auto bg-slate-800">
        <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              ! Add to Cart Under Development
            </h4>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            This feature is currently under development. Please wait for further
            updates. We appreciate your patience and understanding.
          </p>
          <div className="flex justify-between gap-2">
            <a
              href="https://github.com/sumonta056"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Follow Me
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 5h12M8 1l4 4-4 4"
                ></path>
              </svg>
            </a>

            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setCart(true)}
            >
              Go Back
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 5h12M8 1l4 4-4 4"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              height: 520,
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
              description={
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.description}
                </div>
              }
            />
            <div className="flex flex-col justify-between">
              <div className="mt-2 text-lg">
                Discount: {product.discountPercentage}%
              </div>
              <div className="text-lg">Rating: {product.rating}</div>
              <div className="text-lg">Stock: {product.stock}</div>
              <div className="text-lg">Brand: {product.brand}</div>
              <div className="text-lg">Category: {product.category}</div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-bold">${product.price}</span>
                <button
                  className="text-white bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={onClickButton}
                >
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
