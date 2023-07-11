import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardModify = () => {
  const { freeNo } = useParams();
  const navigate = useNavigate();
  const [freeTitle, setFreeTitle] = useState('');
  const [freeContent, setFreeContent] = useState('');
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedImageNames, setSelectedImageNames] = useState([]);
  const [uploadFileName, setUploadFileName] = useState('');
  const [storeFileName, setStoreFileName] = useState('');


  useEffect(() => {
    // freeNo를 사용하여 기존 글의 정보를 불러오는 로직 구현

    const fetchBoardData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/free/${freeNo}`);
        const boardData = res.data;
        console.log(boardData);
        setFreeTitle(boardData.freeTitle);
        setFreeContent(boardData.freeContent);
        setSelectedFileName(boardData.file || '');
        setSelectedImageNames(boardData.images || []);
        setUploadFileName(boardData.file.uploadFileName || '');
        setStoreFileName(boardData.file.storeFileName || '');

      } catch (error) {
        console.error(error);
      }
    };

    fetchBoardData();
  }, [freeNo]);

  const onChangeTitle = (e) => {
    setFreeTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setFreeContent(e.target.value);
  };

  const onChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    selectedFile.uploadFileName = selectedFile.name; // uploadFileName 속성 추가
    setFile(selectedFile || ''); // 파일을 선택하지 않은 경우에도 빈 값으로 설정

     // 선택된 파일의 이름 설정
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
    } else {
      setSelectedFileName('');
    }

  };  

  const onChangeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

     // 선택된 이미지 파일들의 이름 설정
     const imageNames = files.map((file) => {
        const uploadFileName = file.uploadFileName || '';
        return {
          storeFileName: uploadFileName, // 수정된 부분: storeFileName 대신 uploadFileName 사용
          uploadFileName: file.name
        };
      });
      setSelectedImageNames(imageNames);
    };
    
    const onClickDeleteFile = () => {
        setFile(null);
        setSelectedFileName('');
      };

    const onClickDeleteImage = (imageName) => {
    const updatedImages = images.filter((image) => image.name !== imageName);
    const updatedImageNames = selectedImageNames.filter((name) => name !== imageName);

    setImages(updatedImages);
    setSelectedImageNames(updatedImageNames);
    };
    
  const onSubmitBtn = async (e) => {
    e.preventDefault();
    // 수정된 글을 업데이트하는 로직을 구현합니다.

    // 파일 삭제 요청
    if (storeFileName) {
        try {
            await axios.delete(`http://localhost:8080/api/file/${storeFileName}`);
        } catch (error) {
            console.error(error);
        }
    }

    const formData = new FormData();
    formData.append('freeTitle', freeTitle);
    formData.append('freeContent', freeContent);
    formData.append('memberNo', sessionStorage.getItem('memberNo'));

    if (file) {
        formData.append('file', file);
      } else {
        formData.append('file', new Blob([])); // 파일이 없을 경우 빈 값을 추가
      }
   
    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append(`images[${i}]`, images[i]);
        }
      } else {
        formData.append('images', new Blob([])); // 빈 값을 추가
      }
      
    
    try {
        const res = await axios.post(`http://localhost:8080/api/free/${freeNo}`, formData, {

        });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }

    // 게시판 목록으로 이동
    navigate('/board');

  };
  return (
    <div className="w-full max-w-1100 min-w-1100 m-auto">
        <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">게시글 수정</h1>
         <form onSubmit={onSubmitBtn} encType='multipart/form-data'>
                
                <table className='w-full mb-4'>
                    <tbody>
                        <tr className='border-y'>
                            <td className='bg-green-600 text-white w-40 pl-4'><label htmlFor="freeTitle" >제목</label></td>
                            <td>
                                <input type="text" className="border border-gray-300 w-[920px] h-10 m-2 p-2" id="title" value={freeTitle} onChange={onChangeTitle} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div className='w-full h-[600px] border border-gray-300 mb-10 overflow-auto'>
                    <textarea id="freeContent" className='w-[1080px] h-[460px] m-2 mb-4 resize-none focus:outline-none overflow-auto' value={freeContent} onChange={onChangeContent} />
                    
                    <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md border border-gray-300 shadow-sm py-2 px-4 mb-2 flex items-center justify-center hover:bg-gray-50 focus-within:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>파일</span>
                        <input id="file" name="file" type="file" className="sr-only" onChange={onChangeFile} />
                    </label>

                    {selectedFileName && (
                      <div className='mb-4'>
                        첨부된 파일: {uploadFileName}
                        <button type="button" onClick={onClickDeleteFile}>
                        <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-red-500 cursor-pointer"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M6 6L14 14M6 14L14 6" />
                                </svg>
                        </button>
                      </div>
                    )}

                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md border border-gray-300 shadow-sm py-2 px-4 mb-2 flex items-center justify-center hover:bg-gray-50 focus-within:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>이미지</span>
                        <input id="images" name="images" type="file" className="sr-only" onChange={onChangeImages} multiple/>
                    </label>

                    {selectedImageNames.length > 0 && (
                    <div>
                      첨부된 이미지:
                        <ul>
                            {selectedImageNames.map((image, index) => (
                                <li key={index}>
                                    {image.uploadFileName}
                                    <button type='button'
                                    onClick={() => onClickDeleteImage()}
                                    className="ml-2"
                                    >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-red-500 cursor-pointer"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 6L14 14M6 14L14 6" />
                                    </svg>
                                    </button>    
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}

                </div>

                <div className='text-center'>
                    <button type="submit" className='focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-8 mt-8 dark:bg-green-600 dark:hover:bg-green-700'>확인</button>
                </div>

        </form>

    </div>

  );
};

export default BoardModify;
