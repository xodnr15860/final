import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Admin = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        memberData();
    }, []);

    const memberData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/member');
            const membersData = response.data.members;
            console.log(membersData);
            setMembers(membersData);
          } catch (error) {
            console.error(error);
          }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', options);
      };

    const onChangeStatus = async (memberNo, status) => {
    try {
        const formData = new URLSearchParams();
        formData.append('status', status);
    
        const response = await axios.post(`http://localhost:8080/api/admin/member/${memberNo}/status`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        });
        console.log(response.data);
        const updatedMembers = members.map((member) =>
        member.memberNo === memberNo ? { ...member, memberStatus: status } : member
      );
      setMembers(updatedMembers);
        
    } catch (error) {
        console.error(error);
    }
    };

    const onChangeAdmin = async (memberNo, role) => {
    try {
        const formData = new URLSearchParams();
        formData.append('role', role);
    
        const response = await axios.post(`http://localhost:8080/api/admin/member/${memberNo}/role`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        });
        console.log(response.data);
        const updatedMembers = members.map((member) =>
        member.memberNo === memberNo ? { ...member, memberAdmin: role } : member
      );
      setMembers(updatedMembers);
    } catch (error) {
        console.error(error);
    }
    };

    return (
        <div className='w-full max-w-[1450px] min-w-[1400px] m-auto mt-6 ml-[300px]'>
            <h1 className="text-3xl font-bold text-green-700 border-b-2 border-green-700 mb-8">회원 관리</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-white dark:text-white">
                    <thead className="text-xs text-white uppercase bg-green-400 dark:bg-green-400 dark:text-black">
                        <tr>
                            <th scope="col" className="px-2 py-3 text-center">회원번호</th>
                            <th scope="col" className="px-5 py-3 text-center">회원아이디</th>
                            <th scope="col" className="px-1 py-3 text-center">이름</th>
                            <th scope="col" className="px-3 py-3 text-center">닉네임</th>
                            <th scope="col" className="px-6 py-3 text-center">이메일</th>
                            <th scope="col" className="px-6 py-3 text-center">전화번호</th>
                            <th scope="col" className="px-6 py-3 text-center">주소</th>
                            <th scope="col" className="px-3 py-3 text-center">가입일자</th>
                            <th scope="col" className="px-10 py-3 text-center">회원상태</th>
                            <th scope="col" className="px-6 py-3 text-center">관리자</th>
                        </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr key={member.memberNo} className="bg-white border-b dark:bg-green-800 dark:border-gray-700">
                            <td className="px-6 py-4 text-center">{member.memberNo}</td>
                            <td className="px-5 py-4 text-center">{member.memberId}</td>
                            <td className="px-2 py-4 text-center">{member.name}</td>
                            <td className="px-1 py-4 text-center">{member.nickname}</td>
                            <td className="px-6 py-4 text-center">{member.email}</td>
                            <td className="px-1 py-4 text-center">{member.phone}</td>
                            <td className="px-6 py-4 text-center">{member.address[0] && member.address[0].address && (
                                                                    <>
                                                                    {member.address[0].address.split('/')[1]}
                                                                    /
                                                                    {member.address[0].address.split('/')[2]}
                                                                    </>
                                                                  )}
                            </td>
                            <td className="px-9 py-4 text-center">{formatDate(member.enrollDate)}</td>
                            <td className="px-6 py-4 text-center">{member.memberStatus === 'Y' ? (
                                        <>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" disabled>
                                                Y
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                onClick={() => onChangeStatus(member.memberNo, 'N')}
                                            >
                                                N
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-lg"
                                                onClick={() => onChangeStatus(member.memberNo, 'Y')}
                                            >
                                                Y
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" disabled>
                                                N
                                            </button>
                                        </>
                                    )}
                            </td>
                            <td className="px-6 py-4 text-center">{member.memberAdmin === 'Y' ? (
                                        <>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" disabled>
                                                Y
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                onClick={() => onChangeAdmin(member.memberNo, 'N')}
                                            >
                                                N
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-lg"
                                                onClick={() => onChangeAdmin(member.memberNo, 'Y')}
                                            >
                                                Y
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" disabled>
                                                N
                                            </button>
                                        </>
                                    )}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Admin;