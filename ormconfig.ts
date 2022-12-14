import config from 'config';

export default {
  type: 'sqlite',
  database: 'tuteria-test.sqlite',
  logging: false,
  entities: [
    'src/entities/**/*.{js,ts}'
  ],
  migrations: [
    'src/migrations/**/*.ts'
  ],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities'
  }
};
