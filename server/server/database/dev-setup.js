module.exports = (User) =>
  Promise.all([
    User.create({
      email: 'admin@codehall.ca',
      accessType: 'ADMIN',
      state: 'ACTIVE',
      firstName: 'Anthony',
      lastName: 'Aoun',
      hash: '$2a$10$db7eYhWGZ1LZl27gvyX/iOgb33ji1PHY5.pPzRyXaNlbctCFWMF9G', // test1234
    }),

    User.create({
      email: 'carey@codehall.ca',
      accessType: 'STANDARD',
      state: 'ACTIVE',
      firstName: 'Carey',
      lastName: 'Nachenberg',
      hash: '$2a$10$db7eYhWGZ1LZl27gvyX/iOgb33ji1PHY5.pPzRyXaNlbctCFWMF9G', // test1234
    }),

    User.create({
      email: 'joebruin@codehall.ca',
      accessType: 'STANDARD',
      state: 'ACTIVE',
      firstName: 'Joe',
      lastName: 'Bruin',
      hash: '$2a$10$db7eYhWGZ1LZl27gvyX/iOgb33ji1PHY5.pPzRyXaNlbctCFWMF9G', // test1234
    }),

    User.create({
      email: 'ram@codehall.ca',
      accessType: 'STANDARD',
      state: 'ACTIVE',
      firstName: 'Ram',
      lastName: 'Goli',
      hash: '$2a$10$db7eYhWGZ1LZl27gvyX/iOgb33ji1PHY5.pPzRyXaNlbctCFWMF9G', // test1234
    }),
  ]);
