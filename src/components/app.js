import ReactDOM from "react-dom";
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    authFunc() {
        const authData = {data: "Auth on my site"};
        if (WavesKeeper) { //find if WavesKeeper is installed at global scope
            WavesKeeper.auth (authData)
            .then (auth => {
                console.log (auth); //display results on the console

            }).catch(error => {
                console.error(error);
            })
        } else {
            alert("To Auth WavesKepper should be installed.");
        }
    }
render () {
    return(
        <div className="container">
            <input className="btn btn-primary" type="submit" value="Auth" onClick={this.authFunc}/>
        </div>
    )
}
}

const app=document.getElementById('app');
if(app){
    ReactDOM.render(<App/>,app)
}