import React from 'react'
import { Link } from "react-router-dom";

const PageBanner = ({ BannerData }) => {
    const breadCumbsData = BannerData?.breadcrumbs && BannerData?.breadcrumbs

    return (
        <div>
            < div className="relative w-full h-64 mb-8" >
                <img
                    src={BannerData?.backgroundUrl}
                    alt="Contact Me Banner"
                    className="w-full h-full object-fill rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center">
                    <div className="text-center">
                        <h1 className="text-white text-4xl font-bold mb-4">{BannerData?.heading}</h1>
                        <div className="breadcrumbs text-sm text-white mb-8">
                            <ul className="flex justify-center space-x-2 cursor-pointer">
                                {breadCumbsData?.map((item) => (

                                    <li className="cursor-pointer" key={item.link}>
                                        <Link
                                            to={item.link}
                                            className="hover:underline text-white-600 flex items-center"
                                        >
                                            <item.icon className="mr-1" />
                                            {item.linkText}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </ div>
        </div>
    )
}

export default PageBanner
