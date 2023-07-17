import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { liveTradingToolValidationSchema } from 'validationSchema/live-trading-tools';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getLiveTradingTools();
    case 'POST':
      return createLiveTradingTool();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLiveTradingTools() {
    const data = await prisma.live_trading_tool
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'live_trading_tool'));
    return res.status(200).json(data);
  }

  async function createLiveTradingTool() {
    await liveTradingToolValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.live_trading_tool.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
