import Nav from '../components/Nav';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav onSearch={function (query: string): void {
        throw new Error('Function not implemented.');
      } } />

      <div>
        <input type="text" />
        <br/>
        <input type="text" />
        <button>로그인</button>
      </div>
  
    </main>
  );
}
