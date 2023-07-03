import React from "react";
import { Link } from 'react-router-dom';

const ProductDetail = ({Product}) =>{
    return(
        <React.Fragment>
        <div key={Product.proNo} className="shadow-md rounded-lg p-4">
            <img src={Product.thumbnail.uploadFileName} alt={Product.proName} className="w-48 h-48 mx-auto" />
            <hr className="border m-3" />
            <div className="font-bold text-right">{Product.proName}</div>
            <div className="text-right">{Product.proContent}</div>
            <div className="text-right">{Product.proPrice}원</div>
        </div>
        <button type="button" className="" > 담기</button>
        <button type="button" className="" > 구매
            <Link to =""></Link>
        </button>
        </React.Fragment>
    )
}

export default ProductDetail;