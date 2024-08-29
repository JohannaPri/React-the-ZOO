import { Link } from "react-router-dom";
import "../style/notFound.scss";

// NotFound-komponenten med en error-bild
export const NotFound = () => {
  return (
    <div className="not-found-error">
      <h1 className="error-heading">Whoopsie...</h1>
      <img
        src="/error-notfound-large.png" 
        alt="Error"
        style={{ width: '500px'}}
      />  
      <p className="error-text">Hoppsan! Det verkar ha blivit ett problem. <br/> Klicka på länken nedan för att återvända till startsidan.</p>
      <Link className="error-link" to="/">Gå tillbaka till hemsidan</Link>
    </div>
  );
};
