import React from "react";
import { Link } from 'react-router-dom';

const ProductDetail = ({product}) =>{
    return(
        <React.Fragment>
            <div className="product-detail-wrapper">
      <div className="product-detail-slide"></div>
        <button type="button" className="">닫기</button>
        <div key={product.proNo} className="shadow-md rounded-lg p-4">
            <img src={product.thumbnail.uploadFileName} alt={product.proName} className="w-48 h-48 mx-auto" />
            <hr className="border m-3" />
            <div className="font-bold text-right">{product.proName}</div>
            <div className="text-right">{product.proContent}</div>
            <div className="text-right">{product.proPrice}원</div>
        </div>
        <button type="button" className="" >담기</button>
        <button type="button" className="" >구매
            <Link to =""></Link>
        </button>
        </div>
        </React.Fragment>
    )
}

export default ProductDetail;