import { useState } from "react";
import Dropdown from "./Dropdown";

export function Nav() {

  const [open, setOpen] = useState(false)

  const HandleToggle = () => {
    setOpen(prev => !prev)
  }
  
  return (
    <nav>
        <div className="logo">WeatherApp</div>

        <div onClick={HandleToggle}>Units</div>
            
        {open && <Dropdown />}
    </nav>
  );
}

export default Nav