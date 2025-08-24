export type WorkPeriod = '1day' | '1week' | '1month' | '3months' | '6months' | '1year' | 'over1year';

export type WorkDay = 'mon-sun' | 'mon-sat' | 'mon-fri' | 'weekend' | '6days' | '5days' | '4days' | '3days' | '2days' | '1day';

export type WorkTime = 'morning' | 'afternoon' | 'evening' | 'dawn' | 'morning-afternoon' | 'afternoon-evening' | 'evening-dawn' | 'dawn-morning' | 'fulltime';

export type EmploymentType = 'parttime' | 'fulltime' | 'contract' | 'dispatch' | 'intern' | 'freelancer' | 'trainee';

// WorkArea 관련 타입은 별도 파일로 분리
export type { WorkArea, WorkAreaModalProps } from './workArea';

export interface FilterSectionProps {
  title: string;
  maxCount?: number;
  currentCount?: number;
  hideCounter?: boolean;
  children: React.ReactNode;
}

export interface TabOption {
  id: string;
  label: string;
  isSelected: boolean;
}
