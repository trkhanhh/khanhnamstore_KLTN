export const Categories = ({ category }) => {
  let isParent = category.isPrimary == true;
  return (
    <>
      {isParent && (
        <div
          className={`group/${category.id} block w-full lg:w-auto relative`}
          style={{ minWidth: "250px" }}
        >
          <button className="bg-white py-2 px-4 lg:px-4 inline-flex items-center w-full hover:bg-gray-100">
            <span className="mr-1">{category.name}</span>
          </button>
          <ul
            className={`absolute hidden text-gray-700 pt-1 group-hover/${category.id}:block z-10 w-full`}
            style={{ minWidth: "250px" }}
          >
            {category.categories.map((val) => {
              return (
                <li>
                  <a className="bg-white py-2">{val.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
