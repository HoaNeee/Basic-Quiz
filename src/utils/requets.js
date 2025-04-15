const API_URL = "http://localhost:3002/";

export const get = async (path) => {
  const response = await fetch(API_URL + path);
  const result = await response.json();
  return result;
};

export const post = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const patch = async function (path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: {
      Accept: true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const del = async function (path, id) {
  const response = await fetch(`${API_URL}${path}/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};
