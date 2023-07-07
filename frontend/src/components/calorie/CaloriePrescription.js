import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaloriePrescription = () => {

    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [activity, setActivity] = useState('');
    const [target, setTarget] = useState('');

    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:8080/api/calorie/prescribe', {
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
        navigate('/calorie/prescription/result');
    };
    
    return (
        <div className="w-full max-w-1100 min-w-1100 m-auto">
            <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">칼로리처방</h1>
                <form onSubmit={onClickBtn}>
                    <table className='w-full border'>
                        <tbody>
                        <tr className='border'>
                            <td className='bg-green-600 w-40 text-white h-20 pl-4 border'><label htmlFor="gender" >성별</label></td>
                            <td>
                                <input type='radio' value='M' onChange={onChangeGender} id="gender" name='gender' checked={gender === 'M'} className='ml-6 mr-1 border' required/>남성
                                <input type='radio' value='F' onChange={onChangeGender} id="gender" name='gender' checked={gender === 'F'} className='ml-6 mr-1 border'/>여성
                            </td>
                        </tr>
                        <tr className='border'>
                            <td className='bg-green-600 text-white h-20 pl-4 border'><label htmlFor="height">키</label></td>
                            <td><input type="text" value={height} onChange={onChangeHeight} id="height" name="height" className='border w-24 ml-6 h-8' required/> cm</td>
                        </tr>
                        <tr className='border'>
                            <td className='bg-green-600 text-white h-20 pl-4 border'><label htmlFor="weight">몸무게</label></td>
                            <td><input type="text" value={weight} onChange={onChangeWeight} id="weight" name="weight" className='border w-24 ml-6 h-8' required/> kg</td>
                        </tr>
                        <tr className='border'>
                            <td className='bg-green-600 text-white h-20 pl-4 border'><label htmlFor="age">(만) 나이</label></td>
                            <td><input type="text" value={age} onChange={onChangeAge} id="age" name="age" className='border w-24 ml-6 h-8' required/> 세</td>
                        </tr>
                        <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'><label htmlFor="activity">활동량</label></td>
                            <td>
                                <input type="radio" value='1' onChange={onChangeActivity} id="activity" name='activity' checked={activity === '1'} className='ml-6 mr-1' required/>활동량 거의 없음(운동 안 함)<br/>
                                <input type="radio" value='2' onChange={onChangeActivity} id="activity" name='activity' checked={activity === '2'} className='ml-6 mr-1' required/>활동량 조금 있음(주 1~3회 운동)<br/>
                                <input type="radio" value='3' onChange={onChangeActivity} id="activity" name='activity' checked={activity === '3'} className='ml-6 mr-1' required/>활동량 보통(주 4~5회 운동)<br/>
                                <input type="radio" value='4' onChange={onChangeActivity} id="activity" name='activity' checked={activity === '4'} className='ml-6 mr-1' required/>활동량 활발(주 6~7회 운동)<br/>
                                <input type="radio" value='5' onChange={onChangeActivity} id="activity" name='activity' checked={activity === '5'} className='ml-6 mr-1' required/>활동량 아주 많음(일 2회 운동)<br/>
                            </td>
                        </tr>
                        <tr className='border'>
                            <td className='bg-green-600 text-white h-20 pl-4 border'><label htmlFor="target">목표</label></td>
                            <td>
                                <input type="radio" value="감량" onChange={onChangeTarget} id="target" name='target' checked={target === '감량'} className='ml-6 mr-1' required/>감량
                                <input type="radio" value="증량" onChange={onChangeTarget} id="target" name='target' checked={target === '증량'} className='ml-6 mr-1'/>증량
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='text-center'>
                    <button type="submit" className='focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-8 mt-8 dark:bg-green-600 dark:hover:bg-green-700'>칼로리 처방</button>
                    </div>
                </form>
        </div>
    );

};

export default CaloriePrescription;