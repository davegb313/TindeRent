module.exports = (connection, ORM) => {
  const Listing = connection.define(
    'listing',
    {
      id: {
        type: ORM.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: ORM.TEXT,
        allowNull: false,
      },
      description: {
        type: ORM.TEXT,
        allowNull: false,
      },
      price: {
        type: ORM.TEXT,
      },
      images: {
        type: ORM.ARRAY(ORM.TEXT),
      },
      location: {
        type: ORM.TEXT,
        allowNull: false,
      },
      lat: {
        type: ORM.TEXT,
        allowNull: false,
      },
      lon: {
        type: ORM.TEXT,
        allowNull: false,
      },
      author: {
        type: ORM.TEXT,
        allowNull: false,
      },
      floor: {
        type: ORM.TEXT,
      },
      buildingFloor: {
        type: ORM.TEXT,
      },
      balcony: {
        type: ORM.TEXT,
      },
    },
    {freezeTableName: true},
  );
  const User = connection.define(
    'user',
    {
      id: {
        type: ORM.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: ORM.TEXT,
        allowNull: false,
      },
      description: {
        type: ORM.TEXT,
        allowNull: false,
      },
      email: {
        type: ORM.TEXT,
        allowNull: false,
      },
      images: {
        type: ORM.ARRAY(ORM.TEXT),
      },
      phone: {
        type: ORM.TEXT,
        allowNull: false,
      },
      FBid: {
        type: ORM.TEXT,
        allowNull: false,
      }
    },
    {freezeTableName: true},
  );
  const Swipes = connection.define(
    'swipes',
    {
      id: {
        type: ORM.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isLiked: {
        type: ORM.BOOLEAN,
        allowNull: false,
      },
      userID: {
        type: ORM.TEXT,
        allowNull: false,
      },
      listingID: {
        type: ORM.INTEGER,
        allowNull: false,
      },
    },
    {freezeTableName: true},
  );
  return {Listing, User, Swipes};
};
