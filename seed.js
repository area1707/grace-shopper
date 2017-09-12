const db = require('./server/db')
const Accessory = require('./server/db/models/accessories')

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
    name: 'Birthday Hat',
    category: 'hats',
    price: 20,
    color: 'white',
    description: 'birthday beanie for your baby',
    imageUrl:'/img/hat-1-sm.svg',
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
  }
]

const seed = () =>
Promise.all(accessories.map(accessory =>
  Accessory.create(accessory))
)

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
