module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'student',
    {
      student: DataTypes.TEXT,
      active: DataTypes.BOOLEAN
    },
    {
      paranoid: true,
      deletedAt: 'destroyTime'
    }
  );

  Student.associate = (models) => {
    models.class.hasMany(Student);
    Student.belongsTo(models.class);
  };

  return Student;
};
