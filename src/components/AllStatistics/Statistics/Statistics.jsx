import React from 'react';
import s from './Statisctics.module.scss';


const Statistics = ({arr}) => {
            const func = (num) => {
                if (num < 10) {
                    return '0' + (num)
                } else {
                    return num;
                }
            }
        
    return (
        <>
        {arr.map((stat, index) => (
                <li key={index} className={s.stat_item}>
                    <p className={s.stat_date_text} >{func(JSON.stringify(new Date(stat.date).getDate()))}.{func(JSON.stringify(new Date(stat.date).getMonth() + 1))}.{JSON.stringify(new Date(stat.date).getFullYear())}</p>
                    <p className={s.stat_time_text}>{JSON.stringify(new Date(stat.date).getHours())}:{func(JSON.stringify(new Date().getMinutes()))}:{JSON.stringify(new Date().getSeconds())}</p>
                    <p className={s.stat_pages_text}>{stat.pages} <span className='stat_pages_span'>стор.</span> </p>
                </li>
            ))
        }
        </>
    );
}

export default Statistics;