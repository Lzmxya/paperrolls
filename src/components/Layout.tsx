import Header from "./Header";
import Aside from "./Aside";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col bg-blue-50">
      <Header />
      <div className="flex flex-grow">
        <Aside />
        {children}
      </div>
    </div>
  );
}

export default Layout;
