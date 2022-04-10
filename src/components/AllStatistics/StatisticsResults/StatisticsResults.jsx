import React from 'react';
import { useSelector } from 'react-redux';
import { getStats } from '../../../redux/training/trainingSelectors';
import Results from '../Results/Results';
import Statistics from '../Statistics/Statistics';
import s from './StatisticsResults.module.scss';
import { getTheme } from "../../../redux/theme/themeSelector";

const StatisticsResults = () => {
  const theme = useSelector(getTheme);
    const arr=useSelector(getStats);
    return (
        <div className={s.div_all} style={{
          backgroundColor:
            theme === "light" ? "white" : "var(--dark-header)",
          
        }}>
            <h3 className={s.result_text} style={{
      color:
        theme === "light" ? "#242A37" : "var(--dark-text)",
      
    }}>Результати</h3>
                <Results arr={arr} setArr={null}/>
                <div className={s.stat_block}>
                    <div className={s.stat_block_before}></div>
            <h3 className={s.stat_text} style={{
      color:
        theme === "light" ? "#242A37" : "var(--dark-text)",
      
    }}>СТАТИСТИКА</h3>
                    <div className={s.stat_block_after}></div>
                </div>
            <div className={s.scroll_block}>
                <ul className={s.stat_list}>
                    <Statistics />
                </ul>
            </div>
        </div>   
    );
}

export default StatisticsResults;
