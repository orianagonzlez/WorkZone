export const getData = async (path) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(path, requestOptions);

  const result = await response.text();

  const r = JSON.parse(result);

  return r;
};

export const fetchToken = async (path, data, method = "GET") => {
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    const resp = await fetch(path, {
      headers: {
        "x-token": token,
      },
    });
    return await resp.json();
  } else {
    const resp = await fetch(path, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });

    return await resp.json();
  }
};
