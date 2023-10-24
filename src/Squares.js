import {useState} from "react";

function Squares() {
    const [column, setColumn] = useState([1]);
    const [row, setRow] = useState([1]);

    function Button(props) {
        return (
            <button className="tableButton" onClick={() => handleClick(props)}>
                {props.view}
            </button>
        );
    }
    function handleClick(props){
        console.log(props)
        if(props.value === 'addCol'){
            setColumn([...column, column[column.length - 1] + 1])
        }

        if(props.value === 'deleteCol' && column.length > 1){
            setColumn([...column.slice(0, column.length - 1)])
        }

        if(props.value === 'addRow'){
            setRow([...row, row[row.length - 1] + 1])
        }

        if(props.value === 'deleteRow' && row.length > 1){
            setRow([...row.slice(0, row.length - 1)])
        }
    }

    const listItemsColumn = column.map((number) =>
        <td key={number}>
            <button className="squareButton"></button>
        </td>
    );

    const listItemsRow = row.map((number) =>
        <tr key={number}>
            {listItemsColumn}
        </tr>
    );

    return (
        <>
            <table>
                <div className="leftButton">
                    <Button value={'deleteCol'} view={'-'}/>
                </div>
                <tbody>
                    <div className="topButton">
                        <Button value={'deleteRow'} view={'-'}/>
                    </div>
                    {listItemsRow}
                    <div className="bottomButton">
                        <Button value={'addRow'} view={'+'}/>
                    </div>
                </tbody>
                <div className="rightButton">
                    <Button value={'addCol'} view={'+'}/>
                </div>
            </table>
        </>
    );
}

export default Squares;