import React, {useState, useEffect} from 'react';
import Axios from 'axios';
 


function Courses() {
  const [courses, setCourse] = useState([]);
    useEffect(() => {
      Axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
        setCourse(response.data);
      })
    }, []);
  return (
    <div>
      Welcome to the Courses Page!
    </div>
  );
}
 
export default Courses;