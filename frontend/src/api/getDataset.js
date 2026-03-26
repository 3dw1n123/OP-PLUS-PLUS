export const getDataset = async (id) => {

  const res = await fetch(`http://127.0.0.1:5000/project/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const result = await res.json();
  return result.dataset;

};
