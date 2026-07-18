import type { Category } from './types';

export const categoriesEn: Category[] = [
  {
    id: 'easy',
    name: 'Easy words',
    icon: '🎲',
    hint: 'Everyday',
    words: [
      { word: 'Apple', hint: 'Nature' }, { word: 'Dog', hint: 'Animal' }, { word: 'Sun', hint: 'Sky' }, { word: 'Book', hint: 'Paper' }, { word: 'Chair', hint: 'Furniture' },
      { word: 'Water', hint: 'Nature' }, { word: 'Window', hint: 'House' }, { word: 'Shoe', hint: 'Clothing' }, { word: 'Tree', hint: 'Nature' }, { word: 'Car', hint: 'Machine' },
      { word: 'Cup', hint: 'Kitchen' }, { word: 'Glasses', hint: 'Face' }, { word: 'Key', hint: 'Metal' }, { word: 'Clock', hint: 'Tech' }, { word: 'Pillow', hint: 'Fabric' },
      { word: 'Spoon', hint: 'Metal' }, { word: 'Rain', hint: 'Weather' }, { word: 'Mountain', hint: 'Nature' }, { word: 'Bridge', hint: 'Structure' }, { word: 'Candle', hint: 'Light' },
      { word: 'Mirror', hint: 'Glass' }, { word: 'Carpet', hint: 'Floor' }, { word: 'Toothbrush', hint: 'Bathroom' }, { word: 'Umbrella', hint: 'Weather' }, { word: 'Pencil', hint: 'Wood' },
      { word: 'Balloon', hint: 'Party' }, { word: 'Suitcase', hint: 'Trip' }, { word: 'Glove', hint: 'Clothing' }, { word: 'Alarm', hint: 'Sleep' }, { word: 'Fork', hint: 'Kitchen' },
      { word: 'Soap', hint: 'Bathroom' }, { word: 'Lamp', hint: 'Power' }, { word: 'Bicycle', hint: 'Traffic' }, { word: 'Cloud', hint: 'Sky' }, { word: 'Flower', hint: 'Plant' }, { word: 'Fire', hint: 'Heat' }
    ],
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: '🍕',
    hint: 'Food',
    words: [
      { word: 'Pizza', hint: 'Oven' }, { word: 'Spaghetti', hint: 'Plate' }, { word: 'Sushi', hint: 'Asia' }, { word: 'Burger', hint: 'Meat' }, { word: 'Chocolate', hint: 'Sweet' },
      { word: 'Cheese', hint: 'Fridge' }, { word: 'Banana', hint: 'Plant' }, { word: 'Coffee', hint: 'Cup' }, { word: 'Ice cream', hint: 'Summer' }, { word: 'Soup', hint: 'Bowl' },
      { word: 'Salad', hint: 'Bowl' }, { word: 'Fries', hint: 'Fried' }, { word: 'Pancake', hint: 'Pan' }, { word: 'Pretzel', hint: 'Bakery' }, { word: 'Kebab', hint: 'Snack' },
      { word: 'Sausage', hint: 'Snack' }, { word: 'Popcorn', hint: 'Snack' }, { word: 'Honey', hint: 'Sweet' }, { word: 'Strawberry', hint: 'Summer' }, { word: 'Lemon', hint: 'Fruit' },
      { word: 'Rice', hint: 'Cook' }, { word: 'Noodles', hint: 'Cook' }, { word: 'Toast', hint: 'Breakfast' }, { word: 'Croissant', hint: 'Breakfast' }, { word: 'Waffle', hint: 'Bake' },
      { word: 'Muffin', hint: 'Bake' }, { word: 'Steak', hint: 'Pan' }, { word: 'Salmon', hint: 'Water' }, { word: 'Pumpkin', hint: 'Autumn' }, { word: 'Cucumber', hint: 'Water' },
      { word: 'Watermelon', hint: 'Fruit' }, { word: 'Pineapple', hint: 'Fruit' }, { word: 'Beer', hint: 'Glass' }, { word: 'Ketchup', hint: 'Bottle' }, { word: 'Cake', hint: 'Celebration' }, { word: 'Cookie', hint: 'Snack' }
    ],
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    hint: 'Animal',
    words: [
      { word: 'Elephant', hint: 'Wilderness' }, { word: 'Lion', hint: 'Africa' }, { word: 'Penguin', hint: 'Cold' }, { word: 'Dolphin', hint: 'Water' }, { word: 'Eagle', hint: 'Sky' },
      { word: 'Crocodile', hint: 'River' }, { word: 'Giraffe', hint: 'Africa' }, { word: 'Kangaroo', hint: 'Wilderness' }, { word: 'Hedgehog', hint: 'Nature' }, { word: 'Fox', hint: 'Forest' },
      { word: 'Wolf', hint: 'Forest' }, { word: 'Bear', hint: 'Wilderness' }, { word: 'Shark', hint: 'Water' }, { word: 'Octopus', hint: 'Ocean' }, { word: 'Parrot', hint: 'Jungle' },
      { word: 'Turtle', hint: 'Nature' }, { word: 'Frog', hint: 'Pond' }, { word: 'Snake', hint: 'Nature' }, { word: 'Bee', hint: 'Insect' }, { word: 'Butterfly', hint: 'Insect' },
      { word: 'Owl', hint: 'Forest' }, { word: 'Zebra', hint: 'Wilderness' }, { word: 'Rhino', hint: 'Africa' }, { word: 'Flamingo', hint: 'Water' }, { word: 'Raccoon', hint: 'Forest' },
      { word: 'Sloth', hint: 'Jungle' }, { word: 'Panda', hint: 'Asia' }, { word: 'Koala', hint: 'Wilderness' }, { word: 'Tiger', hint: 'Asia' }, { word: 'Monkey', hint: 'Jungle' },
      { word: 'Camel', hint: 'Heat' }, { word: 'Donkey', hint: 'Farm' }, { word: 'Cow', hint: 'Farm' }, { word: 'Horse', hint: 'Farm' }, { word: 'Mouse', hint: 'House' }, { word: 'Bat', hint: 'Cave' }
    ],
  },
  {
    id: 'places',
    name: 'Places',
    icon: '📍',
    hint: 'Place',
    words: [
      { word: 'Beach', hint: 'Vacation' }, { word: 'Airport', hint: 'Trip' }, { word: 'Hospital', hint: 'Health' }, { word: 'School', hint: 'Learn' }, { word: 'Cinema', hint: 'Leisure' },
      { word: 'Station', hint: 'Traffic' }, { word: 'Supermarket', hint: 'Routine' }, { word: 'Library', hint: 'Building' }, { word: 'Zoo', hint: 'Leisure' }, { word: 'Museum', hint: 'Building' },
      { word: 'Park', hint: 'Nature' }, { word: 'Restaurant', hint: 'Outing' }, { word: 'Pool', hint: 'Leisure' }, { word: 'Gym', hint: 'Building' }, { word: 'Church', hint: 'Building' },
      { word: 'Castle', hint: 'Historic' }, { word: 'Desert', hint: 'Nature' }, { word: 'Jungle', hint: 'Nature' }, { word: 'Volcano', hint: 'Mountain' }, { word: 'Island', hint: 'Geography' },
      { word: 'Cave', hint: 'Nature' }, { word: 'Lighthouse', hint: 'Coast' }, { word: 'Harbor', hint: 'Water' }, { word: 'Stadium', hint: 'Building' }, { word: 'Circus', hint: 'Entertainment' },
      { word: 'Bakery', hint: 'Shop' }, { word: 'Gas station', hint: 'Traffic' }, { word: 'Farm', hint: 'Land' }, { word: 'Forest', hint: 'Nature' }, { word: 'Hotel', hint: 'Trip' },
      { word: 'Aquarium', hint: 'Water' }, { word: 'Bank', hint: 'Shop' }, { word: 'City hall', hint: 'City' }, { word: 'Prison', hint: 'Building' }, { word: 'Barber', hint: 'Shop' }, { word: 'Kitchen', hint: 'Room' }
    ],
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: '💼',
    hint: 'Job',
    words: [
      { word: 'Doctor', hint: 'Human' }, { word: 'Teacher', hint: 'Human' }, { word: 'Police officer', hint: 'City' }, { word: 'Firefighter', hint: 'City' }, { word: 'Chef', hint: 'Work' },
      { word: 'Pilot', hint: 'Trip' }, { word: 'Baker', hint: 'Work' }, { word: 'Hairdresser', hint: 'Craft' }, { word: 'Lawyer', hint: 'Office' }, { word: 'Judge', hint: 'State' },
      { word: 'Astronaut', hint: 'Tech' }, { word: 'Farmer', hint: 'Land' }, { word: 'Electrician', hint: 'Craft' }, { word: 'Plumber', hint: 'Craft' }, { word: 'Dentist', hint: 'Health' },
      { word: 'Nurse', hint: 'Health' }, { word: 'Programmer', hint: 'Office' }, { word: 'Engineer', hint: 'Tech' }, { word: 'Architect', hint: 'Office' }, { word: 'Painter', hint: 'Craft' },
      { word: 'Musician', hint: 'Art' }, { word: 'Actor', hint: 'Art' }, { word: 'Waiter', hint: 'Work' }, { word: 'Butcher', hint: 'Craft' }, { word: 'Gardener', hint: 'Nature' },
      { word: 'Mechanic', hint: 'Workshop' }, { word: 'Photographer', hint: 'Art' }, { word: 'Journalist', hint: 'Office' }, { word: 'Detective', hint: 'Work' }, { word: 'Soldier', hint: 'State' },
      { word: 'Fisherman', hint: 'Nature' }, { word: 'Librarian', hint: 'Building' }, { word: 'DJ', hint: 'Entertainment' }, { word: 'Vet', hint: 'Work' }, { word: 'Mailman', hint: 'Street' }, { word: 'Bartender', hint: 'Outing' }
    ],
  },
  {
    id: 'movies',
    name: 'Movies & Shows',
    icon: '🎬',
    hint: 'Movie/Show',
    words: [
      { word: 'Titanic', hint: 'Cinema' }, { word: 'Avatar', hint: 'Cinema' }, { word: 'Batman', hint: 'Hero' }, { word: 'Spider-Man', hint: 'Hero' }, { word: 'Harry Potter', hint: 'Fantasy' },
      { word: 'Star Wars', hint: 'Sci-Fi' }, { word: 'Lord of the Rings', hint: 'Fantasy' }, { word: 'Matrix', hint: 'Sci-Fi' }, { word: 'Frozen', hint: 'Animation' }, { word: 'Shrek', hint: 'Animation' },
      { word: 'Finding Nemo', hint: 'Animation' }, { word: 'The Lion King', hint: 'Animation' }, { word: 'Jurassic Park', hint: 'Thrill' }, { word: 'Pirates of the Caribbean', hint: 'Adventure' }, { word: 'Fast & Furious', hint: 'Action' },
      { word: 'James Bond', hint: 'Action' }, { word: 'Joker', hint: 'Cinema' }, { word: 'Barbie', hint: 'Cinema' }, { word: 'Oppenheimer', hint: 'Historic' }, { word: 'Inception', hint: 'Thrill' },
      { word: 'Gladiator', hint: 'Historic' }, { word: 'Breaking Bad', hint: 'Series' }, { word: 'Game of Thrones', hint: 'Series' }, { word: 'Stranger Things', hint: 'Series' }, { word: 'The Office', hint: 'Comedy' },
      { word: 'Friends', hint: 'Comedy' }, { word: 'Money Heist', hint: 'Series' }, { word: 'Wednesday', hint: 'Series' }, { word: 'Dark', hint: 'Series' }, { word: 'Squid Game', hint: 'Series' },
      { word: 'Minions', hint: 'Animation' }, { word: 'Toy Story', hint: 'Animation' }, { word: 'Cars', hint: 'Animation' }, { word: 'Deadpool', hint: 'Action' }
    ],
  },
  {
    id: 'stars',
    name: 'Celebrities',
    icon: '🌟',
    hint: 'Person',
    words: [
      { word: 'Cristiano Ronaldo', hint: 'Athlete' }, { word: 'Lionel Messi', hint: 'Athlete' }, { word: 'Taylor Swift', hint: 'Music' }, { word: 'Beyoncé', hint: 'Music' }, { word: 'Drake', hint: 'Music' },
      { word: 'Rihanna', hint: 'Music' }, { word: 'Adele', hint: 'Music' }, { word: 'Ed Sheeran', hint: 'Music' }, { word: 'Eminem', hint: 'Music' }, { word: 'Elon Musk', hint: 'Business' },
      { word: 'Bill Gates', hint: 'Business' }, { word: 'Barack Obama', hint: 'Politics' }, { word: 'Albert Einstein', hint: 'Science' }, { word: 'Michael Jackson', hint: 'Music' }, { word: 'Elvis Presley', hint: 'Music' },
      { word: 'Lady Gaga', hint: 'Music' }, { word: 'Billie Eilish', hint: 'Music' }, { word: 'Kanye West', hint: 'Music' }, { word: 'Kim Kardashian', hint: 'TV' }, { word: 'Shakira', hint: 'Music' },
      { word: 'Neymar', hint: 'Athlete' }, { word: 'LeBron James', hint: 'Athlete' }, { word: 'Dwayne Johnson', hint: 'Cinema' }, { word: 'Leonardo DiCaprio', hint: 'Cinema' }, { word: 'Brad Pitt', hint: 'Cinema' },
      { word: 'Angelina Jolie', hint: 'Cinema' }, { word: 'Mr Beast', hint: 'Internet' }, { word: 'Ariana Grande', hint: 'Music' }, { word: 'Justin Bieber', hint: 'Music' }, { word: 'Snoop Dogg', hint: 'Music' },
      { word: 'Bruno Mars', hint: 'Music' }, { word: 'Zendaya', hint: 'Cinema' }
    ],
  },
  {
    id: 'brands',
    name: 'Brands',
    icon: '🏷️',
    hint: 'Brand',
    words: [
      { word: 'Coca-Cola', hint: 'Consumption' }, { word: 'Pepsi', hint: 'Consumption' }, { word: 'Nike', hint: 'Apparel' }, { word: 'Adidas', hint: 'Apparel' }, { word: 'Apple', hint: 'Tech' },
      { word: 'Samsung', hint: 'Tech' }, { word: 'Google', hint: 'Tech' }, { word: 'Amazon', hint: 'Internet' }, { word: 'Netflix', hint: 'Entertainment' }, { word: 'McDonald’s', hint: 'Food' },
      { word: 'Burger King', hint: 'Food' }, { word: 'Starbucks', hint: 'Drink' }, { word: 'Ikea', hint: 'House' }, { word: 'Lego', hint: 'Toy' }, { word: 'Ferrari', hint: 'Vehicle' },
      { word: 'Lamborghini', hint: 'Vehicle' }, { word: 'BMW', hint: 'Vehicle' }, { word: 'Mercedes', hint: 'Vehicle' }, { word: 'Tesla', hint: 'Vehicle' }, { word: 'Porsche', hint: 'Vehicle' },
      { word: 'Rolex', hint: 'Jewelry' }, { word: 'Gucci', hint: 'Fashion' }, { word: 'Louis Vuitton', hint: 'Fashion' }, { word: 'Chanel', hint: 'Fashion' }, { word: 'Red Bull', hint: 'Drink' },
      { word: 'Nutella', hint: 'Food' }, { word: 'Lindt', hint: 'Food' }, { word: 'Spotify', hint: 'Entertainment' }, { word: 'YouTube', hint: 'Internet' }, { word: 'Instagram', hint: 'Internet' },
      { word: 'TikTok', hint: 'Internet' }, { word: 'PlayStation', hint: 'Tech' }, { word: 'Xbox', hint: 'Tech' }, { word: 'Nintendo', hint: 'Tech' }
    ],
  },
  {
    id: 'sport',
    name: 'Sports',
    icon: '⚽',
    hint: 'Sport',
    words: [
      { word: 'Football', hint: 'Game' }, { word: 'Basketball', hint: 'Arena' }, { word: 'Tennis', hint: 'Court' }, { word: 'Golf', hint: 'Grass' }, { word: 'Boxing', hint: 'Fight' },
      { word: 'Swimming', hint: 'Pool' }, { word: 'Skiing', hint: 'Mountain' }, { word: 'Snowboarding', hint: 'Mountain' }, { word: 'Surfing', hint: 'Ocean' }, { word: 'Climbing', hint: 'Nature' },
      { word: 'Horse riding', hint: 'Animal' }, { word: 'Gymnastics', hint: 'Arena' }, { word: 'Volleyball', hint: 'Game' }, { word: 'Handball', hint: 'Arena' }, { word: 'Ice hockey', hint: 'Cold' },
      { word: 'Baseball', hint: 'Game' }, { word: 'Rugby', hint: 'Field' }, { word: 'Cricket', hint: 'Game' }, { word: 'Archery', hint: 'Aim' }, { word: 'Fencing', hint: 'Fight' },
      { word: 'Judo', hint: 'Fight' }, { word: 'Karate', hint: 'Fight' }, { word: 'Wrestling', hint: 'Fight' }, { word: 'Marathon', hint: 'Stamina' }, { word: 'Cycling', hint: 'Road' },
      { word: 'Rowing', hint: 'Water' }, { word: 'Sailing', hint: 'Water' }, { word: 'Diving', hint: 'Water' }, { word: 'Darts', hint: 'Pub' }, { word: 'Billiards', hint: 'Table' },
      { word: 'Bowling', hint: 'Arena' }, { word: 'Table tennis', hint: 'Table' }, { word: 'Skateboarding', hint: 'Road' }, { word: 'Yoga', hint: 'Relax' }
    ],
  },
  {
    id: 'countries',
    name: 'Countries & Cities',
    icon: '🌍',
    hint: 'Place',
    words: [
      { word: 'Germany', hint: 'State' }, { word: 'France', hint: 'State' }, { word: 'Italy', hint: 'State' }, { word: 'Spain', hint: 'State' }, { word: 'England', hint: 'State' },
      { word: 'USA', hint: 'State' }, { word: 'Japan', hint: 'State' }, { word: 'China', hint: 'State' }, { word: 'Brazil', hint: 'State' }, { word: 'Australia', hint: 'Geography' },
      { word: 'Canada', hint: 'State' }, { word: 'Mexico', hint: 'State' }, { word: 'Egypt', hint: 'State' }, { word: 'India', hint: 'State' }, { word: 'Russia', hint: 'State' },
      { word: 'Greece', hint: 'State' }, { word: 'Turkey', hint: 'State' }, { word: 'Norway', hint: 'State' }, { word: 'Berlin', hint: 'Location' }, { word: 'Paris', hint: 'Location' },
      { word: 'London', hint: 'Location' }, { word: 'New York', hint: 'Location' }, { word: 'Tokyo', hint: 'Location' }, { word: 'Rome', hint: 'Location' }, { word: 'Madrid', hint: 'Location' },
      { word: 'Dubai', hint: 'Location' }, { word: 'Amsterdam', hint: 'Location' }, { word: 'Barcelona', hint: 'Location' }, { word: 'Istanbul', hint: 'Location' }, { word: 'Sydney', hint: 'Location' },
      { word: 'Las Vegas', hint: 'Location' }, { word: 'Vienna', hint: 'Location' }, { word: 'Zurich', hint: 'Location' }, { word: 'Rio de Janeiro', hint: 'Location' }
    ],
  },
  {
    id: 'body',
    name: 'Body parts',
    icon: '🫀',
    hint: 'Body',
    words: [
      { word: 'Head', hint: 'Anatomy' }, { word: 'Eye', hint: 'Face' }, { word: 'Nose', hint: 'Face' }, { word: 'Mouth', hint: 'Face' }, { word: 'Ear', hint: 'Anatomy' },
      { word: 'Tongue', hint: 'Face' }, { word: 'Tooth', hint: 'Face' }, { word: 'Hair', hint: 'Anatomy' }, { word: 'Neck', hint: 'Anatomy' }, { word: 'Shoulder', hint: 'Anatomy' },
      { word: 'Arm', hint: 'Anatomy' }, { word: 'Elbow', hint: 'Joint' }, { word: 'Hand', hint: 'Anatomy' }, { word: 'Finger', hint: 'Hand' }, { word: 'Thumb', hint: 'Hand' },
      { word: 'Belly', hint: 'Anatomy' }, { word: 'Back', hint: 'Anatomy' }, { word: 'Leg', hint: 'Anatomy' }, { word: 'Knee', hint: 'Joint' }, { word: 'Foot', hint: 'Anatomy' },
      { word: 'Toe', hint: 'Foot' }, { word: 'Heel', hint: 'Foot' }, { word: 'Heart', hint: 'Organ' }, { word: 'Brain', hint: 'Organ' }, { word: 'Lung', hint: 'Organ' },
      { word: 'Stomach', hint: 'Organ' }, { word: 'Liver', hint: 'Organ' }, { word: 'Rib', hint: 'Bone' }, { word: 'Spine', hint: 'Bone' }, { word: 'Chin', hint: 'Face' },
      { word: 'Cheek', hint: 'Face' }, { word: 'Eyebrow', hint: 'Face' }, { word: 'Eyelash', hint: 'Face' }, { word: 'Navel', hint: 'Belly' }
    ],
  },
  {
    id: 'household',
    name: 'Household',
    icon: '🏠',
    hint: 'Object',
    words: [
      { word: 'Fridge', hint: 'Kitchen' }, { word: 'Washing machine', hint: 'Bathroom' }, { word: 'Vacuum', hint: 'Cleaning' }, { word: 'Microwave', hint: 'Kitchen' }, { word: 'Toaster', hint: 'Kitchen' },
      { word: 'Stove', hint: 'Kitchen' }, { word: 'Oven', hint: 'Kitchen' }, { word: 'Kettle', hint: 'Kitchen' }, { word: 'Iron', hint: 'Clothing' }, { word: 'Hairdryer', hint: 'Bathroom' },
      { word: 'TV', hint: 'Livingroom' }, { word: 'Sofa', hint: 'Furniture' }, { word: 'Bed', hint: 'Furniture' }, { word: 'Wardrobe', hint: 'Furniture' }, { word: 'Table', hint: 'Furniture' },
      { word: 'Chair', hint: 'Furniture' }, { word: 'Carpet', hint: 'Decor' }, { word: 'Curtain', hint: 'Decor' }, { word: 'Dishwasher', hint: 'Kitchen' }, { word: 'Broom', hint: 'Cleaning' },
      { word: 'Bucket', hint: 'Cleaning' }, { word: 'Sponge', hint: 'Cleaning' }, { word: 'Towel', hint: 'Bathroom' }, { word: 'Pillow', hint: 'Furniture' }, { word: 'Blanket', hint: 'Furniture' },
      { word: 'Alarm clock', hint: 'Bedroom' }, { word: 'Candle', hint: 'Decor' }, { word: 'Picture frame', hint: 'Decor' }, { word: 'Flower pot', hint: 'Decor' }, { word: 'Trash can', hint: 'Decor' },
      { word: 'Socket', hint: 'Wall' }, { word: 'Door handle', hint: 'Wall' }, { word: 'Toilet paper', hint: 'Bathroom' }, { word: 'Toothbrush', hint: 'Bathroom' }
    ],
  },
  {
    id: 'school',
    name: 'School',
    icon: '🎒',
    hint: 'School',
    words: [
      { word: 'Blackboard', hint: 'Room' }, { word: 'Chalk', hint: 'Material' }, { word: 'Notebook', hint: 'Paper' }, { word: 'Pen', hint: 'Tool' }, { word: 'Eraser', hint: 'Tool' },
      { word: 'Ruler', hint: 'Tool' }, { word: 'Scissors', hint: 'Tool' }, { word: 'Glue', hint: 'Material' }, { word: 'Backpack', hint: 'Bag' }, { word: 'Lunch', hint: 'Snack' },
      { word: 'Classroom', hint: 'Room' }, { word: 'Teacher', hint: 'Person' }, { word: 'Homework', hint: 'Work' }, { word: 'Exam', hint: 'Work' }, { word: 'Report card', hint: 'Paper' },
      { word: 'Grade', hint: 'Number' }, { word: 'Math', hint: 'Subject' }, { word: 'German', hint: 'Subject' }, { word: 'English', hint: 'Subject' }, { word: 'Chemistry', hint: 'Subject' },
      { word: 'Biology', hint: 'Subject' }, { word: 'Physics', hint: 'Subject' }, { word: 'History', hint: 'Subject' }, { word: 'PE class', hint: 'Subject' }, { word: 'Break', hint: 'Time' },
      { word: 'Schoolyard', hint: 'Place' }, { word: 'Library', hint: 'Place' }, { word: 'Gym', hint: 'Building' }, { word: 'Cafeteria', hint: 'Building' }, { word: 'Principal', hint: 'Person' },
      { word: 'Cheat sheet', hint: 'Paper' }, { word: 'Calculator', hint: 'Device' }, { word: 'Globe', hint: 'Object' }, { word: 'Pencil case', hint: 'Object' }
    ],
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: '📱',
    hint: 'Tech',
    words: [
      { word: 'Smartphone', hint: 'Device' }, { word: 'Laptop', hint: 'Device' }, { word: 'Tablet', hint: 'Device' }, { word: 'Headphones', hint: 'Device' }, { word: 'Camera', hint: 'Device' },
      { word: 'Drone', hint: 'Device' }, { word: 'Robot', hint: 'Tech' }, { word: 'Charger', hint: 'Accessory' }, { word: 'Power bank', hint: 'Accessory' }, { word: 'Router', hint: 'Device' },
      { word: 'Bluetooth', hint: 'Tech' }, { word: 'WiFi', hint: 'Tech' }, { word: 'USB stick', hint: 'Accessory' }, { word: 'Hard drive', hint: 'Accessory' }, { word: 'Graphics card', hint: 'Component' },
      { word: 'Processor', hint: 'Component' }, { word: 'Screen', hint: 'Device' }, { word: 'Keyboard', hint: 'Device' }, { word: 'Mouse', hint: 'Device' }, { word: 'Printer', hint: 'Device' },
      { word: 'Scanner', hint: 'Device' }, { word: 'Smartwatch', hint: 'Device' }, { word: 'VR headset', hint: 'Device' }, { word: 'Console', hint: 'Device' }, { word: 'Controller', hint: 'Accessory' },
      { word: 'Projector', hint: 'Device' }, { word: 'Speaker', hint: 'Device' }, { word: 'Microphone', hint: 'Device' }, { word: 'GPS', hint: 'Tech' }, { word: 'Battery', hint: 'Component' },
      { word: 'App', hint: 'Software' }, { word: 'Password', hint: 'Text' }, { word: 'Cloud', hint: 'Internet' }, { word: 'Emoji', hint: 'Image' }
    ],
  },
  {
    id: 'funny',
    name: 'Silly & Funny',
    icon: '🤪',
    hint: 'Silly',
    words: [
      { word: 'Fart', hint: 'Body' }, { word: 'Booger', hint: 'Body' }, { word: 'Underpants', hint: 'Clothing' }, { word: 'Mustache', hint: 'Face' }, { word: 'Rubber duck', hint: 'Toy' },
      { word: 'Clown', hint: 'Person' }, { word: 'Unicorn', hint: 'Fantasy' }, { word: 'Dwarf', hint: 'Fantasy' }, { word: 'Zombie', hint: 'Fantasy' }, { word: 'Alien', hint: 'Fantasy' },
      { word: 'Slug', hint: 'Animal' }, { word: 'Platypus', hint: 'Animal' }, { word: 'Toilet', hint: 'Room' }, { word: 'Diaper', hint: 'Clothing' }, { word: 'Braces', hint: 'Face' },
      { word: 'Wig', hint: 'Hair' }, { word: 'Bald head', hint: 'Head' }, { word: 'Double chin', hint: 'Face' }, { word: 'Hiccup', hint: 'Body' }, { word: 'Sneeze', hint: 'Body' },
      { word: 'Tickle', hint: 'Action' }, { word: 'Farting', hint: 'Body' }, { word: 'Grimace', hint: 'Face' }, { word: 'Selfie', hint: 'Photo' }, { word: 'Constipation', hint: 'Body' },
      { word: 'Earworm', hint: 'Music' }, { word: 'Awkward moment', hint: 'Situation' }, { word: 'Wart', hint: 'Skin' }, { word: 'Sweat stain', hint: 'Clothing' }, { word: 'Armpit hair', hint: 'Body' },
      { word: 'Drool', hint: 'Body' }, { word: 'Burp', hint: 'Body' }, { word: 'Belly button lint', hint: 'Body' }, { word: 'Plushie', hint: 'Toy' }
    ],
  },
  {
    id: 'party',
    name: 'Party',
    icon: '🎉',
    hint: 'Party',
    words: [
      { word: 'Beer', hint: 'Glass' }, { word: 'Cocktail', hint: 'Glass' }, { word: 'Shot', hint: 'Glass' }, { word: 'Tequila', hint: 'Glass' }, { word: 'Vodka', hint: 'Glass' },
      { word: 'Champagne', hint: 'Glass' }, { word: 'Beer pong', hint: 'Game' }, { word: 'Dance floor', hint: 'Room' }, { word: 'DJ', hint: 'Person' }, { word: 'Disco ball', hint: 'Object' },
      { word: 'Karaoke', hint: 'Game' }, { word: 'Confetti', hint: 'Paper' }, { word: 'Balloon', hint: 'Object' }, { word: 'Birthday', hint: 'Party' }, { word: 'Cake', hint: 'Food' },
      { word: 'Fireworks', hint: 'Sky' }, { word: 'Playlist', hint: 'List' }, { word: 'Hangover', hint: 'State' }, { word: 'Blackout', hint: 'State' }, { word: 'Nightclub', hint: 'Place' },
      { word: 'Bouncer', hint: 'Person' }, { word: 'Jelly', hint: 'Food' }, { word: 'Flip cup', hint: 'Game' }, { word: 'Costume', hint: 'Clothing' }, { word: 'Bachelor party', hint: 'Party' },
      { word: 'New Year', hint: 'Party' }, { word: 'Festival', hint: 'Event' }, { word: 'Campfire', hint: 'Nature' }, { word: 'Barbecue', hint: 'Food' }, { word: 'Sparkler', hint: 'Light' },
      { word: 'Cheers', hint: 'Action' }, { word: 'Dancing', hint: 'Action' }, { word: 'Drunk', hint: 'State' }, { word: 'Afterparty', hint: 'Event' }
    ],
  },
  {
    id: 'adult',
    name: '18+ Naughty',
    icon: '🔞',
    hint: '18+',
    adult: true,
    words: [
      { word: 'Condom', hint: 'Rubber' }, { word: 'Lingerie', hint: 'Fabric' }, { word: 'Thong', hint: 'Fabric' }, { word: 'Panties', hint: 'Fabric' }, { word: 'Underwear', hint: 'Fabric' },
      { word: 'Nightie', hint: 'Clothing' }, { word: 'Kiss', hint: 'Face' }, { word: 'Hickey', hint: 'Skin' }, { word: 'French kiss', hint: 'Action' }, { word: 'Flirt', hint: 'Action' },
      { word: 'One-night stand', hint: 'Meet' }, { word: 'Tinder', hint: 'Software' }, { word: 'Blind date', hint: 'Meet' }, { word: 'Seduction', hint: 'Action' }, { word: 'Fling', hint: 'Secret' },
      { word: 'Foreplay', hint: 'Action' }, { word: 'Red-light district', hint: 'Street' }, { word: 'Strip club', hint: 'Building' }, { word: 'Pole dance', hint: 'Action' }, { word: 'Handcuffs', hint: 'Metal' },
      { word: 'Whip', hint: 'Object' }, { word: 'Hot tub', hint: 'Water' }, { word: 'Massage oil', hint: 'Liquid' }, { word: 'Love letter', hint: 'Paper' }, { word: 'Playboy', hint: 'Magazine' },
      { word: 'Nude photo', hint: 'Image' }, { word: 'Kamasutra', hint: 'Book' }, { word: 'Bachelorette party', hint: 'Celebration' }, { word: 'Quickie', hint: 'Time' }, { word: 'Bikini', hint: 'Clothing' },
      { word: 'Push-up', hint: 'Clothing' }, { word: 'Rendezvous', hint: 'Meet' }, { word: 'Affair', hint: 'Secret' }, { word: 'Booty', hint: 'Body' }
    ],
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
    hint: 'Music',
    words: [
      { word: 'Guitar', hint: 'Instrument' }, { word: 'Piano', hint: 'Instrument' }, { word: 'Drums', hint: 'Instrument' }, { word: 'Violin', hint: 'Instrument' }, { word: 'Trumpet', hint: 'Instrument' },
      { word: 'Flute', hint: 'Instrument' }, { word: 'Saxophone', hint: 'Instrument' }, { word: 'Cello', hint: 'Instrument' }, { word: 'Harp', hint: 'Instrument' }, { word: 'Microphone', hint: 'Device' },
      { word: 'Headphones', hint: 'Accessory' }, { word: 'Turntable', hint: 'Device' }, { word: 'Concert', hint: 'Event' }, { word: 'Festival', hint: 'Event' }, { word: 'Band', hint: 'Group' },
      { word: 'Choir', hint: 'Group' }, { word: 'Orchestra', hint: 'Group' }, { word: 'Rap', hint: 'Style' }, { word: 'Rock', hint: 'Style' }, { word: 'Pop', hint: 'Style' },
      { word: 'Techno', hint: 'Style' }, { word: 'Jazz', hint: 'Style' }, { word: 'Classical', hint: 'Style' }, { word: 'Reggae', hint: 'Style' }, { word: 'Metal', hint: 'Style' },
      { word: 'Ballad', hint: 'Style' }, { word: 'Earworm', hint: 'Thought' }, { word: 'Playlist', hint: 'App' }, { word: 'Album', hint: 'Collection' }, { word: 'Single', hint: 'Release' },
      { word: 'Chorus', hint: 'Text' }, { word: 'Beat', hint: 'Sound' }, { word: 'Conductor', hint: 'Person' }, { word: 'Karaoke', hint: 'Bar' }
    ],
  },
];
