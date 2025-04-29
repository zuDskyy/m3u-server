import axios from "axios";
import { useEffect, useState } from "react";

const ListRequest = (req) => {
  const [listdata, setListdata] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    try {
      const listRequest = axios.get(req)
        .then((data) => setListdata(data.data))

      listRequest()
    } catch (err) {
      setError(err)
    }


  }, [req]);
  return { listdata, error }

};


export default ListRequest;