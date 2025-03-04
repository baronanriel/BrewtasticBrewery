import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Star } from "lucide-react";

const beers = [
  { id: 1, name: "Golden Lager", description: "A crisp, refreshing lager.", price: 5.99 },
  { id: 2, name: "Hoppy IPA", description: "A bold IPA with citrus notes.", price: 6.49 },
  { id: 3, name: "Dark Stout", description: "Rich and creamy with coffee flavors.", price: 6.99 },
  { id: 4, name: "Amber Ale", description: "Malty and smooth.", price: 5.79 },
  { id: 5, name: "Wheat Beer", description: "Fruity with a smooth finish.", price: 5.49 },
];

export default function BreweryApp() {
  const [cart, setCart] = useState([]);
  const [ratings, setRatings] = useState({});

  const addToCart = (beer) => {
    setCart([...cart, beer]);
  };

  const rateBeer = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Our Beers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beers.map((beer) => (
          <Card key={beer.id} className="p-4 bg-white rounded-lg shadow-md">
            <CardContent>
              <h2 className="text-2xl font-semibold text-gray-800">{beer.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{beer.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">${beer.price.toFixed(2)}</p>
              <Button className="mt-3 w-full" onClick={() => addToCart(beer)}>Add to Cart</Button>

              {/* ⭐ Rating System */}
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="cursor-pointer w-6 h-6"
                    onClick={() => rateBeer(beer.id, star)}
                    fill={ratings[beer.id] >= star ? "yellow" : "none"}  // ✅ Dynamically fill stars
                    stroke="black"
                    strokeWidth="2"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🛒 Cart */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">Cart ({cart.length})</h2>
        <ul className="mt-2">
          {cart.map((item, index) => (
            <li key={index} className="text-lg text-gray-700">{item.name} - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}