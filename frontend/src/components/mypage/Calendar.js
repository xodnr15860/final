import React, { useState } from 'react';
import './Calendar.scss';

function Calendar() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [goal, setGoal] = useState('');

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleGoalSave = () => {
    // TODO: 백엔드 서버로 목표 설정 정보 전송 및 저장
    console.log(`Saving goal "${goal}" for date ${selectedDate}`);
    setSelectedDate(null);
    setGoal('');
  };

  const renderCalendar = () => {
    // 현재 날짜 정보 가져오기
    const currentDate = new Date();

    // 현재 년도와 월 가져오기
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 현재 월의 첫 번째 날 가져오기
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // 현재 월의 마지막 날 가져오기
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const lastDateOfMonth = lastDayOfMonth.getDate();

    // 달력 행과 열을 위한 배열 초기화
    const calendarRows = [];
    let calendarRow = [];

    // 첫 번째 날 이전의 빈 칸 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarRow.push(<td key={`empty-${i}`}></td>);
    }

    // 달력에 일자 추가
    for (let date = 1; date <= lastDateOfMonth; date++) {
      const isCurrentDate = currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && date === currentDate.getDate();
      const isSelectedDate = selectedDate && selectedDate.getFullYear() === currentYear && selectedDate.getMonth() === currentMonth && date === selectedDate.getDate();

      const dateClass = isCurrentDate ? 'current-date' : isSelectedDate ? 'selected-date' : '';

      calendarRow.push(
        <td key={date} className={dateClass} onClick={() => handleDateClick(new Date(currentYear, currentMonth, date))}>
          {date}
        </td>
      );

      if (calendarRow.length === 7) {
        calendarRows.push(<tr key={date}>{calendarRow}</tr>);
        calendarRow = [];
      }
    }

    // 마지막 주에 빈 칸 추가
    if (calendarRow.length > 0) {
      while (calendarRow.length < 7) {
        calendarRow.push(<td key={`empty-${calendarRow.length}`}></td>);
      }
      calendarRows.push(<tr key="last-week">{calendarRow}</tr>);
    }

    // 달력 테이블 반환
    return (
      <table>
        <thead>
          <tr className='text-base font-medium text-center text-gray-800 dark:text-green-800'>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Calendar</h2>
      {renderCalendar()}

      {/* 목표 설정 모달 */}
      {selectedDate && (
        <div className="modal">
          <h3>Set Goal for {selectedDate.toLocaleDateString()}</h3>
          <input
            type="text"
            value={goal}
            onChange={handleGoalChange}
            placeholder="Enter your goal"
          />
          <button onClick={handleGoalSave}>Save</button>
        </div>
      )}
    </div>
  );




    // return (

    //   <div class="flex items-center justify-center py-8 px-4">
    //   <div class="max-w-sm w-full shadow-lg">
    //       <div class="md:p-8 p-5 dark:bg-green-600 bg-white rounded-t">
    //           <div class="px-4 flex items-center justify-between">
    //               <span  tabindex="0" class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">October 2020</span>
    //               <div class="flex items-center">
    //                   <button aria-label="calendar backward" class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
    //                   <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //                       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //                       <polyline points="15 6 9 12 15 18" />
    //                   </svg>
    //               </button>
    //               <button aria-label="calendar forward" class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"> 
    //                     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //                       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //                       <polyline points="9 6 15 12 9 18" />
    //                   </svg>
    //               </button>
    
    //               </div>
    //           </div>
    //           <div class="flex items-center justify-between pt-12 overflow-x-auto">
    //               <table class="w-full">
    //                   <thead>  {/* 날짜 */}
    //                       <tr>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Mo</p>
    //                               </div>
    //                           </th>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Tu</p>
    //                               </div>
    //                           </th>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">We</p>
    //                               </div>
    //                           </th>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Th</p>
    //                               </div>
    //                           </th>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Fr</p>
    //                               </div>
    //                           </th>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Sa</p>
    //                               </div>
    //                           </th>
    //                           <th>
    //                               <div class="w-full flex justify-center">
    //                                   <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Su</p>
    //                               </div>
    //                           </th>
    //                       </tr>
    //                   </thead>
    //                   <tbody>
    //                       <tr>
    //                           <td class="pt-6">
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
    //                           </td>
    //                           <td class="pt-6">
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
    //                           </td>
    //                           <td class="pt-6">
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">1</p>
    //                               </div>
    //                           </td>
    //                           <td class="pt-6">
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">2</p>
    //                               </div>
    //                           </td>
    //                           <td class="pt-6">
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">3</p>
    //                               </div>
    //                           </td>
    //                           <td class="pt-6">
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">4</p>
    //                               </div>
    //                           </td>
    //                       </tr>
    //                       <tr>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">5</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">6</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">7</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="w-full h-full">
    //                                   <div class="flex items-center justify-center w-full rounded-full cursor-pointer">
    //                                       <a  role="link" tabindex="0" class="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full">8</a>
    //                                   </div>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">9</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">10</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">11</p>
    //                               </div>
    //                           </td>
    //                       </tr>
    //                       <tr>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">12</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">13</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">14</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">15</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">16</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">17</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">18</p>
    //                               </div>
    //                           </td>
    //                       </tr>
    //                       <tr>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">19</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">20</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">21</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">22</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">23</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">24</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100">25</p>
    //                               </div>
    //                           </td>
    //                       </tr>
    //                       <tr>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">26</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">27</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">28</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">29</p>
    //                               </div>
    //                           </td>
    //                           <td>
    //                               <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
    //                                   <p class="text-base text-gray-500 dark:text-gray-100 font-medium">30</p>
    //                               </div>
    //                           </td>
    //                       </tr>
    //                   </tbody>
    //               </table>
    //           </div>
    //       </div>
    //       <div class="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
    //           <div class="px-4">
    //               <div class="border-b pb-4 border-gray-400 border-dashed">
    //                   <p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
    //                   <a tabindex="0" class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
    //                   <p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
    //               </div>
    //               <div class="border-b pb-4 border-gray-400 border-dashed pt-5">
    //                   <p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">10:00 AM</p>
    //                   <a tabindex="0" class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
    //               </div>
    //               <div class="border-b pb-4 border-gray-400 border-dashed pt-5">
    //                   <p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
    //                   <a tabindex="0" class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
    //                   <p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
    //               </div>
    //           </div>
    //       </div>
    //   </div>
    // </div>
    // )
  

}

export default Calendar;
