export const getData = async (path) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(path, requestOptions);

  const result = await response.text();

  const r = JSON.parse(result);

  console.log("por alguna razon se termino");
  return r;
};
