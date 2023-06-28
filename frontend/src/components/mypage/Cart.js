import React, { useState } from 'react';

function Cart() {
  const [products, setProducts] = useState([]);

  // Replace dummyData with your own data
  const dummyData = [
    { id: 1, name: '아령', price: 1500, quantity: 1},
    { id: 2, name: '프로틴', price: 2000, quantity: 1},
    { id: 3, name: '악력기', price: 3000, quantity: 1},
  ];

  const handleAddToCart = (product) => {
    const existingProduct = products.find((p) => p.id === product.id);
  
    if (existingProduct) {
      window.alert('이미 장바구니에 동일한 상품이 있습니다.');
      return;
    }
    setProducts([...products, product]);
  };
  
  const handleRemoveFromCart = (product) => {
    const updatedProducts = [...products];
    updatedProducts.splice(product, 1);
    setProducts(updatedProducts);
  };
  
  const handleIncreaseQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedQuantity = product.quantity + 1;
        const updatedPrice = product.price + product.price / product.quantity;
        
    console.log("Current product price:", product.price);

        return {
          ...product,
          quantity: updatedQuantity,
          price: updatedPrice,
        };
      }
      return product;
    });
  
    setProducts(updatedProducts);
  };
  
  const handleDecreaseQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedQuantity = product.quantity - 1;
        const updatedPrice = product.price - product.price / product.quantity;
  
        return {
          ...product,
          quantity: updatedQuantity,
          price: updatedPrice,
        };
      }
      return product;
    });
  
    setProducts(updatedProducts);
  };


  const handleToggleCheck = (productId) => {
    const updatedProducts = [...products];
    const productIndex = updatedProducts.findIndex((product) => product.id === productId)
    if(productIndex !== -1) {
    updatedProducts[productIndex].checked = !updatedProducts[productIndex].checked;
    setProducts(updatedProducts);
    }
  };


  return (
    <div className="max-w-md mx-auto p-4 text-left">
      <h2 className="text-xl font-bold mb-4">운동용품</h2>
      {dummyData.map((product) => (
        <div key={product.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-10"
            checked={product.checked || false}
            onChange={(event) => handleToggleCheck(product.id, event)}
          />
          <span>{product.name}</span>
          <span className="text-gray-500 ml-auto mr-10">{`${product.price}원`}</span>

          <span><button onClick={() => handleDecreaseQuantity(product.id)} className='bg-green-700 text-white px-2 py-1 rounded'>-</button></span>

          <span className='ml-3 mr-3'>{product.quantity}</span>

          <span><button onClick={() => handleIncreaseQuantity(product.id)} className='bg-green-700 text-white px-2 py-1 rounded'>+</button></span>

          <button
            onClick={() => handleAddToCart(product)}
            className="bg-green-700 text-white px-2 py-1 rounded ml-2"
            >
            장바구니 담기
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4 mb-2">장바구니</h2>
      {products.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
          ) : (
              <ul className="list-none">
          {products.map((product, index) => (
              <li key={product.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={product.checked || false}
                onChange={() => handleToggleCheck(index)}
                />
              <span>{product.name}</span>

              <span><button onClick={() => handleDecreaseQuantity(product.id)} className='bg-green-700 text-white px-2 py-1 rounded ml-8'>-</button></span>
        
              <span className='ml-3 mr-3'>{product.quantity}</span>
        
              <span><button onClick={() => handleIncreaseQuantity(product.id)} className='bg-green-700 text-white px-2 py-1 rounded'>+</button></span>
            
              <span className="text-gray-500 ml-auto">{`${product.price}원`}</span>
              <button
                onClick={() => handleRemoveFromCart(index)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                장바구니 삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
