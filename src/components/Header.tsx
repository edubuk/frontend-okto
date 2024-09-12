import HyperText from "./ui/AnimateHypertext";
import logo from "/edubuklogo.jpg";

const Header = () => {
  return (
    <div className="border flex items-center justify-center  px-10 py-2">
      <img
        src={logo}
        alt="logo"
        className="h-16 w-16 object-cover"
        draggable={false}
      />
      <div className="ml-5">
        <HyperText
          text="CV ON BLOCKCHAIN BY EDUBUK"
          className="text-4xl font-semibold text-[#006666]"
        />
      </div>
    </div>
  );
};

export default Header;
