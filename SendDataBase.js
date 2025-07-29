const axios = require('axios');

const productData = {
    id: 7,
    title: "SP-2 | გარდერობი | Aristo სტილი",
    img: "https://res.cloudinary.com/dluqegrav/image/upload/v1751312497/icture-7_kbeswj.jpg",
    category: "Wardboards",
    price: 1350,
    description:
      "თანამედროვე დიზაინის, კომპაქტური და ფუნქციური გარდერობი სარკეებით, რომელიც იდეალურია სადარბაზოსთვის ან საძინებლისთვის.",
    details: {
      material: "ლამინირებული MDF / ხის, პრიალა და სარკის ზედაპირი",
      producer: "Aristo (სტილით, ან მსგავსი მწარმოებელი)",
      dimensions: {
        general: "260x160;",
      },
      colors: [
        "ნათელი ხისფერი (კედლის ეფექტი)",
        "ღია ნაცრისფერი/კრემისფერი",
        "მუქი ნაცრისფერი/ანტრაციტი",
        "სარკისფერი",
      ],
      features: [
        "მოცურებადი კარები",
        "დიდი სარკის ზედაპირი",
        "ღია თაროები დეკორაციისთვის ან წიგნებისთვის",
        "ინტეგრირებული განათება (ჭერზე)",
        "თანამედროვე მინიმალისტური დიზაინი",
        "კომბინირებული მასალები: ხე, მეთი და პრიალა ზედაპირები",
      ],
    }
  }

async function sendProduct() {
  try {
    const response = await axios.post('https://zatara-backend.onrender.com/api/products', productData);
    console.log('✅ წარმატებით დაემატა:', response.data);
  } catch (error) {
    console.error('❌ შეცდომა:', error.response ? error.response.data : error.message);
  }
}

sendProduct();