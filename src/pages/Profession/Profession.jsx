import clsx from "clsx";
import style from "./Profession.module.scss";
import { useContext, useEffect, useState } from "react";
import { ApiUrlContext } from "../../layout/Layout";

const Profession = () => {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [path, setPath] = useState("");

  const [nameUpdate, setNameUpdate] = useState("");
  const [pathUpdate, setPathUpdate] = useState("");

  const [idUpdate, setIdUpdate] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const urlApi = useContext(ApiUrlContext);

  useEffect(() => {
    fetch(urlApi + "profession")
      .then((x) => x.json())
      .then((x) => setData(x));
  }, []);

  const handleCreate = () => {
    let dataCreate = {
      name: name,
      path: path,
    };

    fetch(urlApi + "profession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCreate),
    });

    setName("");
    setPath("");
  };

  const handleShowFormUpdate = (id) => {
    setIsShow(true);
    setIdUpdate(id);
    fetch(urlApi + "profession/" + id)
      .then((x) => x.json())
      .then((x) => {
        setNameUpdate(x.name);
        setPathUpdate(x.path);
      });
  };

  const handleUpdate = () => {
    const dataUpdate = {
      name: nameUpdate,
      path: pathUpdate,
    };

    fetch(urlApi + "profession/" + idUpdate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    });

    setNameUpdate("");
    setPathUpdate("");
    setIsShow(false);
  };

  return (
    <div className={clsx(style.wrapper)}>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Path
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Path
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {data.map((item, index) => {
            return (
              <tbody key={index}>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {item.path}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleShowFormUpdate(item.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>

        {isShow && (
          <>
            <h1>Update form , ID : {idUpdate}</h1>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Path
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={pathUpdate}
                onChange={(e) => setPathUpdate(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Updated
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profession;
