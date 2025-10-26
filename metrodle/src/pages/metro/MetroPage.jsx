import "./MetroPage.css";
import "../../App.css";

export function MetroPage({backColor, color}) {

    return (
        <div className='game-container'>
            <h1 style={{color: backColor}} className='page-title'>METRODLE</h1>
            <div className='input-container'>
                <input style={{borderColor: backColor}} type="text" placeholder="Entrez le nom d'une station" /><button style={{backgroundColor: backColor, color: color}}>GUESS</button>
            </div>
        </div>
    );
}