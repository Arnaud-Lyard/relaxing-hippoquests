-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "photo" VARCHAR(255),
    "verified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" DEFAULT 'user',
    "verification_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password_reset_token" TEXT,
    "password_reset_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "designation" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "capacity" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_verification_code_key" ON "user"("verification_code");

-- CreateIndex
CREATE INDEX "user_email_verification_code_password_reset_token_idx" ON "user"("email", "verification_code", "password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_verification_code_password_reset_token_key" ON "user"("email", "verification_code", "password_reset_token");