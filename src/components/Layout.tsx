import Header from "./Header";
import Aside from "./Aside";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col bg-blue-50">
      <Header />
      <div className="flex h-[calc(100vh-4rem)] flex-grow">
        <Aside />
        <main className="ml-[4.5rem] mb-2 mr-2 flex grow overflow-hidden rounded-xl bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
