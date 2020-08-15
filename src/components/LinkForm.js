import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import {DB} from '../firebase';
const LinkForm = (props) => {

    const initialStateValues = {
        url:"",
        name:"",
        description:""
    }
    const [values, setValues] = useState(initialStateValues);

    const validURL = (str) => {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str);
    };

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values,[name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!validURL(values.url)) {
            return toast("invalid url", { type: "warning", autoClose: 1000 });
        }
        props.addOrEdit(values);
        setValues({...initialStateValues})
    }
    const getLinkById = async (id) =>{
        const doc = await DB.collection('links').doc(id).get();
        setValues({...doc.data()});
    }
    useEffect(()=>{
        if(props.currentId === ''){
            setValues({...initialStateValues})
        }else{
            getLinkById(props.currentId);
        }
    },[props.currentId])
    return (
        <form className="card card-body border-primary" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input value={values.url} onChange={handleInputChange} type="text" className="form-control" placeholder="http://someURL.com" name="url"/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input value={values.name} onChange={handleInputChange} type="text" className="form-control" placeholder="Web Site Name" name="name"/>
            </div>
            <div className="form-group input-group">
                <textarea value={values.description} onChange={handleInputChange} name="description" className="form-control" rows="3" placeholder="Write a description"></textarea>
            </div>
    <button className="btn btn-primary btn-block">{ props.currentId === '' ? 'Save' : 'Update' }</button>
        </form>
        )
}
export default LinkForm
