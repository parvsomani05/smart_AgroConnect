import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function ProductForm() {
  const { t } = useTranslation();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert(t("product_form.alerts.max_images"));
      return;
    }
    setImages(files);
  };

  const handleCertificationUpload = (e) => {
    setCertifications(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(t("product_form.alerts.success"));
    } catch (error) {
      alert(t("product_form.alerts.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">{t("product_form.title")}</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">{t("product_form.fields.product_name")}</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full border p-3 rounded-lg mt-2" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">{t("product_form.fields.description")}</label>
            <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required className="w-full border p-3 rounded-lg mt-2 h-24" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">{t("product_form.fields.price")}</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border p-3 rounded-lg mt-2" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">{t("product_form.fields.quantity")}</label>
            <div className="flex items-center space-x-2">
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="w-full border p-3 rounded-lg mt-2" />
              <span className="text-gray-600">kg</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">{t("product_form.fields.images")}</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full border p-3 rounded-lg mt-2" />
            <div className="flex gap-2 mt-3">
              {images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">{t("product_form.fields.certification")}</label>
            <input type="file" accept=".pdf, .jpg, .png" multiple onChange={handleCertificationUpload} className="w-full border p-3 rounded-lg mt-2" />
            <p className="text-sm text-gray-500 mt-1">{t("product_form.fields.allowed_formats")}</p>
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-600 transition" disabled={loading}>
            {loading ? (
              <div className="flex items-center space-x-2">
                <span className="loader"></span>
                <span>{t("product_form.fields.submitting")}</span>
              </div>
            ) : (
              t("product_form.fields.submit")
            )}
          </motion.button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
