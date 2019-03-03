module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'class',
    {
      class: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue('class', value.toLowerCase());
        }
      },
      seniors: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 }
    },
    {
      paranoid: true,
      timestamps: false
    }
  );

  return Class;
};

// validate: {
//   isAlphanumeric: true
//   notContains: {
//       args: ['hrnyc_'],
//       msg: "The DB field 'class' should not contain 'hrnyc_'"
//     }
//   },
