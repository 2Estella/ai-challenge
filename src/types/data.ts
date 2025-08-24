export interface DataCollection {
  name: string;
  collection: string[];
  maxCount?: number;
  type?: 'selection' | 'input';
}

export interface SearchConditions {
  workPeriod: DataCollection;
  workDays: DataCollection;
  workTime: DataCollection;
  gender: DataCollection;
  employmentType: DataCollection;
}

export interface JobCategory {
  name: string;
  collection: string[];
}

export interface AreaData {
  name: string;
  collection: string[];
}

// 데이터 로딩을 위한 타입
export type DataType = 'condition' | 'job' | 'area';
