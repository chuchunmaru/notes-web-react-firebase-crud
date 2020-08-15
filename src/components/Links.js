import React,{useEffect,useState} from 'react';
import LinkForm from './LinkForm';
import {DB} from '../firebase';
import {toast} from 'react-toastify'
const Link = () => {

    const [links,setLinks]  =useState([]);
    const [currentId,setCurrentId] = useState('');

    const addOrEdit = async (linkObject) => {
        try {
            if(currentId === ''){
                await DB.collection('links').doc().set(linkObject);
                toast('new task added',{
                    type:'success'
                });
            }else{
                await DB.collection('links').doc(currentId).update(linkObject);
                toast('task updated successfully',{
                    type:'info'
                });
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }
    }
    const onDeleteLink = async (id) =>{
        if(window.confirm('¿Are you sure you want to delete this link?')){
            await DB.collection('links').doc(id).delete();
            toast('Link deleted',{
                type:'error'
            });
        }
    } 
    const getLinks = () => {
        // await // ya no se ultila await porque se convierte en un evento
        //ejecuta la consulta cuando se actuaiza la informacion    
         DB.collection("links").onSnapshot(( querySnapShot )=>{
            const docs = [];
            querySnapShot.forEach(doc => {
                docs.push({...doc.data(),id:doc.id});
            });
            console.log(docs);
            setLinks(docs)
        });
    }
    useEffect(() => {
        getLinks();
    },[])
    return (
    <>
        <div className="col-md-4 p-2">
            <LinkForm {...{addOrEdit,currentId,links}}/>
        </div>
        <div className="col-md-8 p-2">
            {links.map(link =>(
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <div>
                                <i onClick={() => setCurrentId(link.id)} className="material-icons">create</i>
                                <i onClick={() => onDeleteLink(link.id)} className="material-icons text-danger">close</i>

                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
                    </div>
                </div>
            ))}
        </div>
    </>
    )
}

export default Link

