import { useState } from 'react';
import Results from '../Results/Results';
import Statistics from '../Statistics/Statistics';
import './AllStyle.css';
const All = () => {
    const [arr, setArr] = useState([])
    return (
        <div className='div_all'>
            <h3 className='result_text'>Результати</h3>
                <Results arr={arr} setArr={setArr}/>
                <div className='stat_block'>
                    <div className='stat_block_before'></div>
            <h3 className='stat_text'>СТАТИСТИКА</h3>
                    <div className='stat_block_after'></div>
                </div>
            <div className='scroll_block'>
                <ul className='stat_list'>
                    <Statistics arr={arr}/>
                </ul>
            </div>
        </div>   
    );
}

export default All;