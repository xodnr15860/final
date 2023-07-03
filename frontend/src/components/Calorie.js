import {useState} from 'react';
import axios from 'axios';
import React from 'react';

const Calorie = () => {

    const [keyword, setKeyword] = useState('');
    const [resultDiv, setResultDiv] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 20;
    const maxPages = 10;

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

    // 전체 페이지 수를 계산합니다.
    const totalPages = Math.ceil(searchData.length / perPage);

    // 페이징 시작 인덱스를 계산합니다.
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));

    // 페이징 종료 인덱스를 계산합니다.
    let endPage = startPage + maxPages - 1;
    if (endPage > totalPages) {
    endPage = totalPages;
    }


    // 페이지 변경 핸들러

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const onChangeKeyword = e => {
        setKeyword(e.target.value);
    }
    
    const onClickBtn = async(e) => {
        e.preventDefault();
        
        if (!keyword) {
            alert("키워드를 입력하세요.");
            return;
        }

        try{
            const res = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/390bb6fff2df4f7888e8/I2790/json/1/999/DESC_KOR=${keyword}`, {
            
            });
            
            // console.log(res.data);
            
            if (res.data.I2790 && res.data.I2790.row) {
                const searchData = res.data.I2790.row.filter((item) => item.DESC_KOR.includes(keyword)).map((item) => ({
                    NUM: item.NUM, // 번호
                    NUTR_CONT1: item.NUTR_CONT1, // 열량
                    NUTR_CONT2: item.NUTR_CONT2, // 탄수화물
                    NUTR_CONT3: item.NUTR_CONT, // 단백질
                    NUTR_CONT4: item.NUTR_CONT4, // 지방
                    NUTR_CONT5: item.NUTR_CONT5, // 당류
                    NUTR_CONT6: item.NUTR_CONT6, // 나트륨
                    SERVING_SIZE: item.SERVING_SIZE, // 1회제공량
                    DESC_KOR: item.DESC_KOR, // 이름

                }));

                setSearchData(searchData);
                setResultDiv(true);
                
          } else {
            setSearchData([]);
            setResultDiv(false);
          }
            
        } catch (error) {
            console.log(error);
        }
    
    }

    return (
        <div className="w-full max-w-1100 min-w-1100 m-auto">
          <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">음식칼로리</h1>
      
          <section>
            <div>
              <form onSubmit={onClickBtn}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">검색</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="text" value={keyword} onChange={onChangeKeyword} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 dark:border-black dark:placeholder-gray-400 dark:focus:ring-green-700 dark:focus:border-green-700" placeholder="검색어 입력" />
                  <input type="text" value={keyword} onChange={onChangeKeyword} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 dark:border-black dark:placeholder-gray-400 dark:focus:ring-green-700 dark:focus:border-green-700" placeholder="검색어 입력" />
                  <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2">검색</button>
                </div>
              </form>
              {resultDiv && (
                <div className="mt-10 mb-20">
                    <table className='w-full'>
                        <thead>
                            <tr className='border-t border-green-700'>  
                                <th>음식명</th>
                                <th>칼로리</th>
                                <br/>
                            </tr>
                        </thead>
                        {/* 현재 페이지에 해당하는 데이터 출력 */}
                        <tbody className='mt-6'>
                            {currentItems.map((item) => (
                                <tr className='border-t border-b'>
                                    <td className='w-custom'>{item.DESC_KOR}</td>
                                    <td className='text-center'>{item.NUTR_CONT1} kcal</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              )}
            </div>
          </section>

        <nav aria-label="Page navigation example">
            
        <ul className="w-full inline-flex items-center justify-center -space-x-px">
           
            {/* 이전 페이지 버튼 */}
            {currentPage > 1 && (
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="bg-white border border-gray-300 rounded-l-lg px-3 py-2 hover:bg-gray-100 dark:border-gray-700">
                <span className="sr-only">이전</span>
                <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                ></path>
                </svg>
            </button>
            )}

            {/*페이지 갯수 */}
            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                <li key={startPage + index}>
                    <p className={`px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 ${currentPage === startPage + index ? "z-10 border-blue-300 bg-green-600 hover:bg-green-700" : ""}`}
                        onClick={() => onPageChange(startPage + index)}>
                        {startPage + index}
                    </p>
                </li>
            ))}

            {/* 다음 페이지 버튼 */}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="bg-white border border-gray-300 rounded-r-lg px-3 py-2 hover:bg-gray-100 dark:border-gray-700">
                        <span className="sr-only">다음</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                </button>
            )}

            </ul>
          </nav>
        </div>
      );
      
};

export default Calorie;