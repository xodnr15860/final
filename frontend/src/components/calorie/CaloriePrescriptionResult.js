import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'

const CaloriePrescriptionResult = () => {
   
    const [bmr, setBmr] = useState('');
    const [proteinCalorie, setProteinCalorie] = useState('');
    const [proteinGram, setProteinGram] = useState('');
    const [fatCalorie, setFatCalorie] = useState('');
    const [fatGram, setFatGram] = useState('');
    const [carbsGram, setCarbsGram] = useState('');
    const [maintenance, setMaintenance] = useState('');
    const [targetCalorie, setTargetCalorie] = useState('');
    const [carbsCalorie, setCarbsCalorie] = useState('');

    useEffect(() => {
        // sessionStorage에서 데이터 가져오기
        const bmrValue = Math.round(sessionStorage.getItem('bmr') * 10) / 10;
        const proteinCalorieValue = Math.round(sessionStorage.getItem('proteinCalorie') * 10) / 10;
        const proteinGramValue = Math.round(sessionStorage.getItem('proteinGram') * 10) / 10;
        const fatCalorieValue = Math.round(sessionStorage.getItem('fatCalorie') * 10) / 10;
        const fatGramValue = Math.round(sessionStorage.getItem('fatGram') * 10) / 10;
        const carbsGramValue = Math.round(sessionStorage.getItem('carbsGram') * 10) / 10;
        const maintenanceValue = Math.round(sessionStorage.getItem('maintenance') * 10) / 10;
        const targetCalorieValue = Math.round(sessionStorage.getItem('targetCalorie') * 10) / 10;
        const carbsCalorieValue = Math.round(sessionStorage.getItem('carbsCalorie') * 10) / 10;


        // 데이터 설정
        setBmr(bmrValue);
        setProteinCalorie(proteinCalorieValue);
        setProteinGram(proteinGramValue);
        setFatCalorie(fatCalorieValue);
        setFatGram(fatGramValue);
        setCarbsGram(carbsGramValue);
        setMaintenance(maintenanceValue);
        setTargetCalorie(targetCalorieValue);
        setCarbsCalorie(carbsCalorieValue);

        // 데이터 사용
        console.log(bmr, proteinCalorie, proteinGram, fatCalorie, fatGram, carbsGram, maintenance, targetCalorie, carbsCalorie);

        }, []);

    // install (please try to align the version of installed @nivo packages).

    const data = [
        {
          country: 'bmr',
          value: Number(bmr)

        },
        {
          country: 'proteinCalorie',
          value: Number(proteinCalorie)

        },
        {
          country: 'proteinGram',
          value: Number(proteinGram)

        },
        {
          country: 'fatCalorie',
          value: Number(fatCalorie)

        },
        {
          country: 'fatGram',
          value: Number(fatGram)

        },
        {
          country: 'carbsGram',
          value: Number(carbsGram)

        },
        {
          country: 'maintenance',
          value: Number(maintenance)

        },
        {
          country: 'targetCalorie',
          value: Number(targetCalorie)

        },
        {
          country: 'carbsCalorie',
          value: Number(carbsCalorie)
          
        },
        
      ];


    return (
        <div className="w-full max-w-1100 min-w-1100 m-auto">
            <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">칼로리처방 결과</h1>
                <table className='w-full border mb-10'>
                    <tr className='border'>
                        <td className='bg-green-600 w-48 text-white h-20 pl-4 border'>기초대사량</td>
                        <td className='ml-6 mr-1 border'>{bmr}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>목표칼로리</td>
                        <td className='ml-6 mr-1 border'>{targetCalorie}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>유지칼로리</td>
                        <td className='ml-6 mr-1 border'>{maintenance}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>탄수화물 섭취칼로리</td>
                        <td className='ml-6 mr-1 border'>{carbsCalorie}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>탄수화물 섭취질량(g)</td>
                        <td className='ml-6 mr-1 border'>{carbsGram}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>단백질 섭취칼로리</td>
                        <td className='ml-6 mr-1 border'>{proteinCalorie}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>단백질 섭취질량(g)</td>
                        <td className='ml-6 mr-1 border'>{proteinGram}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>탄수화물 섭취칼로리</td>
                        <td className='ml-6 mr-1 border'>{carbsCalorie}</td>
                    </tr>
                    <tr className='border'>
                        <td className='bg-green-600 text-white h-20 pl-4 border'>탄수화물 섭취질량(g)</td>
                        <td className='ml-6 mr-1 border'>{carbsCalorie}</td>
                    </tr>
                </table>

                <div>
                <ResponsiveBar
                    data={data}
                    keys={['value']}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.35}
                    layout="horizontal"
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'yellow_orange_brown' }}
                    defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                    ]}
                    // fill={[
                    // {
                    //     match: {
                    //     id: 'fries'
                    //     },
                    //     id: 'dots'
                    // },
                    // {
                    //     match: {
                    //     id: 'sandwich'
                    //     },
                    //     id: 'lines'
                    // }
                    // ]}
                    borderColor="#df0c0c"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={null}
                    enableGridY={false}
                    labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', '1.5']]
                    }}
                    legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                        {
                            on: 'hover',
                            style: {
                            itemOpacity: 1
                            }
                        }
                        ]
                    }
                    ]}
                    isInteractive={false}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={(e) =>
                    e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
                    }
                />
                </div>
            </div>
        );
};

export default CaloriePrescriptionResult;