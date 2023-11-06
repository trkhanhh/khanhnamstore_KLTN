
import NavAdmin from "./component/nav";

function HomeAdmin({children}) {
  return (
    <div className="bg-gray-100 font-family-karla flex ">
      <NavAdmin />
      {children}
    </div>
  );
}

export default HomeAdmin;
