import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ResultsStyle.css'

const Results = ({arr, setArr}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [pages, setPages] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        setArr([...arr, {
            date: startDate,
            pages: pages,
        }])
        console.log(arr);
    }
    return ( 
        <>
        <form action="" onSubmit={onSubmitForm}>
            <div className="inputs_div">
            <div>
        <p className="data_text">Дата</p>
        <DatePicker selected={startDate} onChange={(date) =>{setStartDate(date); console.log(startDate);}} dateFormat="dd.MM.yyyy"/> 
            </div>
            <div>
        <p className="pages_text">Кількість сторінок</p>
        <input type="text" className="input_pages" value={pages} onChange={(e)=> {console.log(e.target.value); setPages(e.target.value);}}/>
            </div>
            </div>
        <button className="add-res_btn" type="submit">Додати результат</button>
        </form>
        </>
    );
}

export default Results;