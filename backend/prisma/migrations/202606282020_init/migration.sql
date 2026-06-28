PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "Application" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "jobTitle" TEXT NOT NULL,
  "jobLink" TEXT,
  "location" TEXT,
  "workMode" TEXT NOT NULL,
  "jobType" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "appliedDate" DATETIME,
  "deadline" DATETIME,
  "source" TEXT NOT NULL,
  "salaryRange" TEXT,
  "notes" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Application_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Application_userId_idx" ON "Application"("userId");

CREATE TABLE IF NOT EXISTS "Reminder" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "applicationId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "reminderDate" DATETIME NOT NULL,
  "isDone" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Reminder_applicationId_fkey"
    FOREIGN KEY ("applicationId") REFERENCES "Application" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Reminder_applicationId_idx" ON "Reminder"("applicationId");

CREATE TABLE IF NOT EXISTS "Contact" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "applicationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT,
  "email" TEXT,
  "linkedinUrl" TEXT,
  "notes" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Contact_applicationId_fkey"
    FOREIGN KEY ("applicationId") REFERENCES "Application" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Contact_applicationId_idx" ON "Contact"("applicationId");

CREATE TABLE IF NOT EXISTS "DocumentChecklist" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "applicationId" TEXT NOT NULL,
  "cvSubmitted" BOOLEAN NOT NULL DEFAULT false,
  "coverLetterSubmitted" BOOLEAN NOT NULL DEFAULT false,
  "portfolioSubmitted" BOOLEAN NOT NULL DEFAULT false,
  "githubSubmitted" BOOLEAN NOT NULL DEFAULT false,
  "notes" TEXT,
  CONSTRAINT "DocumentChecklist_applicationId_fkey"
    FOREIGN KEY ("applicationId") REFERENCES "Application" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "DocumentChecklist_applicationId_key"
  ON "DocumentChecklist"("applicationId");
