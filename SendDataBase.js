const axios = require('axios');

const productData = {
  id: 6,
  title: "SP-1 | სამზარეულო | Selsa Mobilya",
  img: "https://res.cloudinary.com/dluqegrav/image/upload/v1751312497/icture-6_qtqcyf.jpg",
  category: "Kitchen",
  price: 2000,
  description: "თანამედროვე L-ფორმის სამზარეულო კონტრასტული ფერებით და პრაქტიკული დიზაინით.",
  details: {
    material: "ლამინირებული MDF / ხის ეფექტით და თეთრი პრიალა",
    producer: "Selsa Mobilya",
    dimensions: {
      general: "260x90; 220x100",
    },
    colors: [
      "მუქი ხისფერი (მუხის ეფექტით)",
      "თეთრი",
      "ღია ნაცრისფერი (კედლის ფილა)",
    ],
    features: [
      "ჩაშენებული ღუმელი და გაზქურა",
      "ჩაშენებული ნიჟარა",
      "ზედა და ქვედა კარადები უამრავი საცავის სივრცით",
      "შუშის კარებიანი კარადები",
      "ინტეგრირებული სარეცხი მანქანა",
      "თანამედროვე შავი სახელურები",
    ],
  },
};

async function sendProduct() {
  try {
    const response = await axios.post('https://zatara-backend.onrender.com/api/products', productData);
    console.log('✅ წარმატებით დაემატა:', response.data);
  } catch (error) {
    console.error('❌ შეცდომა:', error.response ? error.response.data : error.message);
  }
}

sendProduct();