/**
 * Statistical Card Interface
 * Used for dashboard metrics and KPIs
 */

export interface StatCard {
  label: string;
  value: string;
  trend: number;
  icon: string;
  color: string;
}

