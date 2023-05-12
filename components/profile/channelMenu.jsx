import { useState } from "react";
import style from "../../styles/ChannelMenu.module.css";
import AuthorBlog from "./AuthorBlog";
import NFTGallery from "../wallet/nftGallery.jsx"
import About from "./About.jsx"

const ChannelNav = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setShowDropdown(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "videos":
        return <ChannelVideos />;
      case "blog":
        return <AuthorBlog />;
      case "about":
        return <About />;
      case "nfts":
        return <NFTGallery />;
      case "drops":
        return <ChannelDrops />;
      default:
        return null;
    }
  };

  return (
    <div className={style.channelProfile}>
      <div className={style.tabBar}>
        <div className={style.tabBarLeft}>
          <div className={style.tabDropdown}>
            <div className={style.tabDropdownButton} onClick={() => setShowDropdown(!showDropdown)}>
              <i className="fas fa-bars"></i>
            </div>
            {showDropdown && (
              <div className={style.tabDropdownContent}>
                <div onClick={() => handleTabClick("videos")} className={style.tabDropdownItem}>
                  Videos
                </div>
                <div onClick={() => handleTabClick("blog")} className={style.tabDropdownItem}>
                  Blog
                </div>
                <div onClick={() => handleTabClick("about")} className={style.tabDropdownItem}>
                  About
                </div>
                <div onClick={() => handleTabClick("nfts")} className={style.tabDropdownItem}>
                  NFTs
                </div>
                <div onClick={() => handleTabClick("drops")} className={style.tabDropdownItem}>
                  Drops
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => handleTabClick("videos")}
            className={`${style.tab} ${activeTab === "videos" && style.active}`}
          >
            Videos
          </div>
          <div
            onClick={() => handleTabClick("blog")}
            className={`${style.tab} ${activeTab === "blog" && style.active}`}
          >
            Blog
          </div>
          <div
            onClick={() => handleTabClick("about")}
            className={`${style.tab} ${activeTab === "about" && style.active}`}
          >
            About
          </div>
          <div
            onClick={() => handleTabClick("nfts")}
            className={`${style.tab} ${activeTab === "nfts" && style.active}`}
          >
            NFTs
          </div>
          <div
            onClick={() => handleTabClick("drops")}
            className={`${style.tab} ${activeTab === "drops" && style.active}`}
          >
            Drops
          </div>
        </div>
      </div>
      <div className={style.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

const ChannelVideos = () => {
  return <div>Videos Component</div>;
};

const ChannelBlog = () => {
  return <div>Blog Component</div>;
};

const ChannelAbout = () => {
  return <div>About Component</div>;
};

const ChannelNFTs = () => {
  return <div>NFTs Component</div>;
};

const ChannelDrops = () => {
  return <div>Drops Component</div>;
};

export default ChannelNav;
