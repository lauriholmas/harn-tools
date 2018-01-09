import {Officer} from '../generators/tenant-officer.generator';


export interface ITenant {
  id: number;
  occupation: string;
  craft: string;
  military: string;
  office: string;
  size: number;
  ml: number;
  serf_acres: number;
  free_acres: number;
  labor_days: number;
  rent: number;
  fees: number;
  notes: string[];
}

export class TenantArray extends Array<ITenant> {

  acres(): number {
    let total = 0;
    for (const tenant of this) {
      total += tenant.serf_acres + tenant.free_acres;
    }
    return total;
  }

  freeAcres(): number {
    let total = 0;
    for (const tenant of this) {
      total += tenant.free_acres;
    }
    return total;
  }

  serfAcres(): number {
    let total = 0;
    for (const tenant of this) {
      total += tenant.serf_acres;
    }
    return total;
  }

  laborDays(): number {
    let total = 0;
    for (const tenant of this) {
      total += tenant.labor_days;
    }
    return total;
  }

  fees(): number {
    let total = 0;
    for (const tenant of this) {
      total += tenant.fees;
    }
    return total;
  }

  rent(): number {
    let total = 0;
    for (const tenant of this) {
      total += tenant.rent;
    }
    return total;
  }

  glebeRevenue(): number {
    let glebeAcres = 0;
    let totalAcres = 0; // doing again since this saves another for loop.
    for (const tenant of this) {
      totalAcres += tenant.serf_acres + tenant.free_acres;
      if (tenant.office === Officer.Glebe) {
        glebeAcres = tenant.free_acres;
      }
    }
    totalAcres = totalAcres - glebeAcres;
    return totalAcres * 5 + glebeAcres * 60;
  }
}
