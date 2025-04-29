import React from "react";

const Footer = () => {
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;

  const handleClickSocialWithNewBlank = (link) => {
    window.open(link, "_blank");
  };

  return (
    <footer className="bg-gradient-to-r from-[#09203f] to-[#453a94] text-white py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & Description */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={`${ASSETS}/zplayer.jpg`}
              alt="ZIPTV Logo"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-2xl font-semibold">ZIPTV - Player</span>
          </div>
          <p className="text-sm opacity-70">
            &copy; 2022 ZIPTV. All rights reserved.
          </p>
        </div>

        {/* Menu */}
        <div className="flex-1 space-y-4">
          <h4 className="text-xl font-semibold">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/tv" className="hover:underline">
                TV
              </a>
            </li>
          </ul>
          <p className="text-xs text-white/60 mt-4">Version 1.0</p>
        </div>

        {/* Social / Contact */}
        <div className="flex-1 space-y-4">
          <h4 className="text-xl font-semibold">Contact</h4>
          <ul className="space-y-3">
            <li
              onClick={() =>
                handleClickSocialWithNewBlank("https://github.com/zuDskyy")
              }
              className="flex items-center gap-3 cursor-pointer hover:underline"
            >
              <img
                src={`${ASSETS}/github.png`}
                alt="GitHub"
                className="w-6 h-6"
              />
              <span>GitHub</span>
            </li>
            <li
              onClick={() =>
                handleClickSocialWithNewBlank(
                  "https://www.linkedin.com/in/zurab-dalakishvili-a7b996220/"
                )
              }
              className="flex items-center gap-3 cursor-pointer hover:underline"
            >
              <img
                src={`${ASSETS}/linkedin.png`}
                alt="LinkedIn"
                className="w-6 h-6"
              />
              <span>LinkedIn</span>
            </li>
          </ul>
          <p className="text-xs text-white/60 mt-4">
            Powered by <strong>ZuDskyy</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
