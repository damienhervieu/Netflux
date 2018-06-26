import { Component } from 'react';
import { setIdToken, setAccessToken } from '../utils/Authentication';

class Callback extends Component{
    
    componentDidMount(){
        setAccessToken();
        setIdToken();
        window.location.href = "/";
    }

    render(){
        return null;
    }
}

export default Callback;