import {MigrationInterface, QueryRunner} from "typeorm";

export class firstLevel1659796208191 implements MigrationInterface {
    name = 'firstLevel1659796208191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "dateJoined" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("orderId" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "start" datetime NOT NULL, "end" datetime NOT NULL, "amount" numeric(20,4) NOT NULL DEFAULT (0), CONSTRAINT "UQ_2aaf4258f98127351d42d157da0" UNIQUE ("orderId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId") SELECT "userId", "bookingId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId") SELECT "userId", "bookingId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "bookingOrderId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"), PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"), CONSTRAINT "FK_7d6ab1e026437ee4ce83792b6b8" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9cb8010799a04178e02f0e4b3a8" FOREIGN KEY ("bookingOrderId") REFERENCES "booking" ("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"), CONSTRAINT "FK_7d6ab1e026437ee4ce83792b6b8" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9cb8010799a04178e02f0e4b3a8" FOREIGN KEY ("bookingOrderId") REFERENCES "booking" ("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b9522468447b764a5ba722f1a6e" FOREIGN KEY ("bookingId") REFERENCES "booking" ("orderId") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "user_booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_booking" RENAME TO "user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"), CONSTRAINT "FK_7d6ab1e026437ee4ce83792b6b8" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9cb8010799a04178e02f0e4b3a8" FOREIGN KEY ("bookingOrderId") REFERENCES "booking" ("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"), PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar NOT NULL, "bookingOrderId" varchar, PRIMARY KEY ("userId", "bookingId", "id"))`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`CREATE INDEX "IDX_7d6ab1e026437ee4ce83792b6b" ON "user_booking" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9522468447b764a5ba722f1a6" ON "user_booking" ("bookingId") `);
        await queryRunner.query(`DROP INDEX "IDX_7d6ab1e026437ee4ce83792b6b"`);
        await queryRunner.query(`DROP INDEX "IDX_b9522468447b764a5ba722f1a6"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "bookingOrderId" varchar)`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"))`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId", "id", "bookingOrderId") SELECT "userId", "bookingId", "id", "bookingOrderId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("userId" varchar NOT NULL, "bookingId" varchar NOT NULL, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"))`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId") SELECT "userId", "bookingId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`ALTER TABLE "user_booking" RENAME TO "temporary_user_booking"`);
        await queryRunner.query(`CREATE TABLE "user_booking" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "bookingId" varchar NOT NULL, "bookingOrderId" varchar, CONSTRAINT "UQ_aaff49116cee45da78b0667cf84" UNIQUE ("bookingId", "userId"))`);
        await queryRunner.query(`INSERT INTO "user_booking"("userId", "bookingId") SELECT "userId", "bookingId" FROM "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "temporary_user_booking"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "user_booking"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
