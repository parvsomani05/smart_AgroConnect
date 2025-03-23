import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <nav className="bg-gradient-to-r from-green-200 to-green-300 shadow-md p-4 flex justify-between items-center transition-all duration-300">
      {/* Title with Bounce Animation */}
      <h1 className="text-2xl font-bold text-green-700 animate-bounce">{t("title")}</h1>

      {/* Navigation Links with Smooth Hover */}
      <div className="flex gap-6">
        <Link to="/" className="relative text-lg text-green-800 font-medium hover:text-green-900 transition-all duration-300 group">
          {t("home")}
          <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-green-800 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>

      {/* Language Dropdown with Better UI */}
      <div className="relative w-40">
  <select
    onChange={changeLanguage}
    className="w-full border border-gray-300 rounded-lg bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
  >
    <option value="en">English</option>
    <option value="hi">हिन्दी</option>
    <option value="gu">ગુજરાતી</option>
  </select>
  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    ▼
  </div>
</div>


    </nav>
  );
}
