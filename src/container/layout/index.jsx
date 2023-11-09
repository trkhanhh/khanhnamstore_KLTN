import NavAdmin from "../../container/admin/component/nav";
import Header from "./header";
import Footer from "./footer";

export const Layout = ({ isAdmin, children }) => {
  window.scrollTo(0, 0);
  return (
    <div className="w-full overflow-hidden">
      {isAdmin ? (
        <>
          <div className="flex">
            <NavAdmin />
            {children}
          </div>
        </>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
};
