import { BrokerageInterface } from 'interfaces/brokerage';
import { GetQueryInterface } from 'interfaces';

export interface LiveTradingToolInterface {
  id?: string;
  name: string;
  brokerage_id?: string;
  created_at?: any;
  updated_at?: any;

  brokerage?: BrokerageInterface;
  _count?: {};
}

export interface LiveTradingToolGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  brokerage_id?: string;
}
