import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
import { CiSearch } from "react-icons/ci"
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [ref, inView] = useInView();

  const InputRef = useRef(null);
  const FocusInputRef = () => {
    InputRef.current.focus();
  }

  const navigate = useNavigate();

  const getItems = async () => {
    await axios
      .get(
        `https://recruit-api.yonple.com/recruit/582962/a-posts?page=${page}&search=${keyword}`
      )
      .then((res) => {
        setItems([...items, ...res.data]);
      });
  };

  useEffect(() => {
    getItems();
  }, [page, keyword]);

  useEffect(() => {
    if (inView && items?.length !== 0) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <div>
      <Search>
        <div><button onClick={() => { FocusInputRef(); }}><CiSearch /></button><input value={keyword} ref={InputRef} placeholder="검색어를 입력하세요." onChange={(e) => { setKeyword(e.target.value); setItems([]); setPage(0); }} /></div>
      </Search>
      {items?.map((item) => (
        <ItemBody key={item.id} onClick={() => { navigate(`/${item.id}`) }}>
          <div>
            <div style={{ fontWeight: "bold" }}><span style={{ color: "blue", alignItems: "center", justifyContent: "center" }}>{item.id}</span>.{item.title}</div>
          </div>
          <ContetnBody>
            {item.content}
          </ContetnBody>
        </ItemBody>
      ))}
      <div ref={ref}></div>
    </div>
  );
};

export default Main;

const ItemBody = styled.div`
  border: solid 5px gray;
  width: 80%;
  height: 90px;
  margin: auto;
`;

const ContetnBody = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const Search = styled.div`
  width: 80%;
  margin: 10px auto 10px auto;
  border: solid 1px gray;
  display: flex;
  flex-direction: column;
  button {
    font-size: 26px;
    border: none;
    background-color: white;
    margin: 1px;
    :hover {
      cursor: pointer;
      border: solid 1px gray;
      border-radius: 5px;
    }
  }
  input {
    font-size: 26px;
    padding: 10px;
    border: none;
    width: 91%;
    :hover {
      cursor: pointer;
      border: solid 1px gray;
      border-radius: 5px;
    }
  }
`