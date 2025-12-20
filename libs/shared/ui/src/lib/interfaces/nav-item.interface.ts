/**
 * Navigation Interfaces for Hospital Management System
 * Used across sidebar and navigation components
 */

export interface NavSubItem {
  id: string;
  label: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  children?: NavSubItem[];
}

