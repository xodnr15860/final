import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import qs from 'qs';

const BoardDetail = () => {
    const [boardData, setBoardData] = useState(null);
    const [freeReContent, setFreeReContent] = useState('');
    const [replies, setReplies] = useState([]);
    const [images, setImages] = useState([]);
    const [deletedReplyIds, setDeletedReplyIds] = useState([]);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [commentTextareaInitialValue, setCommentTextareaInitialValue] = useState('');

    
    const { freeNo } = useParams();
    
    const memberNo = sessionStorage.getItem('memberNo');
    
    const formData = qs.stringify({
      memberNo: memberNo,
      freeReContent: freeReContent
    });
    
    const formatDate = (dateString) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
      };
      
      return new Date(dateString).toLocaleString('ko-KR', options);
    };
    
    const fetchBoardData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/free/${freeNo}`);
        setBoardData(res.data);
        setReplies(res.data.replies);
        setImages(res.data.images);
      } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => {
        fetchBoardData();
        setCommentTextareaInitialValue(''); // 추가: 댓글 작성 textarea 초기화
      }, [freeNo]);
    
      // 댓글 작성 버튼
      const onClickSubmitBtn = async (e) => {
        e.preventDefault();
        
        if (freeReContent.trim() === '') {
            alert('내용을 입력해주세요.');
            return;
          }
        
        try {
          await axios.post(`http://localhost:8080/api/free/${freeNo}/reply`, formData);
          setFreeReContent('');
          fetchBoardData();
        } catch (error) {
          console.error(error);
        }
      };

      // 댓글 삭제 함수
      const onClickDeleteReply = async (freeReNo) => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed) {
          return;
        }

        try {
          await axios.delete(`http://localhost:8080/api/free/${freeNo}/reply/${freeReNo}`);
          setDeletedReplyIds((prevIds) => [...prevIds, freeReNo]);
        } catch (error) {
          
        }
      };

      // 댓글 수정 취소 함수
      const onClickCancelEditReply = (freeReNo) => {
        setReplies(
          replies.map((reply) =>
            reply.freeReNo === freeReNo ? { ...reply, freeReContent: reply.originalContent } : reply
          )
        );
        setEditingReplyId(null);
        setFreeReContent(''); // 취소 시 freeReContent 초기화
        setCommentTextareaInitialValue(''); // 수정된 댓글 이후에는 댓글 작성 textarea를 비워줌
      };
      
      // 댓글 수정 하는 버튼
      const onClickEditReply = (freeReNo) => {
        const reply = replies.find((reply) => reply.freeReNo === freeReNo);
        if (reply) {
          setEditingReplyId(freeReNo);
          setReplies(
            replies.map((r) =>
              r.freeReNo === freeReNo ? { ...r, originalContent: r.freeReContent } : r
            )
          );
          setFreeReContent(reply.freeReContent); // 수정된 내용을 freeReContent에 저장
          setCommentTextareaInitialValue(reply.freeReContent); // 수정된 내용을 commentTextareaInitialValue에 저장
          setFreeReContent(''); // 댓글 작성 textarea를 비움
        }
      };
    
      // 댓글 수정 다 하고 최종 버튼
      const onUpdateReply = async (freeReNo, updatedContent) => {
        if (!memberNo || updatedContent === null) {
          return; // memberNo가 없거나 updatedContent가 null인 경우 요청을 보내지 않음
        }

        const updatedFormData = qs.stringify({
          memberNo: memberNo,
          freeReContent: updatedContent || ''
        });
        
        try {
          await axios.post(`http://localhost:8080/api/free/${freeNo}/reply/${freeReNo}`, updatedFormData);
          setEditingReplyId(null);
          fetchBoardData();
          setCommentTextareaInitialValue(''); // 수정된 댓글 이후에는 댓글 작성 textarea를 비워줌
        } catch (error) {
          console.error(error);
        }
      };
      

      return (
        <div className="w-full max-w-1100 min-w-1100 m-auto mb-10">
         <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">일반게시판</h1>
            {boardData && (
            <div className="w-full max-w-1100 min-w-1100 m-auto mb-10">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h1 className="text-3xl font-bold mb-4">{boardData.freeTitle}</h1><hr className='border-green-200'/><br/>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-800 mr-2 font-semibold">{boardData.nickname}</p>
                            <div className='flex justify-end mr-10'>
                            {boardData.freeCreateDate === boardData.freeModifyDate ? (
                                <p className="text-sm">{formatDate(boardData.freeCreateDate)}</p>
                            ) : (
                                <>
                                <p className="text-sm">{formatDate(boardData.freeModifyDate)}</p>
                                </>
                            )}
                            </div>
                        </div><hr className='border-green-200'/><br/>
                        <p className="text-black text-4xl mb-20">{boardData.freeContent}</p>
                        <div>
                            {images.map((image, index) => (
                            <div key={index}>
                                <img src={`http://localhost:8080/api/image/${image.storeFileName}`} alt="{image.uploadFileName}" />
                            </div>
                            ))}
                        </div>
                        {boardData.file && (
                            <div className='mb-4'>
                                <a href={`http://localhost:8080/api/download/${boardData.file.storeFileName}`}><p>파일: {boardData.file.uploadFileName}</p></a>
                            </div>
                        )}
                </div>

                {/* 댓글 리스트 */}
                <div className="bg-white shadow-md rounded-md mt-6 p-6">
                    <h2 className="text-2xl font-bold mb-4">댓글</h2>

                    {replies.map((reply) => {
                      const isDeleted = deletedReplyIds.includes(reply.freeReNo);
                      const isEditable = reply.memberNo === parseInt(memberNo); // 댓글의 memberNo와 로그인 된 memberNo 비교
                      const isEditing = editingReplyId === reply.freeReNo;

                      if (isDeleted) {
                        return null; // 삭제된 댓글은 렌더링하지 않음
                      }

                    return (
                    <div key={reply.freeReNo} className="bg-gray-100 p-4 rounded-md mb-4">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                            <p className="mr-2 font-bold">{reply.nickname}</p>
                            <p className='mr-4'>{formatDate(reply.freeReCreateDate)}</p>
                            {/* memberNo가 있을 때 수정,삭제 버튼 활성화 */}
                            {isEditable && !isEditing && (
                            <div className="flex items-center text-gray-500 text-sm">
                              <button onClick={() => onClickEditReply(reply.freeReNo)} className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-black cursor-pointer"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                    <path d="M12.357 3.318l1.325-1.326a1 1 0 0 1 1.413 0l1.95 1.95a1 1 0 0 1 0 1.414L9.636 13.232a1 1 0 0 1-0.707 0.293L6 12l6-6L12.357 3.318z" />
                                </svg>
                              </button>
                              <button onClick={() => onClickDeleteReply(reply.freeReNo)}>
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
                            </div>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="flex items-center mb-2">
                            <textarea
                              className="w-[860px] border border-black resize-none focus:outline-none overflow-auto mr-2"
                              value={reply.freeReContent}
                              onChange={(e) => setReplies(replies.map((r) => (r.freeReNo === reply.freeReNo ? { ...r, freeReContent: e.target.value } : r)))}
                            />
                            <button
                              onClick={() => onUpdateReply(reply.freeReNo, reply.freeReContent)}
                              className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-3 ml-2 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => onClickCancelEditReply(reply.freeReNo)}
                              className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-3 ml-2 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-800 mb-2">{reply.freeReContent}</p>
                        )}
                    </div>
                    );
                        })}

                    {memberNo && (
                    <form onSubmit={onClickSubmitBtn}>
                        <div className='flex'> 
                        <textarea className='w-[935px] h-12 m-auto border border-black mr-4 resize-none focus:outline-none overflow-auto' value={freeReContent} onChange={(e) => setFreeReContent(e.target.value)} />
                        <button type="submit" className='focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-8 mt-8 dark:bg-green-600 dark:hover:bg-green-700'>댓글 작성</button>
                        </div>
                    </form>
                    )}

                </div>

            </div>
        )}

        </div>
      );
    };


export default BoardDetail;