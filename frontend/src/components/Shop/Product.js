import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [products, setProducts] = useState([]);



  // 하드 코딩 더미 데이터
  const hardcodedProduct = {
    proNo: 1,
    thumbnail: { uploadFileName: "product1.jpg" },
    proName: "상품 1",
    proContent: "상품 1 상세 정보",
    proPrice: 10000,
  };

  // 페이지 데이터를 가져오는 함수
  const fetchProducts = async (page) => {
    try {
      const response = await axios.get("http://localhost:8080/shop", {
        params: {
          page: page,
        },
      });
      const data = response.data;
      setPageInfo(data.pageInfo);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 페이지 변경 시 데이터 다시 가져오기
  useEffect(() => {
    setProducts([hardcodedProduct]); // 더미 데이터 ( 추후 삭제 )
    fetchProducts(currentPage);
  }, [currentPage]);

  // 페이지 변경 시 호출되는 콜백 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculatePagination = () => {
    const productsPerPage = 20;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    return {
      startPage,
      endPage,
      maxPage: totalPages,
      currentPage,
    };
  };

  const paginationInfo = calculatePagination();

  return (
    <div className="m-4 max-w-screen-xl mx-auto mt-52">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-x-32 gap-y-20">
          {products.map((product) => (
            <Link to={"/shop/" + product.proNo} key={product.proNo}>
              <div className="shadow-md rounded-lg p-4">
                <img src={product.thumbnail.uploadFileName} alt={product.proName} className="w-48 h-48 mx-auto"/>
                <hr className="border m-3" />
                <div className="font-bold text-right">{product.proName}</div>
                <div className="text-right">{product.proPrice}원</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {pageInfo && Object.keys(pageInfo).length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination pageInfo={paginationInfo} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default Product;