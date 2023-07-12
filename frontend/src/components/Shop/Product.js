import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이지 데이터를 가져오는 함수
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/shop", {
        params: {
          page: page,
        },
      });
      const data = response.data;
      setPageInfo(data.pageInfo);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // 페이지 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const calculatePagination = () => {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(pageInfo.maxPage, currentPage + 2);

      return {
        startPage,
        endPage,
        maxPage: pageInfo.maxPage,
        currentPage,
      };
    };

    if (Object.keys(pageInfo).length > 0) {
      const paginationInfo = calculatePagination();
      if (paginationInfo.startPage !== pageInfo.startPage || paginationInfo.endPage !== pageInfo.endPage) {
        setPageInfo(paginationInfo);
      }
    }
  }, [products, currentPage, pageInfo]);

  // 페이지 변경 시 호출되는 콜백 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-1100 min-w-1100 m-auto">
          <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">SHOP </h1>
          <div className="m-4 max-w-screen-xl mx-auto mt-52">
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-x-32 gap-y-20">
                {products.map((product) => (
                  <Link to={"/shop/" + product.proNo} key={product.proNo}>
                    <div className="shadow-md rounded-lg p-4">
                      <img src={`/api/image/${product.thumbnail.storeFileName}`} alt="Product Thumbnail" className="w-48 h-48 mx-auto" />
                      <hr className="border m-3" />
                      <div className="font-bold text-right">{product.proName}</div>
                      <div className="text-right">{product.proPrice}원</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {pageInfo && Object.keys(pageInfo).length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default Product;
