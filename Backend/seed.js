const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust path if needed
const Employee = require("./models/Employee"); // Adjust path if needed

// Sample products
const products = [
  {
    name: "Classic Cappuccino",
    description: "A perfect balance of espresso, steamed milk, and a rich layer of foam.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620141/Classic_Cappuccino_vmglst.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.5 },
    ingredients: ["Espresso", "Steamed Milk", "Foam"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 400 },
      { size: "Medium", price: 450 },
      { size: "Large", price: 500 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Popular morning choice"
  },
  {
    name: "Iced Caramel Latte",
    description: "Chilled espresso with caramel syrup, milk, and ice for a refreshing treat.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620138/Iced_Caramel_Latte_jz30v3.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.7 },
    ingredients: ["Espresso", "Caramel Syrup", "Milk", "Ice"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 475 },
      { size: "Medium", price: 525 },
      { size: "Large", price: 575 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Summer bestseller"
  },
  {
    name: "Mocha Frappuccino",
    description: "A sweet blend of coffee, milk, chocolate syrup, and whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620147/Mocha_Frappuccino_dbinp9.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.6 },
    ingredients: ["Coffee", "Milk", "Chocolate Syrup", "Ice", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 525 },
      { size: "Medium", price: 575 },
      { size: "Large", price: 625 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "High sugar content"
  },
  {
    name: "Espresso Shot",
    description: "A strong and bold single shot of espresso.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620144/Espresso_Shot_gnejgz.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.2 },
    ingredients: ["Espresso"],
    allergens: [],
    sizeOptions: [
      { size: "Single", price: 200 },
      { size: "Double", price: 300 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Quick caffeine fix"
  },
  {
    name: "Vanilla Latte",
    description: "Espresso with steamed milk and a touch of vanilla syrup.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620153/Vanilla_Latte_udxeat.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.8 },
    ingredients: ["Espresso", "Steamed Milk", "Vanilla Syrup"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 445 },
      { size: "Medium", price: 495 },
      { size: "Large", price: 545 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Customer favorite"
  },
  {
    name: "Iced Matcha Latte",
    description: "Refreshing matcha green tea with milk and ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620141/Iced_Matcha_Latte_zudzm0.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.4 },
    ingredients: ["Matcha Powder", "Milk", "Ice"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 500 },
      { size: "Medium", price: 550 },
      { size: "Large", price: 600 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Matcha lovers' favorite"
  },
  {
    name: "Caramel Macchiato",
    description: "Rich espresso with vanilla syrup, milk, and caramel drizzle.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620140/Caramel_Macchiato_p20pa6.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.6 },
    ingredients: ["Espresso", "Vanilla Syrup", "Milk", "Caramel"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 450 },
      { size: "Medium", price: 500 },
      { size: "Large", price: 550 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Balanced sweetness and espresso"
  },
  {
    name: "Cold Brew Coffee",
    description: "Smooth and refreshing cold brew coffee, steeped for 12 hours.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620143/Cold_Brew_Coffee_ovw9uo.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.3 },
    ingredients: ["Cold Brew Coffee", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Regular", price: 395 },
      { size: "Large", price: 445 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Steeped overnight for smoothness"
  },
  {
    name: "Hazelnut Latte",
    description: "Espresso with steamed milk and hazelnut syrup for a nutty sweetness.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620146/Hazelnut_Latte_b84kbn.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.7 },
    ingredients: ["Espresso", "Steamed Milk", "Hazelnut Syrup"],
    allergens: ["Milk", "Tree Nuts"],
    sizeOptions: [
      { size: "Small", price: 470 },
      { size: "Medium", price: 520 },
      { size: "Large", price: 570 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Nutty and smooth"
  },
  {
    name: "Iced Americano",
    description: "Espresso poured over cold water and ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620149/Iced_Americano_do92yd.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.1 },
    ingredients: ["Espresso", "Water", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 325 },
      { size: "Medium", price: 375 },
      { size: "Large", price: 425 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Low-calorie caffeine option"
  },
  {
    name: "Flat White",
    description: "Velvety espresso with microfoam milk, smooth and creamy.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620146/Flat_White_edjgvw.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.5 },
    ingredients: ["Espresso", "Microfoam Milk"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 430 },
      { size: "Medium", price: 480 },
      { size: "Large", price: 530 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Smooth texture, popular with regulars"
  },
  {
    name: "Iced Mocha",
    description: "Chocolatey mocha served chilled over ice with whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620142/Iced_Mocha_yhjgdg.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.6 },
    ingredients: ["Espresso", "Milk", "Chocolate Syrup", "Ice", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 490 },
      { size: "Medium", price: 540 },
      { size: "Large", price: 590 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Decadent summer favorite"
  },
  {
    name: "Pumpkin Spice Latte",
    description: "Espresso with pumpkin spice, steamed milk, and whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Pumpkin_Spice_Latte_urwelm.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.9 },
    ingredients: ["Espresso", "Pumpkin Spice Syrup", "Milk", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 510 },
      { size: "Medium", price: 560 },
      { size: "Large", price: 610 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Seasonal special, high demand in fall"
  },
  {
    name: "Iced Chai Latte",
    description: "Refreshing chai tea latte served over ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620139/Iced_Chai_Latte_bhvoiw.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.4 },
    ingredients: ["Chai Tea", "Milk", "Ice"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 460 },
      { size: "Medium", price: 510 },
      { size: "Large", price: 560 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Spiced and refreshing"
  },
  {
    name: "Irish Coffee",
    description: "Hot coffee with Irish whiskey, sugar, and whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620144/Irish_Coffee_m89cqi.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.7 },
    ingredients: ["Coffee", "Irish Whiskey", "Sugar", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Standard", price: 625 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Contains alcohol, adult-only menu"
  },
  {
    name: "Strawberry Frappe",
    description: "Creamy strawberry frappe topped with whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620149/Strawberry_Frappe_mbla2l.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.6 },
    ingredients: ["Strawberries", "Milk", "Ice", "Sugar", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 530 },
      { size: "Medium", price: 580 },
      { size: "Large", price: 630 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Kid-friendly and colorful"
  },
  {
    name: "Turkish Coffee",
    description: "Traditional strong Turkish coffee served hot in a small cup.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620151/Turkish_Coffee_uxb2nx.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.2 },
    ingredients: ["Finely Ground Coffee", "Water", "Sugar"],
    allergens: [],
    sizeOptions: [
      { size: "Single", price: 350 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Traditional preparation, no milk"
  },
  {
    name: "Affogato",
    description: "Espresso poured over a scoop of vanilla ice cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620138/Affogato_glytoz.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.9 },
    ingredients: ["Espresso", "Vanilla Ice Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Single", price: 475 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Dessert-style drink"
  },
  {
    name: "Iced Green Tea",
    description: "Refreshing iced green tea with a hint of lemon.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620140/Iced_Green_Tea_unef4r.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.0 },
    ingredients: ["Green Tea", "Ice", "Lemon"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 340 },
      { size: "Medium", price: 390 },
      { size: "Large", price: 440 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Light and refreshing, caffeine-free"
  },
  {
    name: "Hot Chocolate",
    description: "Creamy hot chocolate topped with whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620147/Hot_Chocolate_hzsioo.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.6 },
    ingredients: ["Cocoa Powder", "Milk", "Sugar", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 370 },
      { size: "Medium", price: 420 },
      { size: "Large", price: 470 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Popular with kids and winter crowd"
  },
  {
    name: "Iced Vanilla Latte",
    description: "Chilled vanilla latte served over ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620143/Iced_Vanilla_Latte_pehqsn.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.7 },
    ingredients: ["Espresso", "Vanilla Syrup", "Milk", "Ice"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 450 },
      { size: "Medium", price: 500 },
      { size: "Large", price: 550 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Smooth and sweet, great iced"
  },
  {
    name: "Café au Lait",
    description: "Freshly brewed coffee with hot steamed milk.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620139/Caf%C3%A9_au_Lait_faiiwh.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.3 },
    ingredients: ["Coffee", "Steamed Milk"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 380 },
      { size: "Medium", price: 430 },
      { size: "Large", price: 480 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Classic French-style brew"
  },
  {
    name: "Iced Coconut Latte",
    description: "Refreshing latte made with coconut milk and ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620138/Iced_Coconut_Latte_mostzn.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.5 },
    ingredients: ["Espresso", "Coconut Milk", "Ice"],
    allergens: ["Tree Nuts"],
    sizeOptions: [
      { size: "Small", price: 510 },
      { size: "Medium", price: 560 },
      { size: "Large", price: 610 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Dairy-free option, tropical twist"
  },
  {
    name: "Cinnamon Dolce Latte",
    description: "Espresso with cinnamon syrup, steamed milk, and whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620143/Cinnamon_Dolce_Latte_crswut.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.8 },
    ingredients: ["Espresso", "Cinnamon Syrup", "Milk", "Whipped Cream"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 490 },
      { size: "Medium", price: 540 },
      { size: "Large", price: 590 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Warm and spiced, seasonal favorite"
  },
  {
    name: "Iced Espresso",
    description: "Double shot of espresso poured over ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620139/Iced_Espresso_h9uls4.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.1 },
    ingredients: ["Espresso", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Single", price: 350 },
      { size: "Double", price: 450 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Simple and bold"
  },
  {
    name: "Latte Macchiato",
    description: "Steamed milk topped with a rich shot of espresso.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620145/Latte_Macchiato_z7ixk9.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.5 },
    ingredients: ["Espresso", "Steamed Milk"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 450 },
      { size: "Medium", price: 500 },
      { size: "Large", price: 550 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Layered presentation, smooth finish"
  },
  {
    name: "Mango Smoothie",
    description: "Fresh mango smoothie blended with yogurt and ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620146/Mango_Smoothie_kq01wy.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.6 },
    ingredients: ["Mango", "Yogurt", "Ice", "Sugar"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 540 },
      { size: "Medium", price: 590 },
      { size: "Large", price: 640 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Fruit-forward, great for summer"
  },
  {
    name: "Cortado",
    description: "Equal parts espresso and warm milk for a smooth taste.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620144/Cortado_epxx59.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.4 },
    ingredients: ["Espresso", "Warm Milk"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Single", price: 380 },
      { size: "Double", price: 430 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Balanced and bold"
  },
  {
    name: "Peach Iced Tea",
    description: "Refreshing iced tea with a hint of peach flavor.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Peach_Iced_Tea_pxlfk5.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.2 },
    ingredients: ["Black Tea", "Peach Syrup", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 345 },
      { size: "Medium", price: 395 },
      { size: "Large", price: 445 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Fruit-forward iced tea"
  },
  {
    name: "Chai Tea Latte",
    description: "Aromatic spiced chai tea blended with steamed milk.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620141/Chai_Tea_Latte_tigdgd.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.7 },
    ingredients: ["Chai Tea", "Steamed Milk", "Spices"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 440 },
      { size: "Medium", price: 490 },
      { size: "Large", price: 540 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Spiced and comforting"
  },
  {
    name: "Iced Lemonade",
    description: "Chilled lemonade served with ice and lemon slices.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620145/Iced_Lemonade_xdeofu.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.3 },
    ingredients: ["Lemon Juice", "Sugar", "Water", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 320 },
      { size: "Medium", price: 370 },
      { size: "Large", price: 420 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Caffeine-free refreshment"
  },
  {
    name: "Americano",
    description: "Espresso diluted with hot water for a rich flavor.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620137/Americano_zrb0bx.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.2 },
    ingredients: ["Espresso", "Hot Water"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 330 },
      { size: "Medium", price: 380 },
      { size: "Large", price: 430 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Classic black coffee"
  },
  {
    name: "Cookies & Cream Frappe",
    description: "Delicious frappe with cookies, cream, and whipped topping.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620144/Cookies_Cream_Frappe_xy7htq.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.8 },
    ingredients: ["Cookies", "Milk", "Ice", "Cream"],
    allergens: ["Milk", "Gluten"],
    sizeOptions: [
      { size: "Small", price: 550 },
      { size: "Medium", price: 600 },
      { size: "Large", price: 650 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Dessert-style frappe"
  },
  {
    name: "Ristretto",
    description: "A concentrated espresso shot with a bold taste.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620153/Ristretto_fxbn1k.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.3 },
    ingredients: ["Espresso"],
    allergens: [],
    sizeOptions: [
      { size: "Single", price: 220 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Short and intense"
  },
  {
    name: "Blueberry Smoothie",
    description: "Refreshing blueberry smoothie with yogurt.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620138/Blueberry_Smoothie_xpwsuy.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.7 },
    ingredients: ["Blueberries", "Yogurt", "Ice", "Sugar"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 560 },
      { size: "Medium", price: 610 },
      { size: "Large", price: 660 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Antioxidant-rich and creamy"
  },
  {
    name: "Macchiato",
    description: "Espresso topped with a small amount of milk foam.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620146/Macchiato_viu9gt.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.4 },
    ingredients: ["Espresso", "Milk Foam"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Single", price: 390 },
      { size: "Double", price: 440 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Espresso-forward with a touch of foam"
  },
  {
    name: "Passionfruit Iced Tea",
    description: "Tropical passionfruit flavored iced tea.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Passionfruit_Iced_Tea_gtfob7.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.5 },
    ingredients: ["Black Tea", "Passionfruit Syrup", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 360 },
      { size: "Medium", price: 410 },
      { size: "Large", price: 460 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Tropical and refreshing"
  },
  {
    name: "Caffè Mocha",
    description: "Espresso combined with chocolate and steamed milk.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620139/Caff%C3%A8_Mocha_jlhzqx.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.6 },
    ingredients: ["Espresso", "Chocolate Syrup", "Steamed Milk"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 470 },
      { size: "Medium", price: 520 },
      { size: "Large", price: 570 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Chocolate lovers' go-to"
  },
  {
    name: "Banana Smoothie",
    description: "Smooth banana blend with milk and ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620138/Banana_Smoothie_tjutuq.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.5 },
    ingredients: ["Banana", "Milk", "Ice", "Sugar"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 530 },
      { size: "Medium", price: 580 },
      { size: "Large", price: 630 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Creamy and energizing"
  },
  {
    name: "Iced Coffee",
    description: "Classic iced coffee brewed fresh and served over ice.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620139/Iced_Coffee_vyt8gv.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.2 },
    ingredients: ["Coffee", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 310 },
      { size: "Medium", price: 360 },
      { size: "Large", price: 410 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Simple and bold"
  },
  {
    name: "Coconut Frappuccino",
    description: "Creamy coconut frappe topped with whipped cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620143/Coconut_Frappuccino_rgusoz.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.6 },
    ingredients: ["Coconut Milk", "Ice", "Sugar", "Whipped Cream"],
    allergens: ["Tree Nuts", "Milk"],
    sizeOptions: [
      { size: "Small", price: 570 },
      { size: "Medium", price: 620 },
      { size: "Large", price: 670 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Tropical dessert-style drink"
  },
  {
    name: "Double Espresso",
    description: "A bold double shot of espresso for a strong kick.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620147/Double_Espresso_stji7n.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.5 },
    ingredients: ["Espresso"],
    allergens: [],
    sizeOptions: [
      { size: "Double", price: 280 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Strong and straightforward"
  },
  {
    name: "Mint Mojito Iced Coffee",
    description: "Cold brew coffee mixed with mint and lime for a refreshing twist.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620146/Mint_Mojito_Iced_Coffee_kmkekk.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.8 },
    ingredients: ["Cold Brew Coffee", "Mint", "Lime", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 540 },
      { size: "Medium", price: 590 },
      { size: "Large", price: 640 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Refreshing twist on cold brew"
  },
  {
    name: "Hot Green Tea",
    description: "A calming cup of freshly brewed green tea.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Hot_Green_Tea_b4fzc9.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.1 },
    ingredients: ["Green Tea Leaves", "Hot Water"],
    allergens: [],
    sizeOptions: [
      { size: "Regular", price: 340 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Caffeine-light and soothing"
  },
  {
    name: "Pistachio Latte",
    description: "Espresso with steamed milk and pistachio syrup.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Pistachio_Latte_em0zak.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.7 },
    ingredients: ["Espresso", "Steamed Milk", "Pistachio Syrup"],
    allergens: ["Milk", "Tree Nuts"],
    sizeOptions: [
      { size: "Small", price: 530 },
      { size: "Medium", price: 580 },
      { size: "Large", price: 630 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Nutty and creamy, seasonal favorite"
  },
  {
    name: "Iced Raspberry Tea",
    description: "Refreshing raspberry iced tea served chilled.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620143/Iced_Raspberry_Tea_zdojo1.jpg",
    category: { hot: false, cold: true },
    rating: { rate: 4.3 },
    ingredients: ["Black Tea", "Raspberry Syrup", "Ice"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 335 },
      { size: "Medium", price: 385 },
      { size: "Large", price: 435 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Fruity and refreshing"
  },
  {
    name: "Hot Spiced Apple Cider",
    description: "Warm spiced apple cider with cinnamon and cloves.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Hot_Spiced_Apple_Cider_e8qpvj.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.6 },
    ingredients: ["Apple Juice", "Cinnamon", "Cloves"],
    allergens: [],
    sizeOptions: [
      { size: "Small", price: 420 },
      { size: "Medium", price: 470 },
      { size: "Large", price: 520 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Perfect for chilly evenings"
  },
  {
    name: "Tiramisu Frappe",
    description: "Dessert-inspired frappe with coffee, cocoa, and cream.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620152/Tiramisu_Frappe_hvixwn.png",
    category: { hot: false, cold: true },
    rating: { rate: 4.9 },
    ingredients: ["Espresso", "Cocoa", "Cream", "Ice"],
    allergens: ["Milk"],
    sizeOptions: [
      { size: "Small", price: 600 },
      { size: "Medium", price: 650 },
      { size: "Large", price: 700 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Rich and indulgent, dessert-style"
  },
  {
    name: "Hot Herbal Tea",
    description: "Soothing herbal tea made with natural herbs and flowers.",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755620148/Hot_Herbal_Tea_ktim66.jpg",
    category: { hot: true, cold: false },
    rating: { rate: 4.0 },
    ingredients: ["Herbal Tea Blend", "Hot Water"],
    allergens: [],
    sizeOptions: [
      { size: "Regular", price: 330 }
    ],
    availability: true,
    isActive: true,
    adminNotes: "Caffeine-free and calming"
  }
];

// Sample employees
const employees = [
  {
    name: "Amaya Silva",
    position: "Head Barista",
    experience: "5 years in specialty coffee and latte art competitions",
    speciality: "Latte Art & Seasonal Menu Creation",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755782924/Amaya_Silva_rkuy1h.jpg",
    public: true,
    email: "amaya.silva@example.com",
    phone: "+94-712345678",
    address: "123 Coffee Lane, Colombo",
    dateOfBirth: new Date("1995-03-12"),
    nationalID: "951234567V",
    salary: 75000,
    employmentStatus: "active",
    notes: "Award-winning barista with seasonal menu expertise"
  },
  {
    name: "Ravindu Perera",
    position: "Operations Manager",
    experience: "3 years managing inventory and supplier relations",
    speciality: "Supply Chain & Vendor Coordination",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755782738/Ravindu_Perera_dlzvcw.jpg",
    public: true,
    email: "ravindu.perera@example.com",
    phone: "+94-712345679",
    address: "456 Logistics Street, Kandy",
    dateOfBirth: new Date("1990-07-22"),
    nationalID: "901234568V",
    salary: 85000,
    employmentStatus: "active",
    notes: "Streamlined vendor coordination across multiple regions"
  },
  {
    name: "Tharushi Fernando",
    position: "Front-of-House Lead",
    experience: "4 years in customer service and POS systems",
    speciality: "Guest Experience & Service Flow",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755782746/Tharushi_Fernando_mbgulj.jpg",
    public: true,
    email: "tharushi.fernando@example.com",
    phone: "+94-712345680",
    address: "789 Hospitality Ave, Galle",
    dateOfBirth: new Date("1993-11-05"),
    nationalID: "931234569V",
    salary: 70000,
    employmentStatus: "active",
    notes: "Expert in customer engagement and POS optimization"
  },
  {
    name: "Kavindu Jayasuriya",
    position: "Coffee Roaster",
    experience: "2 years roasting beans and curating flavor profiles",
    speciality: "Roast Profiling & Flavor Development",
    image: "https://res.cloudinary.com/dgjs19uyt/image/upload/v1755782870/Kavindu_Jayasuriya_p7qkjv.jpg",
    public: true,
    email: "kavindu.jayasuriya@example.com",
    phone: "+94-712345681",
    address: "321 Roast Blvd, Matara",
    dateOfBirth: new Date("1998-01-18"),
    nationalID: "981234570V",
    salary: 65000,
    employmentStatus: "active",
    notes: "Developed signature roast profiles for premium blends"
  }
];

// Seed function
async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/cafeDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Product.deleteMany({});
    await Employee.deleteMany({});

    await Product.insertMany(products);
    await Employee.insertMany(employees);

    console.log("✅ Database seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    mongoose.disconnect();
  }
}

seedDatabase();