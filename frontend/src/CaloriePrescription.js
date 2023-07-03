import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const CaloriePrescription = () => {

    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [activity, setActivity] = useState('');
    const [target, setTarget] = useState('');

    const onChangeGender = (e) => {
        setGender(e.target.value);
    }

    const onChangeHeight = (e) => {
        setHeight(e.target.value);
    }

    const onChangeWeight = (e) => {
        setWeight(e.target.value);
    }

    const onChangeAge = (e) => {
        setAge(e.target.value);
    }

    const onChangeActivity = (e) => {
        setActivity(e.target.value);
    }

    const onChangeTarget = (e) => {
        setTarget(e.target.value);
    }

    const onClickBtn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/calorie/prescribe', {
              gender: gender,
              height: height,
              weight: weight,
              age: age,
              activity: activity,
              target: target
            });
            
            const responseData = response.data;
            const { bmr, proteinCalorie, proteinGram, fatCalorie, fatGram, carbsGram, maintenance, targetCalorie, carbsCalorie } = responseData;
            sessionStorage.setItem('bmr', bmr);
            sessionStorage.setItem('proteinCalorie', proteinCalorie);
            sessionStorage.setItem('proteinGram', proteinGram);
            sessionStorage.setItem('fatCalorie', fatCalorie);
            sessionStorage.setItem('fatGram', fatGram);
            sessionStorage.setItem('carbsGram', carbsGram);
            sessionStorage.setItem('maintenance', maintenance);
            sessionStorage.setItem('targetCalorie', targetCalorie);
            sessionStorage.setItem('carbsCalorie', carbsCalorie);

            } catch (error) {
              console.log(error);
              
            }
          };
        
    return (
        <div className="w-full max-w-1100 min-w-1100 m-auto">
            <h1 className="text-3xl font-bold text-gray-200 mt-10 border-b-2 border-gray-200 mb-8">칼로리처방</h1>
                <form onSubmit={onClickBtn}>
                    <table className='w-full m-auto border border-green-600'>
                        <tr>
                            <td className='bg-gray-200 text-white'><label htmlFor="gender">성별</label></td>
                            <td><input type='radio' value='M' onChange={onChangeGender} name='gender' checked={gender === '남성'}/>남성</td>
                            <td><input type='radio' value='F' onChange={onChangeGender} name='gender' checked={gender === '여성'}/>여성</td>
                        </tr>
                        <tr>
                            <td className='bg-gray-200 text-white'><label htmlFor="height">키</label></td>
                            <td><input type="text" value={height} onChange={onChangeHeight} name="height"/> cm</td>
                        </tr>
                        <tr>
                            <td className='bg-gray-200 text-white'><label htmlFor="weight">몸무게</label></td>
                            <td><input type="text" value={weight} onChange={onChangeWeight} name="weight"/> kg</td>
                        </tr>
                        <tr>
                            <td className='bg-gray-200 text-white'><label htmlFor="age">나이</label></td>
                            <td><input type="text" value={age} onChange={onChangeAge} name="age"/> 세</td>
                        </tr>
                        <tr>
                            <td className='bg-gray-200 text-white'><label htmlFor="activity">활동량</label></td>
                            <td><input type="radio" value='1' onChange={onChangeActivity} name='activity' chacked={activity === '1'}/>활동량 거의 없음(운동 안 함)</td>
                            <td><input type="radio" value='2' onChange={onChangeActivity} name='activity' chacked={activity === '2'}/>활동량 조금 있음(주 1~3회 운동)</td>
                            <td><input type="radio" value='3' onChange={onChangeActivity} name='activity' chacked={activity === '3'}/>활동량 보통(주 4~5회 운동)</td>
                            <td><input type="radio" value='4' onChange={onChangeActivity} name='activity' chacked={activity === '4'}/>활동량 활발(주 6~7회 운동) </td>
                            <td><input type="radio" value='5' onChange={onChangeActivity} name='activity' chacked={activity === '5'}/>활동량 아주 많음(일 2회 운동)</td>
                        </tr>
                        <tr>
                            <td className='bg-gray-200 text-white'><label htmlFor="target">목표</label></td>
                            <td><input type="radio" value="감량" onChange={onChangeTarget} name='target' chacked={target === '감량'}/>감량</td>
                            <td><input type="radio" value="증량" onChange={onChangeTarget} name='target' chacked={target === '증량'}/>증량</td>
                        </tr>
                    </table>
                    <button type="submit" className='focus:outline-none text-white bg-gray-200 hover:bg-green-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-200 dark:focus:ring-green-800'>제출</button>
                </form>
        </div>
    );

};

export default CaloriePrescription;