import './StatiscticsStyle.css';

const Statistics = ({arr}) => {

    const datex = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
        //         const number = () => {
        //           return  Array(31).fill('').map((el, index) => index <9 ? '0' + (index + 1) : String(index + 1))
        //         }
        //    console.log(number()); 

        
    return (
        <>
        {arr.map((stat, index) => (
                <li key={index} className="stat_item">
                    <p className='stat_date_text' >{datex[JSON.stringify(new Date(stat.date).getDate()) - 1]}.{datex[JSON.stringify(new Date(stat.date).getMonth())]}.{JSON.stringify(new Date(stat.date).getFullYear())}</p>
                    <p className='stat_time_text'>{JSON.stringify(new Date(stat.date).getHours())}:{JSON.stringify(new Date().getMinutes())}:{JSON.stringify(new Date().getSeconds())}</p>
                    <p className='stat_pages_text'>{stat.pages} <span className='stat_pages_span'>стор.</span> </p>
                </li>
            ))
        }
        </>
    );
}

export default Statistics;