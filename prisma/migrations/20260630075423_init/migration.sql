-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL DEFAULT '',
    "industry" TEXT NOT NULL DEFAULT '',
    "participantCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT '진행 전',
    "hrName" TEXT NOT NULL DEFAULT '',
    "hrEmail" TEXT NOT NULL DEFAULT '',
    "startDate" TEXT NOT NULL DEFAULT '',
    "endDate" TEXT NOT NULL DEFAULT '',
    "note" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL DEFAULT '',
    "position" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "leadershipType" TEXT NOT NULL,
    "assessmentRound" INTEGER NOT NULL DEFAULT 1,
    "deliveryStatus" TEXT NOT NULL DEFAULT '미발송',
    "lastOpenedAt" TEXT,
    "stepCurrent" INTEGER NOT NULL DEFAULT 0,
    "stepTotal" INTEGER NOT NULL DEFAULT 5,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "leadershipType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT '제작 중',
    "stepCount" INTEGER NOT NULL DEFAULT 0,
    "positiveLeaders" JSONB NOT NULL DEFAULT '{}',
    "negativeLeaders" JSONB NOT NULL DEFAULT '{}',
    "totalRounds" INTEGER NOT NULL DEFAULT 0,
    "completedRounds" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'general',
    "leaderType" TEXT NOT NULL DEFAULT 'positive',
    "totalLeaders" INTEGER NOT NULL DEFAULT 0,
    "savedRounds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "generatedContent" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnosis_history" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "leadershipType" TEXT NOT NULL,
    "changedAt" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagnosis_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leadership_info_versions" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "uploadedAt" TEXT NOT NULL,
    "info" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leadership_info_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'manager',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_token_key" ON "participants"("token");

-- CreateIndex
CREATE INDEX "participants_companyId_idx" ON "participants"("companyId");

-- CreateIndex
CREATE INDEX "newsletters_companyId_idx" ON "newsletters"("companyId");

-- CreateIndex
CREATE INDEX "diagnosis_history_participantId_idx" ON "diagnosis_history"("participantId");

-- CreateIndex
CREATE INDEX "leadership_info_versions_companyId_year_idx" ON "leadership_info_versions"("companyId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosis_history" ADD CONSTRAINT "diagnosis_history_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
