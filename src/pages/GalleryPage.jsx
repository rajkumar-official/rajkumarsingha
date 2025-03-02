import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BsHouseDoor, BsImages, BsX, BsZoomIn } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "react-modal";
import PageBanner from "../components/PageBanner";
import initialData from "../datas/galleryData.json";
import { myWeb } from "../utils/constants";

Modal.setAppElement("#root");

const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const openDialog = (image) => {
    setSelectedImage(image);
    document.getElementById("imageDialog").showModal();
  };

  const closeDialog = () => {
    setSelectedImage(null);
    document.getElementById("imageDialog").close();
  };

  const loadMoreImages = () => {
    if (galleryData.length >= 8) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setGalleryData((prev) => [
        ...prev,
        ...initialData.map((item) => ({ ...item, id: item.id + prev.length })),
      ]);
    }, 2000);
  };

  const BannerData = {
    heading: "Gallery",
    backgroundUrl: "/gallery.webp",
    breadcrumbs: [
      {
        link: "/",
        linkText: "Home",
        icon: BsHouseDoor,
      },
      {
        link: "/gallery",
        linkText: "My Gallery",
        icon: BsImages,
      },
    ],
  };

  return (
    <div className="appbody">
      <Helmet>
        <title>Photo Gallery | Raj Kumar Singha</title>
        <meta
          name="description"
          content="Explore Raj Kumar Singha's photo gallery showcasing beautiful moments, travel experiences, and creative photography from various locations."
        />
        <meta
          name="keywords"
          content="photo gallery, photography, Raj Kumar Singha, travel photography, image collection, visual portfolio"
        />
        <link rel="canonical" href={`${myWeb}/gallery`} />
        <meta property="og:title" content="Photo Gallery | Raj Kumar Singha" />
        <meta
          property="og:description"
          content="Explore Raj Kumar Singha's photo gallery showcasing beautiful moments, travel experiences, and creative photography from various locations."
        />
        <meta property="og:image" content="/gallery.webp" />
        <meta property="og:url" content={`${myWeb}/gallery`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Photo Gallery | Raj Kumar Singha" />
        <meta
          name="twitter:description"
          content="Explore Raj Kumar Singha's photo gallery showcasing beautiful moments, travel experiences, and creative photography from various locations."
        />
        <meta name="twitter:image" content="/gallery.webp" />
        <script type="application/ld+json">
          {`
          {
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              "name": "Raj Kumar Singha's Photo Gallery",
              "description": "Explore Raj Kumar Singha's photo gallery showcasing beautiful moments, travel experiences, and creative photography from various locations.",
              "url": "${myWeb}/gallery",
              "image": "/gallery.webp",
              "creator": {
                  "@type": "Person",
                  "name": "Raj Kumar Singha"
              },
              "contentLocation": ${JSON.stringify(
                galleryData.map((image) => ({
                  "@type": "Place",
                  name: image.location,
                }))
              )},
              "datePublished": "${new Date().toISOString().split("T")[0]}",
              "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "${myWeb}/gallery"
              }
          }
          `}
        </script>
      </Helmet>

      {/* Page Banner */}
      <PageBanner BannerData={BannerData} />

      {/* Gallery Section */}
      <div className="container mx-auto py-10 px-4">
        <InfiniteScroll
          dataLength={galleryData.length}
          next={loadMoreImages}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center my-5">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryData.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={`Photo of ${image.location} taken on ${image.date}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  onClick={() => openDialog(image)}
                />

                {/* Hover Details */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="p-3 bg-white rounded-full cursor-pointer"
                    onClick={() => openDialog(image)}
                  >
                    <BsZoomIn size={24} />
                  </div>
                  <p className="text-white mt-3">{image.location}</p>
                  <p className="text-white">{image.date}</p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* Image Modal */}
      <dialog
        id="imageDialog"
        className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target.id === "imageDialog") closeDialog();
        }}
      >
        <div className="modal-box relative p-0 rounded-lg">
          <button
            onClick={closeDialog}
            className="absolute top-1 right-1 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <BsX size={24} style={{ fontWeight: 900 }} />
          </button>
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={`Enlarged view of ${selectedImage.location} taken on ${selectedImage.date}`}
              className="max-w-full max-h-full rounded-lg"
            />
          )}
        </div>
      </dialog>
    </div>
  );
};

export default GalleryPage;