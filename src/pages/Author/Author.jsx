import clsx from "clsx";
import style from "./Author.module.scss";
import { useContext, useEffect, useState } from "react";
import { ApiUrlContext } from "../../layout/Layout";

const Author = () => {
  const [data, setData] = useState([]);

  //Value Create
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [professionId, setProfessionId] = useState(0);

  //Value updated
  const [nameUpdate, setNameUpdate] = useState("");
  const [pathUpdate, setPathUpdate] = useState("");
  const [descriptionUpdate, setDesriptionUpdate] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const [professionIdUpdate, setProfessionIdUpdate] = useState(0);

  const [isShowForm, setIsShowForm] = useState(false);
  const [idUpdated, setIdUpdated] = useState(0);

  const [profession, setProfession] = useState([]);

  const urlApi = useContext(ApiUrlContext);

  useEffect(() => {
    fetch(urlApi + "author")
      .then((x) => x.json())
      .then((x) => setData(x));

    fetch(urlApi + "profession")
      .then((x) => x.json())
      .then((x) => setProfession(x));
  }, []);

  const handleCheck = (id) => {
    setProfessionId(id);
  };

  const handleCheckUpdate = (id) => {
    setProfessionIdUpdate(id);
  };

  const handleCreate = () => {
    const dataCreate = {
      name: name,
      path: path,
      description: description,
      image_link: image,
      profession_id: professionId,
    };

    fetch(urlApi + "author", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCreate),
    });

    setName("");
    setPath("");
    setDescription("");
    setImage("");
  };

  const handleShowFormUpdate = (id) => {
    setIsShowForm(true);
    setIdUpdated(id);
    fetch(urlApi+"author/" + id)
      .then((x) => x.json())
      .then((x) => {
        setNameUpdate(x.name);
        setPathUpdate(x.path);
        setDesriptionUpdate(x.description);
        setImageUpdate(x.image_link);
      });
  };

  const handleUpdate = () => {
    const dataUpdate = {
      name: nameUpdate,
      path: pathUpdate,
      description: descriptionUpdate,
      image_link: imageUpdate,
      profession_id: professionIdUpdate,
    };

    fetch(urlApi + "author/" + idUpdated, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    });

    setNameUpdate("");
    setPathUpdate("");
    setDesriptionUpdate("");
    setImageUpdate("");
    setIsShowForm(false);
  };

  return (
    <div className={clsx(style.wrapper)}>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          {profession.map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onClick={() => handleCheck(item.id)}
                  checked={item.id === professionId}
                />
                <label for="vehicle3">{item.name}</label>
              </div>
            );
          })}

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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
                Image
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Description
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
                    <img
                      style={{ maxHeight: "250px" }}
                      src={item.image_link}
                      alt={item.name}
                    />
                  </td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {item.description}
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
      </div>

      {isShowForm && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1>Update form , ID : {idUpdated}</h1>
          <div>
            {profession.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onClick={() => handleCheckUpdate(item.id)}
                    checked={item.id === professionId}
                  />
                  <label>{item.name}</label>
                </div>
              );
            })}
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={descriptionUpdate}
              onChange={(e) => setDesriptionUpdate(e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={imageUpdate}
              onChange={(e) => setImageUpdate(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
            >
              Updated
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Author;
