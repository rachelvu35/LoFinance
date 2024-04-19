import React from "react";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import "../resources/default-layout.css";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("lofi-user"));
  const navigate = useNavigate()
  const items = [
    {
      key: "1",
      label: (
        <li onClick={() => {
          localStorage.removeItem('lofi-user')
          navigate('/login')
        }}>
          Logout
        </li>
      ),
    },
  ];
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">LoFi</h1>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
          >
            <button className="primary justify-content-between align-items-center">{user.name}</button>
          </Dropdown>
        </div>

        <div></div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
