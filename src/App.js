import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
import { CiSearch } from "react-icons/ci"

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();

  const InputRef = useRef(null);
  const FocusInputRef = () => {
    InputRef.current.focus();
  }

  const getItems = async () => {
    await axios
      .get(
        `https://recruit-api.yonple.com/recruit/582962/a-posts?page=${page}`
      )
      .then((res) => {
        setItems([...items, ...res.data]);
      });
  };

  useEffect(() => {
    getItems();
  }, [page]);

  useEffect(() => {
    if (inView && items?.length !== 0) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <div>
      <Search>
        <div><button onClick={() => { FocusInputRef(); }}><CiSearch style={{ fontSize: "30px", marginTop: "7px" }} /></button><input ref={InputRef} placeholder="검색어를 입력하세요." /></div>
      </Search>
      {items?.map((item) => (
        <ItemBody key={item.id}>
          <div>
            <div style={{ fontWeight: "bold" }}><span style={{ color: "blue" }}>{item.id}</span>.{item.title}</div>
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

export default App;

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
  div {
    border: solid 3px gray;
  }
  input {
    margin-bottom: 50px;
  }
  width: 800px;
  height: 50px;
  display: flex;
  margin: 20px auto 20px auto;
  background-color: red;
  :hover {
    cursor: pointer;
    
  }
`