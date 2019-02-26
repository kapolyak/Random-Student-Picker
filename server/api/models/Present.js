module.exports = (sequelize, DataTypes) => {
  const Present = sequelize.define(
    'present',
    {
      date: DataTypes.DATE,
      topic: DataTypes.BOOLEAN
    },
    {
      paranoid: true,
      deletedAt: 'destroyTime'
    }
  );

  Present.associate = (models) => {
    Present.belongsTo(models.student);
    models.student.hasMany(Present);
  };

  return Present;
};
