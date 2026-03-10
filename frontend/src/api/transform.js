export const transform = async (operation, params) => {

  const res = await fetch("http://127.0.0.1:5000/transform", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      operation,
      params
    })

  });

  const result = await res.json();

  return JSON.parse(result.dataset);

};
