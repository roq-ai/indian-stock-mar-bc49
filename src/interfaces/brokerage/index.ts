import { IndicatorInterface } from 'interfaces/indicator';
import { LiveTradingToolInterface } from 'interfaces/live-trading-tool';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BrokerageInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  indicator?: IndicatorInterface[];
  live_trading_tool?: LiveTradingToolInterface[];
  user?: UserInterface;
  _count?: {
    indicator?: number;
    live_trading_tool?: number;
  };
}

export interface BrokerageGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
