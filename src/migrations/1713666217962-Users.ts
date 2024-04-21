import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1713666217962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'avatar',
            type: 'text',
            isNullable: true
          },
          {
            name: 'followers',
            type: 'int'
          },
          {
            name: 'following',
            type: 'int'
          },
          {
            name: 'publications',
            type: 'int'
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
