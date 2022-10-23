import { NavLink, useLocation } from "react-router-dom";
import Action from "./Action";

function Table(props) {
    const { dataRow, head } = props
    let iteration = 1;

    let location = useLocation()

    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="sticky top-0">
                    <th className={`p-4 bg-dark-green text-white font-semibold 
                        text-sm text-center border border-l-[1px] border-white w-[78px]`}>#</th>
                    <th className={`p-4 bg-dark-green text-white font-semibold 
                        text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                    {head.map((item, index) => (
                        <th key={index} className={`p-4 bg-dark-green text-white font-semibold text-sm text-start
                            border border-l-[1px] border-white`}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>

                {dataRow.map((datas, index) => (
                    <tr key={index} className="divider-bottom divider-top">
                        <td>
                            <Action id={datas.po_number} />
                        </td>
                        <td className="p-4 text-sm text-slate-700 text-center w-14">{iteration++}</td>
                        {Object.values(datas).map((data, indexData) => (
                            <td key={indexData} className="p-4 text-sm text-slate-700">
                                {indexData > 0 ? data : (
                                    <NavLink to={`${location.pathname}/${datas.po_number}`} className={`text-gold`}>
                                        {data}
                                    </NavLink>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table