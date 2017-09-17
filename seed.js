const db = require('./server/db')
const Accessory = require('./server/db/models/accessories')
const User = require('./server/db/models/users')
const Review = require('./server/db/models/reviews')

const accessories = [
  {
    name: 'Browline Glasses',
    category: 'glasses',
    price: 10,
    color: 'black',
    description: 'retro cuties for your kitty',
    imageUrl: '/img/glasses-1-sm.svg',
    inventory: 10
  },
  {
    name: 'Cateye Glasses',
    category: 'glasses',
    price: 15,
    color: 'white',
    description: 'retro cuties made special for your kitty',
    imageUrl: '/img/glasses-2-sm.svg',
    inventory: 10
  },
  {
    name: '3D Glasses',
    category: 'glasses',
    price: 10,
    color: 'black',
    description: 'now your kitty can see in 3d!',
    imageUrl: '/img/glasses-3-sm.svg',
    inventory: 10
  },
  {
    name: 'Wireframe Glasses',
    category: 'glasses',
    price: 15,
    color: 'silver',
    description: 'for your erudite feline friend',
    imageUrl: '/img/glasses-4-sm.svg',
    inventory: 10
  },
  {
    name: 'Snorkling Mask',
    category: 'glasses',
    price: 20,
    color: 'blue',
    description: 'for the fearless water-loving kitty',
    imageUrl: '/img/glasses-5-sm.svg',
    inventory: 10
  },
  {
    name: 'Clear Glasses',
    category: 'glasses',
    price: 10,
    color: 'clear',
    description: 'for the kitty who wants to blend in',
    imageUrl: '/img/glasses-6-sm.svg',
    inventory: 10
  },
  {
    name: 'Full-Rim Glasses',
    category: 'glasses',
    price: 10,
    color: 'blue',
    description: 'a simple set for your kitty',
    imageUrl: '/img/glasses-7-sm.svg',
    inventory: 10
  },
  {
    name: 'Wayfarer Glasses',
    category: 'glasses',
    price: 10,
    color: 'black',
    description: 'retro cuties for your beach-loving kitty',
    imageUrl: '/img/glasses-8-sm.svg',
    inventory: 10
  },
  {
    name: 'Birthday Hat',
    category: 'hats',
    price: 20,
    color: 'white',
    description: 'birthday beanie for your baby',
    imageUrl: '/img/hat-1-sm.svg',
    inventory: 10
  },
  {
    name: 'Fedora',
    category: 'hats',
    price: 20,
    color: 'black',
    description: 'give off those mysterious detective kitty vibes',
    imageUrl: '/img/hat-2-sm.svg',
    inventory: 10
  },
  {
    name: 'Fez Hat',
    category: 'hats',
    price: 30,
    color: 'red',
    description: 'this hat is fez-tastic!',
    imageUrl: '/img/hat-3-sm.svg',
    inventory: 10
  },
  {
    name: 'Chef Hat',
    category: 'hats',
    price: 20,
    color: 'white',
    description: 'keep your cat chef pleased with this hat unless you want an unwanted surprise in your dinner',
    imageUrl: '/img/hat-4-sm.svg',
    inventory: 10
  },
  {
    name: 'Baseball Cap',
    category: 'hats',
    price: 15,
    color: 'blue',
    description: 'keep your kitty cool and shady with a basic but stylish cap',
    imageUrl: '/img/hat-5-sm.svg',
    inventory: 10
  },
  {
    name: 'Winter Beanie',
    category: 'hats',
    price: 15,
    color: 'purple',
    description: 'brrrrr, keep your baby warm with this cute lil beanie',
    imageUrl: '/img/hat-6-sm.svg',
    inventory: 10
  },
  {
    name: 'Tiara',
    category: 'hats',
    price: 40,
    color: 'gold',
    description: 'your fluffy cat princess deserves a tiara just as beautiful as herself',
    imageUrl: '/img/hat-7-sm.svg',
    inventory: 10
  },
  {
    name: 'Crown',
    category: 'hats',
    price: 45,
    color: 'gold',
    description: 'a crown fit for a king',
    imageUrl: '/img/hat-8-sm.svg',
    inventory: 10
  },
  {
    name: 'Unicorn Hat',
    category: 'hats',
    price: 45,
    color: 'white',
    description: 'Turn your cat into a UNICAT',
    imageUrl: '/img/hat-9-sm.svg',
    inventory: 10
  },
  {
    name: 'Sweatband',
    category: 'hats',
    price: 15,
    color: 'blue',
    description: 'perfect for the gym or those hot summer days to keep your fur at bay',
    imageUrl: '/img/hat-10-sm.svg',
    inventory: 10
  },
  {
    name: 'Propeller Cap',
    category: 'hats',
    price: 25,
    color: 'rainbow',
    description: 'An old school propeller beanie for your baby that also doubles as a toy',
    imageUrl: '/img/hat-11-sm.svg',
    inventory: 10
  },
  {
    name: 'Bow',
    category: 'hats',
    price: 10,
    color: 'red',
    description: 'think your kitty could not get any cuter? take cuteness to another level with this stylish bow',
    imageUrl: '/img/hat-12-sm.svg',
    inventory: 10
  },
  {
    name: 'Yarn Ball',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'a ball of yarn for your cat to play',
    imageUrl: '/img/toy-1-sm.svg',
    inventory: 10
  },
  {
    name: 'Felt Mouse',
    category: 'toys',
    price: 5,
    color: 'purple',
    description: 'for the aspiring coder kitty',
    imageUrl: '/img/toy-2-sm.svg',
    inventory: 10
  },
  {
    name: 'Pizza Slice',
    category: 'toys',
    price: 5,
    color: 'white',
    description: 'a snack for the cowabunga cat',
    imageUrl: '/img/toy-3-sm.svg',
    inventory: 10
  },
  {
    name: 'Fish Skeleton',
    category: 'toys',
    price: 5,
    color: 'white',
    description: 'a perfect toy for the aspiring catfish',
    imageUrl: '/img/toy-4-sm.svg',
    inventory: 10
  },
  {
    name: 'Soccer Ball',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'a great gift for your feline Pele',
    imageUrl: '/img/toy-5-sm.svg',
    inventory: 10
  },
  {
    name: 'Donut',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'a gluttonous snack (that\'s not a cheezburger)',
    imageUrl: '/img/toy-6-sm.svg',
    inventory: 10
  },
  {
    name: 'Fishbowl',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'the perfect pet for your pet',
    imageUrl: '/img/toy-7-sm.svg',
    inventory: 10
  },
  {
    name: 'Campfire',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'keep your outdoor cat warm and toasty',
    imageUrl: '/img/toy-8-sm.svg',
    inventory: 10
  },
  {
    name: 'Magic Wand',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'abra-cat-dabra!',
    imageUrl: '/img/toy-9-sm.svg',
    inventory: 10
  },
  {
    name: 'Ice Cream Cone',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'a cool treat for the dog days of summer',
    imageUrl: '/img/toy-10-sm.svg',
    inventory: 10
  },
  {
    name: 'Coffee Mug',
    category: 'toys',
    price: 5,
    color: 'white',
    description: 'meowspresso',
    imageUrl: '/img/toy-11-sm.svg',
    inventory: 10
  },
  {
    name: 'Put Put Golf',
    category: 'toys',
    price: 25,
    color: 'green',
    description: 'what kitty does not love put put?!?',
    imageUrl: '/img/toy-12-sm.svg',
    inventory: 10
  },
  {
    name: 'Pink Flamingo',
    category: 'toys',
    price: 15,
    color: 'pink',
    description: 'a companion for your kitty',
    imageUrl: '/img/toy-13-sm.svg',
    inventory: 10
  },
  {
    name: 'Rocket Ship',
    category: 'toys',
    price: 20,
    color: 'white',
    description: '5..4..3..2..1 BLASTOFF!',
    imageUrl: '/img/toy-14-sm.svg',
    inventory: 10
  },
  {
    name: 'Foam Finger',
    category: 'toys',
    price: 5,
    color: 'green',
    description: 'foam finger for your number 1 kitty',
    imageUrl: '/img/toy-15-sm.svg',
    inventory: 10
  },
  {
    name: 'Banzai Tree',
    category: 'toys',
    price: 10,
    color: 'green',
    description: 'a zen tree that is the perfect size for your lil tabby',
    imageUrl: '/img/toy-16-sm.svg',
    inventory: 10
  },
  {
    name: 'Wine Glass',
    category: 'toys',
    price: 13,
    color: 'red',
    description: 'ahh finally, a wine glass your kitty could not shatter',
    imageUrl: '/img/toy-17-sm.svg',
    inventory: 10
  },
  {
    name: 'Keyboard',
    category: 'toys',
    price: 20,
    color: 'blue',
    description: 'for your meowsician',
    imageUrl: '/img/toy-18-sm.svg',
    inventory: 10
  },
  {
    name: 'Martini',
    category: 'toys',
    price: 16,
    color: 'white',
    description: 'Shaken, not stirred',
    imageUrl: '/img/toy-19-sm.svg',
    inventory: 10
  }
]

const users = [
  {
    name: 'Erin',
    email: 'erin.kimberly.shaw@gmail.com',
    password: 'password',
    isAdmin: true
  },
  {
    name: 'An',
    email: 'lean257@gmail.com',
    password: 'password',
    isAdmin: true
  },
  {
    name: 'Raz',
    email: 'kaur.rasprit@gmail.com',
    password: 'password',
    isAdmin: true
  },
  {
    name: 'Alice',
    email: 'alicejychen15@gmail.com',
    password: 'password',
    isAdmin: true
  },
]

const reviews = [
  {
    content: 'a purrfect pair of glasses',
    star: 5,
    accessoryId: 2,
    userId: 1
  },
  {
    content: 'would purrfer if they were more feline',
    star: 3,
    accessoryId: 2,
    userId: 2
  },
  {
    content: 'who would go in the water?!',
    star: 1,
    accessoryId: 4,
    userId: 2
  },
  {
    content: 'feliz cumpleaños, feline!',
    star: 4,
    accessoryId: 8,
    userId: 1
  },
  {
    content: 'fit for royalty!',
    star: 5,
    accessoryId: 15,
    userId: 2
  },
  {
    content: 'a fez fit for a feline friend!',
    star: 4,
    accessoryId: 11,
    userId: 3
  },
  {
    content: 'delish!',
    star: 5,
    accessoryId: 26,
    userId: 4
  },
  {
    content: 'would have preferred it alive...',
    star: 3,
    accessoryId: 22,
    userId: 4
  },
  {
    content: 'who doesn\'t love a good pizza?',
    star: 4,
    accessoryId: 23,
    userId: 1
  },
  {
    content: 'used to be alive...',
    star: 1,
    accessoryId: 24,
    userId: 1
  },
  {
    content: 'a purrfect spot to curl up next to',
    star: 4,
    accessoryId: 28,
    userId: 3
  },  {
    content: 'wish it were a bit stronger :(',
    star: 3,
    accessoryId: 39,
    userId: 4
  },
]

const randomReviews = [
  ['i love it!', 5],
  ['could be improved...', 2],
  ['cute but not practical :-/', 3],
  ['almost perfect!', 4],
  ['hated it!', 1],
  ['i want more!', 5],
  ['didn\'t fit :(', 2],
  ['it was awful!', 1],
  ['i need more!', 4],
  ['wish i loved it...', 3],
  ['i love it!', 3],
]

const reviewGenerator = () => {
  let reviewArr = []
  for (let i = 1; i < 80; i++) {
    let randomAcc = Math.ceil(Math.random() * 39)
    let randomUser = Math.ceil(Math.random() * 4)
    let randomReview = Math.ceil(Math.random() * 10)
    reviewArr.push({
      content: randomReviews[randomReview][0],
      star: randomReviews[randomReview][1],
      accessoryId: randomAcc,
      userId: randomUser
    })
  }
  return reviewArr
}


const seed = () => {
  return Promise.all(accessories.map(accessory =>
    Accessory.create(accessory))
  )
  .then(() => {
    return Promise.all(users.map(user =>
      User.create(user))
    )
  })
  .then(() => {
    return Promise.all(reviews.map(review =>
      Review.create(review))
    )
  .then(() => {
    return Promise.all(reviewGenerator().map(review =>
      Review.create(review)))
  })
  })
}


const main = () => {
  console.log('Syncing db...')
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...')
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack);
    })
    .then(() => {
      db.close()
      return null
    });
};

main()
