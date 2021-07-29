import React, {useState} from "react";
import FormChoice from "./formChoice/formChoice";

const Forms = ({recordedChunks, setRecordedChunks, setblobb, blobb}) => {

  const [privateOrPublic, setPrivateOrPublic] = useState(false)


  function setPublic(e) {
    e.preventDefault();
    setPrivateOrPublic('public')
    console.log(privateOrPublic)
  }

  function setPrive(e) {
    e.preventDefault();
    setPrivateOrPublic('prive')
    console.log(privateOrPublic)
  }

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "test.webm";
      a.click()
      window.URL.revokeObjectURL(url);   
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

    return (
      <div className='videoChapContainer'>

        <h1>Bravo Vous avez terminé ce chapitre<br/>
        Téléchargez la vidéo pour nous l'envoyer pour correction<br/></h1>

        {recordedChunks.length > 0 && (<button className='button' onClick={handleDownload}>Télécharger</button>)}

        <h2>Choix de corrections</h2>

        <button className='button' onClick={setPrive}>Privé</button>
        <button className='button' onClick={setPublic}>Publique</button>

        <FormChoice privateOrPublic={privateOrPublic} />
              
    </div>
    )
};

export default Forms