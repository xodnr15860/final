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
          <tr>
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
}

export default Calendar;
