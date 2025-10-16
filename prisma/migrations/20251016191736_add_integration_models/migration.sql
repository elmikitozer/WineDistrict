-- CreateTable
CREATE TABLE "public"."IntegrationConnection" (
    "id" TEXT NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "scope" TEXT,
    "merchantId" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExternalProductMapping" (
    "id" TEXT NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "vinId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "externalProductId" TEXT NOT NULL,
    "externalSku" TEXT,
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalProductMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationConnection_provider_cavisteId_key" ON "public"."IntegrationConnection"("provider", "cavisteId");

-- CreateIndex
CREATE INDEX "IntegrationConnection_provider_cavisteId_idx" ON "public"."IntegrationConnection"("provider", "cavisteId");

-- CreateIndex
CREATE INDEX "ExternalProductMapping_cavisteId_vinId_idx" ON "public"."ExternalProductMapping"("cavisteId", "vinId");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalProductMapping_provider_cavisteId_externalProductId_key" ON "public"."ExternalProductMapping"("provider", "cavisteId", "externalProductId");

-- AddForeignKey
ALTER TABLE "public"."IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExternalProductMapping" ADD CONSTRAINT "ExternalProductMapping_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExternalProductMapping" ADD CONSTRAINT "ExternalProductMapping_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
