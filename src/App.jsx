import NavButton from "@/Components/ui/NavButton"
import "boxicons"

function App() {
  return (
    <>
      <div className="flex justify-around items-center m-5 lg:flex-col lg:gap-3 lg:items-start">
        <NavButton label="Home" icon="home" />
        <NavButton label="Search" icon="search" />
        <NavButton label="Library" icon="library" />
        <NavButton label="Settings" icon="cog" />
      </div>
    </>
  )
}

export default App