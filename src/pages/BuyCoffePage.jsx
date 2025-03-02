import React, { useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { FaAmazonPay } from "react-icons/fa";
import { SiPhonepe, SiPaytm, SiGooglepay } from "react-icons/si";
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { myWeb } from "../utils/constants";

const BuyCoffePage = () => {
  const [quantity, setQuantity] = useState(1);
  const [qrCode, setQrCode] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const pricePerCup = 50;
  const upiId = "rajkumarsingha@axisbank";
  const totalAmount = quantity * pricePerCup;
  const merchantName = "Raj Kumar Singha";
  const transactionNote = "Thanks😍";

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const generateQRCode = () => {
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    setQrCode(upiLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000); // Reset after 1 second
    });
  };

  return (
    <div className="appbody min-h-screen bg-gradient-to-r from-yellow-100 via-orange-200 to-pink-100 animate-gradient flex items-center justify-center p-4">
      <Helmet>
        <title>Buy Me a Coffee | Support Raj Kumar Singha</title>
        <meta
          name="description"
          content="Support Raj Kumar Singha's work by buying him a coffee. Your contribution helps in creating more high-quality content and projects."
        />
        <meta
          name="keywords"
          content="buy me a coffee, support developers, Raj Kumar Singha, donation, UPI payment, coffee donation"
        />
        <link rel="canonical" href={`${myWeb}/buy-coffee`} />
        <meta property="og:title" content="Buy Me a Coffee | Support Raj Kumar Singha" />
        <meta
          property="og:description"
          content="Support Raj Kumar Singha's work by buying him a coffee. Your contribution helps in creating more high-quality content and projects."
        />
        <meta property="og:image" content="/cofee-up-main.jpg" />
        <meta property="og:url" content={`${myWeb}/buy-coffee`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Me a Coffee | Support Raj Kumar Singha" />
        <meta
          name="twitter:description"
          content="Support Raj Kumar Singha's work by buying him a coffee. Your contribution helps in creating more high-quality content and projects."
        />
        <meta name="twitter:image" content="/cofee-up-main.jpg" />
        <script type="application/ld+json">
          {`
          {
              "@context": "https://schema.org",
              "@type": "DonateAction",
              "name": "Buy Me a Coffee | Support Raj Kumar Singha",
              "description": "Support Raj Kumar Singha's work by buying him a coffee. Your contribution helps in creating more high-quality content and projects.",
              "url": "${myWeb}/buy-coffee",
              "agent": {
                  "@type": "Person",
                  "name": "Raj Kumar Singha",
                  "image": "/cofee-up-main.jpg"
              },
              "recipient": {
                  "@type": "Person",
                  "name": "Raj Kumar Singha"
              },
              "potentialAction": {
                  "@type": "PayAction",
                  "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "upi://pay?pa=${upiId}"
                  },
                  "price": "${pricePerCup}",
                  "priceCurrency": "INR"
              }
          }
          `}
        </script>
      </Helmet>

      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 animate__animated animate__fadeIn">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-6">
          Buy Me a Coffee ☕
        </h1>

        <p className="text-gray-700 text-center mb-2 text-lg">
          Love my work? Support me by buying me a coffee! Your support means a
          lot ❤️.
        </p>
        <p className="text-gray-700 text-center mb-4">Know More <Link className="border-b-2 border-dotted text-gray-400 border-gray-400 hover:text-blue-500" to={"/about"}>About-Me</Link></p>

        {qrCode ? (
          <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-2">
            <QRCodeCanvas
              value={qrCode}
              size={256}
              level="H"
              includeMargin={true}
              className="shadow-lg  rounded-md" />

            <p className="flex items-center mt-4 bg-gray-100 border border-gray-200 p-3 rounded-md">
              <span >{upiId}</span>
              <button onClick={copyToClipboard} className="ml-2">
                {isCopied ? (
                  <FaCheckCircle className="text-green-500 size-3" />
                ) : (
                  <FaCopy className="text-blue-400 hover:text-blue-300 cursor-pointer size-3" />
                )}
              </button>
            </p>
            <p className="mt-4 text-gray-700 text-center">Scan QR code or pay directly via upi id to complete your transaction using any upi app</p>
            <div className="flex justify-center gap-4 mt-3">
              {/* Google Pay */}
              <div className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <SiGooglepay className="w-8 h-8" style={{ color: '#4285F4' }} />
              </div>

              {/* PhonePe */}
              <div className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <SiPhonepe className="w-8 h-8" style={{ color: '#5F259F' }} />
              </div>

              {/* Paytm */}
              <div className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <SiPaytm className="w-8 h-8" style={{ color: '#00BAF2' }} />
              </div>

              <div className="p-1 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <FaAmazonPay className="w-8 h-8" style={{ color: '#FF9900' }} />
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-3xl font-bold text-orange-600">
                Paying: ₹{quantity * pricePerCup}
              </h2>
            </div>
            <button
              onClick={() => setQrCode(null)}
              className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Generate New QR
            </button>
          </div>
        ) : (

          <>
            <div className="flex justify-center align-middle ">
              <img
                src="/cofee-up-main.jpg"
                alt="Coffee Cup for Donation"
                className="w-48 h-48 rounded-full transform hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col items-center justify-between space-y-5">
              <div className="flex items-center justify-center space-x-6 space-y-4 flex-wrap">
                <img
                  src="/coffe-cup.jfif"
                  alt="Coffee Cup"
                  className="w-24 h-24 rounded-full transform hover:scale-110 transition-transform animate-bounce"
                />
                <p className="text-2xl font-medium text-gray-700">x</p>
                <div className="flex space-x-2">
                  {[1, 3, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleQuantityChange(num)}
                      className={`w-10 h-10 rounded-full ${quantity === num
                        ? "bg-orange-500 text-white"
                        : "border-2 border-orange-500 text-orange-500 hover:bg-orange-100"
                        } flex items-center justify-center font-medium text-lg transition-all duration-300`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value, 10))
                  }
                  className="w-16 h-10 px-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-center"
                />
              </div>

              {/* Description below the quantity selector */}
              <p className="text-gray-600 text-center text-base">
                Select the number of coffees or enter a custom amount. Each cup is
                just ₹{pricePerCup}.
              </p>
            </div>

            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold text-orange-600">
                Total: ₹{quantity * pricePerCup}
              </h2>
            </div>
          </>
        )}

        {/* Pay Button */}
        {!qrCode && (
          <div className="text-center mt-8">
            <button
              onClick={generateQRCode}
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 animate-pulse"
            >
              Buy {quantity} Coffee(s) for ₹{quantity * pricePerCup}
            </button>
          </div>
        )}
      </div>

    </div >
  );
};

export default BuyCoffePage;