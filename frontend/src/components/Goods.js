// import React, { useState } from 'react';

// import productImage from '../public/logo.png'; // 이미지 파일 경로

// const ProductList = () => {
//   const [products] = useState([
//     { id: 1, name: '운동화', price: 50000 },
//     { id: 2, name: '요가 매트', price: 30000 },
//     { id: 3, name: '핸드웨이트', price: 20000 },
//     { id: 4, name: '스포츠 워치', price: 150000 },
//   ]);

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-3xl font-bold text-center mt-10">운동용품 쇼핑몰</h1>
//       <ul className="grid grid-cols-2 gap-4 mt-8">
//         {products.map((product) => (
//           <li key={product.id} className="bg-white rounded-lg shadow-md p-4">
//             <img src={productImage} alt={product.name} className="w-full h-40 object-cover mb-4" />
//             <h2 className="text-lg font-bold">{product.name}</h2>
//             <p className="text-gray-600">가격: {product.price}원</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
