import { PrismaClient } from "@prisma/client";
import "dotenv/config";
// import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient()

export { prisma }