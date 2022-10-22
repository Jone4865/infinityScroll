import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
    const [item, setItem] = useState([]);
    const params = useParams();
    const id = +params.detail;
    const navigate = useNavigate();

    const getItems = async () => {
        await axios
            .get(
                `https://recruit-api.yonple.com/recruit/582962/a-posts/${id}`
            )
            .then((res) => {
                setItem(res.data);
            });
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "10%" }}>
            <Body>
                <div style={{border:"solid 1px gray", padding:"50px"}}>
                    <p>{item.title}</p>
                    <div>{item.content}</div>
                </div>
                <button onClick={() => { navigate("/") }}>
                    뒤로가기
                </button>
            </Body>
        </div>
    );
};

export default Detail;

const Body = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    button {
        font-weight: bold;
        color: white;
        width: 120px;
        height: 40px; 
        border: none;
        background-color: #0026ff92;
        border-radius: 5px;
        margin-top: 30px;
    }
    p {
        display: flex;
        justify-content: center;
        font-size: 50px;
    }
`
