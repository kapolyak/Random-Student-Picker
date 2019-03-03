module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'class',
    {
      class: {
        type: DataTypes.TEXT,
        notEmpty: true,
        notNull: true,
        unique: true,
        set(value) {
          this.setDataValue('class', value.toLowerCase());
        }
      },
      seniors: {
        type: DataTypes.BOOLEAN,
        notEmpty: true,
        notNull: true
      }
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
