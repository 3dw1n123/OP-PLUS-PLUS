export const getDataset = async (id, page = 1, offset = 5) => {

  const queryParams = new URLSearchParams({
    page,
    offset
  })

  const res = await fetch(`http://127.0.0.1:5000/project/${id}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const project = await res.json();

  return project;

};
