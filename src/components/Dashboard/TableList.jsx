import React from "react";
import { useNavigate } from "react-router-dom";

const TableList = (props) => {
  const naviagate = useNavigate();

  return (
    <tr
      key={props.index}
      onClick={() => naviagate(props.route)}
      className="text-center mt-5 py-2 h-12 border-b-[1px] border-green-200"
    >
      <td>AKN1234</td>
      <td>Jamiu Shehu</td>
      <td>24-10-2023</td>
      <td>N700</td>
      <td>Pending</td>
    </tr>
  );
};

export default TableList;
