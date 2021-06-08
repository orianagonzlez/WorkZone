import React, { useEffect, useState } from "react";

export const useFetch2 = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async (url) => {
      try {
        let res = await fetch(url);

        if (!res.ok) {
          setError("La api no responde a ese url");
        }

        let r = await res.json();
        let data = r.data;
        let error = data.msg;

        if (!r.ok) {
          setError(error);
        }

        setLoading(false);
        setData(data);
        setError(false);
      } catch (error) {
        setError("La api no responde a ese url, error feito");
        setLoading(false);
      }
    };
    getData(url);
  }, [url, loading]);

  return { data, loading, error };
};
