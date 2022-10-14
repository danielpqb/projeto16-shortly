CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"token" TEXT UNIQUE
);

CREATE TABLE "urls" (
	"id" serial PRIMARY KEY,
	"url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"visits" bigint NOT NULL,
	"user_id" integer NOT NULL REFERENCES "users"("id")
);