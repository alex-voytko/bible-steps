import Toggler from "./Toggler";

function AppBar() {
    return (
        <header className="app-header px-10 py-3 flex space-between">
            <div className="font-bold flex items-center text-xl text-gray-500">BibleSteps</div>
            <Toggler/>
        </header>
    )
}

export default AppBar;