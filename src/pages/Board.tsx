import Nav from '../components/Nav';
import index from './index';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePost } from '../contexts/PostContext'; // usePost 훅 임포트
import { Post } from '../contexts/PostContext'; // Post 인터페이스 임포트


interface Info {
  no?: number;
  id?: string;
  pw?: string;
  name?: string;
  birth?: number;
  title?: string;
  content?: string;
}

const Board: React.FC = () => {
  const [info, setInfo] = useState<Info[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { setPost } = usePost();

  const handleButtonClick = () => {
    router.push('/Form');
  };

  const handlePostSelect = (item: Info) => {
    // Info 타입에서 Post 타입으로 변환하는 함수
    function convertInfoToPost(info: Info): Post | undefined {
      // id가 undefined가 아니어야 함
      if (typeof info.id === 'string') {
        // Post 타입의 객체 반환
        return {
          id: info.id, // id는 string이므로 변환 없이 할당
          title: info.title || '', // title이 undefined인 경우 빈 문자열로 대체
          content: info.content || '' // content가 undefined인 경우 빈 문자열로 대체
        };
      }
      // id가 undefined인 경우, 변환할 수 없으므로 undefined 반환
      return undefined;
    }

    const post = convertInfoToPost(item);
    if (post) {
      setPost(post); // 변환된 Post 객체를 상태로 설정
      router.push('/about'); // 페이지 이동
    } else {
      console.error('Selected item is missing an ID or other required properties');
    }
  };


  useEffect(() => {
    // URL에서 search 쿼리 파라미터를 가져옵니다.
    const searchQuery = router.query.search as string | undefined;

    // 서버에 요청을 보내는 URL을 구성합니다. 검색어가 있으면 해당 검색어를 포함하고, 없으면 전체 게시물을 요청합니다.
    const fetchUrl = `http://localhost:3001${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`;

    // 데이터를 가져오는 함수입니다.
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setInfo(data.data); // 백엔드에서 'data' 프로퍼티 안에 결과가 담겨 온다고 가정합니다.
        } else {
          setInfo([]); // 응답이 배열이 아니라면 info를 빈 배열로 설정합니다.
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setInfo([]); // 에러가 발생하면 info를 빈 배열로 설정합니다.
      }
    };

    fetchData();
  }, [router.query.search]); // 검색 쿼리가 변경될 때마다 이 useEffect가 실행됩니다.


  return (
    <>
      <Nav onSearch={(query) => setSearchQuery(query)} />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">no</th>
            <th scope="col">id</th>
            <th scope="col">title</th>
          </tr>
        </thead>
        <tbody>
          {info.map((item) => (
            <tr key={item.no || item.id} onClick={() => handlePostSelect(item)}>
              <td>{item.no}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <></>
      <button type="button" className="btn btn-outline-secondary" onClick={handleButtonClick}>
        등록
      </button>
    </>
  );
};

export default Board;
