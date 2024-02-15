// Nav.tsx
import React from 'react';
import Link from 'next/link';

interface NavProps {
    onSearch: (query: string) => void;
  }
  
  const Nav: React.FC<NavProps> = ({ onSearch }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const searchQuery = formData.get('search');
  
      if (typeof searchQuery === 'string') {
        onSearch(searchQuery);
      }
    };
    
    return (
        <>
             <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <ul className="nav justify-content-center" style={{ listStyleType: 'none' }}>
          <li className="nav-item">
            {/* Next.js의 Link 컴포넌트를 사용하여 클라이언트 사이드 라우팅 구현 */}
            <Link href="/">
            Home
          </Link>
          </li>
          <li className="nav-item">      
          <Link href="/Board">
            board
          </Link>   
          </li>
          <li>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input className="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </li>
        </ul>
      </nav>
        </>
    );
};

export default Nav;
