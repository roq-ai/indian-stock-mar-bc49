import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { liveTradingToolValidationSchema } from 'validationSchema/live-trading-tools';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.live_trading_tool
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLiveTradingToolById();
    case 'PUT':
      return updateLiveTradingToolById();
    case 'DELETE':
      return deleteLiveTradingToolById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLiveTradingToolById() {
    const data = await prisma.live_trading_tool.findFirst(convertQueryToPrismaUtil(req.query, 'live_trading_tool'));
    return res.status(200).json(data);
  }

  async function updateLiveTradingToolById() {
    await liveTradingToolValidationSchema.validate(req.body);
    const data = await prisma.live_trading_tool.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLiveTradingToolById() {
    const data = await prisma.live_trading_tool.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
