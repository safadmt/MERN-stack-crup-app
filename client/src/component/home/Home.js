import react , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

const Home = () => {
    const [user, setUser] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:4000/user')
        .then(res=> {
            setUser(res.data)
        })
        .catch(err=> {
            console.log(err)
        })
    },[])

    const handleDelete = (id,e)=>  {
        e.preventDefault();
        axios.delete(`http://localhost:4000/user/${id}`)
        .then(res=> {
            console.log(res.data)
            const newuser = user.filter(user=> user._id !== id);
            setUser(newuser);
        })
        .catch(err=> {
            console.log(err)
        })
    }
    return (
        <div className="container mt-5">
            <table className="table col-md-10">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">num</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((obj,index)=> {
                        return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{obj.name}</td>
                        <td><img src={require(`http://localhost:4000/images/${obj.image}`)} id='tdimage'></img></td>
                        <td>{obj.address}</td>
                        <td><Link to={`/edit-user/${obj._id}`} className='btn btn-outline-primary'>Edit</Link></td>
                        <td><button className="btn btn-outline-danger" onClick={(e)=>handleDelete(obj._id,e)}>Delete</button></td>
                        </tr>
                    })}
                    
                    
                    
                </tbody>
            </table>

          
        </div>
    )
}

export default Home;
