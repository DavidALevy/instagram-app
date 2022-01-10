import './App.css' ;
import { useEffect, useState } from "react";
 

const App = () => {
  const [item, setitem] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://picsum.photos/v2/list?page=2&limit=10");
      console.log(response);
      console.log("fetching")
      if (response.status !== 200) {
        throw new Error("not fetching");
      }
      const data = await response.json();   
setitem(data)
      console.log("API info", data);
      setLoading(false);
    } catch (e) {
      setError({ error: true, message: e.message });
    }
  };

  useEffect(() => {
    handler();
  }, []);

  if (error.error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
     
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className='main'>
         <header className="title"><h1 >Instagram Photos</h1></header>
           {item.map((item, index) => {
        return  <img className='images'key={index} src={item.download_url}alt="instagram"/>
        })}
        </div>
      )}
    </div>
  );
};
export default App;