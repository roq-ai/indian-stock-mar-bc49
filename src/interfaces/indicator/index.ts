import { BrokerageInterface } from 'interfaces/brokerage';
import { GetQueryInterface } from 'interfaces';

export interface IndicatorInterface {
  id?: string;
  name: string;
  brokerage_id?: string;
  created_at?: any;
  updated_at?: any;

  brokerage?: BrokerageInterface;
  _count?: {};
}

export interface IndicatorGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  brokerage_id?: string;
}
