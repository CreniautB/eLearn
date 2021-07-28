import React from "react";
import './formChoice.css'

const FormChoice = ({privateOrPublic}) => {

    const fileInput = React.useRef(null)

    let email = ''
    let text = ''

    if(privateOrPublic === 'public') {
        // setWichEmail('avi.ang.public@gmail.com')
        email = 'avi.ang.public@gmail.com'
        text = "Vous autorisez pas CallDesk à utiliser cette vidéo pour des diffusions externes"
    }
    if(privateOrPublic === 'prive'){
        // setWichEmail('avi.ang.prive@gmail.com')
        email = 'creniaut.benjamin@gmail.com'
        text = "Vous n'autorisez pas CallDesk a utiliser cette vidéo pour des diffusions externes"
    }

    function clickFile() {
        fileInput.current.click();
    }
    
    if(email === ''){
        return(
            <></>
        )
    }
    else {
        return (
            <div>
                <h3>
                    {text}
                </h3>
                <form action={'mailto:'+email} method="get" encType="text/plain">
                    <p>Votre Nom et Prénom <input type="text" name="name" required/></p>
                    <p>Votre Email<input type="text" name="email" required/></p>
                    <p className="button selectFileBtn" onClick={clickFile} >
                        <input type="file" required className="inputFile" ref={fileInput} />Séléctionner le fichier vidéo</p>      

                    <p><input className="button btnSubmit" type="submit" /></p>   
                </form>
                </div>
      )
    }
}


export default FormChoice