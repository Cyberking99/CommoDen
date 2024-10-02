import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../../components/Images";
import blockies from 'blockies';
import Logo from "../../assets/images/trade_bridge.png";
import {ethers} from "ethers";
import TradeBridgeABI from "../../../ABIs/TradeBridge.json";
import { getSignedUrlFromPinata } from "../../utils/functions";

const MarketPlace = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const solidMineralCommodities = images.solidMinerals;


  const [selectedCommodity, setSelectedCommodity] = useState(null);

  const [commodities, setCommodities] = useState([]);
  
  useEffect(() => {
    const fetchCommodities = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA; 
          console.log(contractAddress)
          const commodityContract = new ethers.Contract(contractAddress, TradeBridgeABI, signer);

          const userCommodities = await commodityContract.getAllCommodities();
          console.log(userCommodities)
          setCommodities(userCommodities);
        } catch (error) {
          console.error("Error fetching commodities:", error);
        }
      }
    };

    fetchCommodities();
  }, []);

  const getImg = async function(cid) {
    return await getSignedUrlFromPinata(cid);
  }
  
  const handleCardClick = (commodity) => {
    setSelectedCommodity(commodity);
  };

  // Handle navigation to the purchase page
  const handlePurchaseClick = () => {
    if (selectedCommodity) {
      
      const commodityArray = Array.from(selectedCommodity);

      commodityArray[0] = commodityArray[0].toString();
      commodityArray[4] = commodityArray[4].toString();
      commodityArray[6] = commodityArray[6].toString();
      commodityArray[12] = commodityArray[12].toString();
      
      navigate('/buyer-dashboard/purchase-commodity', { state: { commodityChoice: JSON.stringify(commodityArray) } });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 py-8 px-16">
      {/* Top Navigation Bar */}
      <div className="flex justify-between  border border-white py-3 px-5 rounded-full items-center mb-4">
        {/* Logo */}
        <div className="flex gap-2">
          <Link to="/">
          <img src={Logo} alt="Trade Bridge Logo" className="w-10 md:w-[32px]"/>
        <h1 className="text-xl font-bold text-white">Trade<span className="text-[#FF531E]">Bridge</span></h1>
        </Link>
        </div>
        
        {/* Connect Wallet Button */}
        <w3m-button />
      </div>

      {/* Top Rated Section */}
      <div className="flex">
        {/* Top Rated Slider */}
        <div className="w-3/4 bg-gray-800 p-6 rounded-lg mr-8">
          <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
          {/* Slider Container (Placeholder for Slider) */}
          <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Add your slider here */}
            <p className="text-lg">Top Rated Products Slider</p>
          </div>
        </div>

        {/* Top Vendors Section */}
        <div className="w-1/4 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Top Vendors</h2>
          <div className="space-y-4">
            {solidMineralCommodities.slice(0, 3).map((commodity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-700 border border-full rounded-full">
                {/* Blockies Avatar */}
              <img
                src={blockies({
                  seed: commodity.sellerAddress, 
                  size: 16,
                  scale: 3, 
                }).toDataURL()} 
                alt={commodity.name}
                className="w-16 h-16 object-cover rounded-full"
              />
                <div className="ml-4">
                  <p className="text-lg font-bold">{commodity.sellerAddress}</p>
                  <p className="text-sm text-gray-400 ">Sold: 30k</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Trending Commodities</h2>
        <div className="grid grid-cols-4 gap-8">
          {commodities.slice(0, 4).map((commodity, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-700"
              onClick={() => handleCardClick(commodity)}
            >
              <img
                src="/trade_bridge.png"
                alt={commodity[2]}
                className="h-32 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{commodity[2]}</h3>
                <p className="text-sm">Price (<span className="text-white">{commodity[5]}</span>): {commodity[6].toString()/10e18} ETH</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Agricultural & Solid Mineral Commodities Section */}
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-4">All Commodities</h2>
  <div className="grid grid-cols-1 gap-8">

    {/* Agricultural Commodities */}
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h3 className="text-xl font-bold mb-4">All Commodities</h3>
      <div className="grid grid-cols-5 gap-12">
        {commodities.slice(0, 4).map((commodity, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-900 text-white p-4"
            onClick={() => handleCardClick(commodity)}
          >
            <div className="relative">
              <img
                src="/trade_bridge.png"
                alt={commodity[2]}
                className="h-40 w-full object-cover rounded-lg"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">{commodity[6].toString()/10e18} ETH</span>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-bold truncate">{commodity[2]}</h3>
              <p className="text-sm text-gray-400 mt-2">Price (<span className="text-white">{commodity[5]}</span>): {commodity[6].toString()/10e18} ETH</p>
              <p className="text-sm text-gray-400 mt-2">Quantity: <span className="text-white font-bold">{commodity[4].toString()}</span></p>
              <p className="text-sm text-gray-400 mt-2">Location: <span className="text-white font-bold">{commodity[9]}</span></p>
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Purchase</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* Commodity Modal */}
      {selectedCommodity && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-900 p-6 rounded-lg w-1/3">
            <h2 className='text-2xl font-bold mb-4'>{selectedCommodity[2]}</h2>
            <img src="/trade_bridge.png" alt={selectedCommodity[2]} className='h-full w-full object-contain rounded-t-lg' />
            <p><strong>Commodity ID:</strong> #{selectedCommodity[0].toString()}</p>
            <p><strong>Quantity:</strong> {selectedCommodity[4].toString()}</p>
            <p><strong>Price per {selectedCommodity[5]}:</strong> {selectedCommodity[6].toString()/10e18} ETH</p>
            <p><strong>Seller Address:</strong> {selectedCommodity[1]}</p>
            <div className='mt-6'>
              <button
                onClick={handlePurchaseClick}
                className='px-6 py-2 text-white bg-primary-200 rounded hover:bg-blue-800'
              >
                Purchase
              </button>
              <button
                onClick={() => setSelectedCommodity(null)}
                className='ml-4 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-800'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
