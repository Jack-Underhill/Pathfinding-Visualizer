import SocialTag from './SocialTag';
import VisitCount from './VisitCount';

import github from '../assets/github.svg'
import portfolio from '../assets/portfolio.svg'
import about from '../assets/about.svg'

function NavBar() {
  return (
    <div className="h-12 flex justify-between">
      <VisitCount />
      
      <div className='h-12 flex flex-wrap gap-4'>
        <SocialTag 
            name="Github Repo"
            link="https://github.com/Jack-Underhill/Pathfinding-Visualizer"
            icon={github}
        />
        <SocialTag 
            name="Portfolio"
            link="https://jack-underhill.netlify.app/"
            icon={portfolio}
        />
        <SocialTag 
            name="About"
            link="https://github.com/Jack-Underhill/Pathfinding-Visualizer"
            icon={about}
        />
    </div>
    </div>
    
  );
}

export default NavBar;