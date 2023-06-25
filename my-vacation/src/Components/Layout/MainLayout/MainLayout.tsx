import MainRout from "../../Routes/MainRout/MainRout";
import Header from "../Header/Header";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
			<header>
                <Header/>
            </header>
            <main>
             <MainRout/>
            </main>
        </div>
    );
}

export default MainLayout;
