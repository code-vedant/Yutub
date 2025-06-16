import { useState, useEffect } from "react";

const useFetch = (asyncFn, deps = []) => {
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);
    const [data, setData]     = useState(null);
  
    useEffect(() => {
      let isMounted = true;
        
      const run = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await asyncFn();
          
          if (isMounted) setData(result);
        } catch (err) {
          if (isMounted) setError(err);
        } finally {
          if (isMounted) setLoading(false);
        }
      };
  
      run();
  
      return () => {
        isMounted = false;
      };
    }, deps);
  
    return { loading, error, data };

};

export default useFetch;
