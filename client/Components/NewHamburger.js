import { Fade as Hamburger } from 'hamburger-react';

function NewHamburger() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      New Hamburger
      <Hamburger color='black' toggled={isOpen} toggle={setOpen} />
    </div>
  );
}

export default NewHamburger;
