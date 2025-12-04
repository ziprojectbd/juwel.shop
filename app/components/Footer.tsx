export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-indigo-900 via-purple-900 to-pink-900 text-gray-200 border-t border-gray-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand / Primary */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-xs font-black text-white tracking-[0.2em]">
                  ZI
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-semibold tracking-wide text-white uppercase">
                  ZI PREMIUM SERVICES
                </span>
                <span className="text-[11px] sm:text-xs text-gray-400">
                  Premium Digital Services Platform
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-yellow-200 max-w-md leading-relaxed">
              Affordable access to global premium apps, VPNs and social media
              growth — with local payment methods and trusted support.
            </p>
          </div>

          {/* Services based on your website */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
            <div>
              <p className="uppercase text-[11px] tracking-[0.16em] text-pink-300 font-extrabold mb-1">
                Streaming & Media
              </p>
              <ul className="space-y-0.5 text-gray-300 font-medium">
                <li className="hover:text-pink-400 transition-colors italic">Netflix Premium</li>
                <li className="hover:text-red-400 transition-colors italic">YouTube Premium</li>
                <li className="hover:text-green-400 transition-colors italic">Spotify Premium</li>
                <li className="hover:text-yellow-400 transition-colors italic">Other OTT Accounts</li>
              </ul>
            </div>

            <div>
              <p className="uppercase text-[11px] tracking-[0.16em] text-indigo-300 font-extrabold mb-1">
                Design & Productivity
              </p>
              <ul className="space-y-0.5 text-gray-300 font-medium">
                <li className="hover:text-indigo-400 transition-colors italic">Canva Pro</li>
                <li className="hover:text-sky-400 transition-colors italic">Graphic / Content Tools</li>
                <li className="hover:text-teal-400 transition-colors italic">Team / Shared Accounts</li>
              </ul>
            </div>

            <div>
              <p className="uppercase text-[11px] tracking-[0.16em] text-emerald-300 font-extrabold mb-1">
                Security & VPN
              </p>
              <ul className="space-y-0.5 text-gray-300 font-medium">
                <li className="hover:text-emerald-400 transition-colors italic">ExpressVPN</li>
                <li className="hover:text-lime-400 transition-colors italic">NordVPN</li>
                <li className="hover:text-cyan-400 transition-colors italic">Other Premium VPNs</li>
              </ul>
            </div>

            <div>
              <p className="uppercase text-[11px] tracking-[0.16em] text-yellow-300 font-extrabold mb-1">
                Social Media Services
              </p>
              <ul className="space-y-0.5 text-gray-300 font-medium">
                <li className="hover:text-blue-400 transition-colors italic">Facebook & Instagram Growth</li>
                <li className="hover:text-rose-400 transition-colors italic">YouTube & TikTok Engagement</li>
                <li className="hover:text-fuchsia-400 transition-colors italic">Custom Social Packages</li>
              </ul>
            </div>
          </div>

          {/* Credits */}
          <div className="text-left text-xs sm:text-sm space-y-1">
            <p className="font-semibold text-gray-100 italic">
              &copy; {year} ZI Premium Shop
              <span className="text-gray-400 font-normal"> · All rights reserved.</span>
            </p>
            <p className="text-gray-300/90 italic">
              Crafted by{" "}
              <a
                href="https://t.me/zikrulislamjuwel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 hover:from-sky-300 hover:via-blue-300 hover:to-indigo-300 transition-colors underline-offset-2 hover:underline"
              >
                ZIKRUL ISLAM
              </a>
            </p>
            <p className="text-[11px] sm:text-xs text-gray-400 italic">
              Bangladesh · Global Digital Services
            </p>
          </div>
        </div>

        {/* Meta line */}
        <div className="mt-6 pt-4 border-t border-gray-800/80 text-center text-[11px] sm:text-xs text-gray-300 tracking-wide font-semibold italic">
          Secure Payment · Fast Delivery · After-Sales Support
        </div>
      </div>
    </footer>
  );
}