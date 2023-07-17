interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Trader'],
  customerRoles: ['End User'],
  tenantRoles: ['Trader'],
  tenantName: 'Brokerage',
  applicationName: 'indian stock market',
  addOns: ['file'],
};
