import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: 'creditcardvalidator.database.windows.net',
        username: 'hokait',
        password: 'Blackpant4',
        database: 'creditcardvalidator',
        define: {
          freezeTableName: true,
          createdAt: false,
          updatedAt: false,
        },
      });

      sequelize.addModels([]);

      return sequelize;
    },
  },
];
