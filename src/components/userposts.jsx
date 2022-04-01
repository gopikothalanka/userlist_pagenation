import React,{useEffect,useState} from 'react';
import axios from 'axios';
function UserPosts() {
  // storing data in useState
  const [uData,setUData]=useState(); 
  const [search,setSearch]=useState("");
  // calling api data before 
  useEffect(()=>{
    axios.get('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json').then(response =>{
      // console.log(response.data);
      setUData(response.data);
    })
  },[])
  return (
    <div className="container d-flex flex-column justify-content-center" >
        <input className="form-control m-auto"  type="text" placeholder="Search..." onChange={(e)=>{setSearch((e.target.value))
        console.log(e.target.value)}} />

      {!uData ? ("No Data"):(
        <table className="table  table-bordered table-hover">
          <thead>
            <tr>
              <th>S.no</th>
              <th>first Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Web site</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {uData.filter(val=> {
            if(search===""){
              return val;
            }else if(
              val.first_name.toLowerCase().includes(search.toLowerCase()) || 
              val.last_name.toLowerCase().includes(search.toLowerCase()) || 
              val.email.toLowerCase().includes(search.toLowerCase())
            ){
              return val;
            }
            // search === "" ? val :val.first_name.toLowerCase().includes(search.toLowerCase())
          }).map((user,index)=>(
            <tr key={index}>
            <td>{user.id}</td> 
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.age}</td>
            <td><a href={user.web} target="_blank">{user.web}</a>
            </td>
            <td>{user.email}</td>
            </tr>
          ))
          }
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserPosts;