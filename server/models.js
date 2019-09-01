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
        type: ORM.INTEGER,
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
        type: ORM.INTEGER,
      },
      buildingFloor: {
        type: ORM.INTEGER,
      },
      balcony: {
        type: ORM.INTEGER,
      },
    },
    {freezeTableName: true},
  );

  return {Listing};
};
