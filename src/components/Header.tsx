import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../assets/images/trade_bridge.png";
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, sepolia, allChains } from '@reown/appkit/networks'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  // 1. Get projectId
const projectId = 'f6944e67672a59c2ac32f0ec4777dfd8';

// 2. Set the networks
const networks = [sepolia, mainnet, allChains];

// 3. Create a metadata object - optional
const metadata = {
  name: 'TradeBridge',
  description: 'Decentralized Commodity Marketplace',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['/public/trade_bridge.png']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="relative min-h-24 flex md:flex-row">
        {/* Left Half - Dark Blue */}
        <div className="w-[57%] bg-[#141C2B] py-4 px-4 md:px-10 flex justify-between items-center relative">
          <Link to="/">
            <div className="flex bg-[#182130] rounded-full items-center py-2 px-3 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <img
                src={Logo}
                alt="Trade Bridge Logo"
                className="w-10 md:w-[32px]"
              />
              <div className="flex items-center ml-2">
                <span className="text-white text-xl md:text-2xl font-bold">
                  Trade
                </span>
                <span className="text-[#ff6b6b] text-xl md:text-2xl font-bold ml-1">
                  Bridge
                </span>
              </div>
            </div>
          </Link>

          <button
            onClick={toggleSidebar}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {/* Bottom Horizontal Line for Left Half */}
          <div className="absolute bottom-[45px] left-64 w-full h-[2px] bg-[#ff6b6b]"></div>
        </div>

        {/* Right Half - Orange */}
        <div className="w-[50%] bg-[#FF531E] py-4 flex justify-end items-center px-4 relative">
          {/* Bottom Horizontal Line for Right Half */}
          <div className="absolute bottom-[45px] left-0 w-[98%] h-[2px] bg-[#141C2B]"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#141C2B] flex flex-col justify-center items-center z-40">
          <button
            onClick={toggleSidebar}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            <AiOutlineClose />
          </button>
          <nav className="flex flex-col items-center space-y-4 text-white">
            <Link to="/" className="text-2xl" onClick={toggleSidebar}>
              Home
            </Link>
            <Link
              to="/market-place"
              className="text-2xl"
              onClick={toggleSidebar}
            >
              Market Place
            </Link>
            <Link to="/contribute" className="text-2xl" onClick={toggleSidebar}>
              Contribute
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
