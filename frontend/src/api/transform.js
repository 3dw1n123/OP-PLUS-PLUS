export const transform = async (dataset_id, operation, params) => {

  const res = await fetch("http://127.0.0.1:5000/transform", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      dataset_id,
      operation,
      params
    })

  });

  const project = await res.json();
  return project.dataset

};
