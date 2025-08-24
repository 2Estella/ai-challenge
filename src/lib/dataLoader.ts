import type { SearchConditions, JobCategory, AreaData, DataType } from '@/types/data';

/**
 * JSON 데이터를 로드하는 함수
 */
export async function loadData<T>(type: DataType): Promise<T> {
  try {
    const response = await fetch(`/data/${type}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${type} data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${type} data:`, error);
    throw error;
  }
}

/**
 * 검색 조건 데이터 로드
 */
export const loadSearchConditions = () => loadData<SearchConditions>('condition');

/**
 * 직업 카테고리 데이터 로드
 */
export const loadJobCategories = () => loadData<JobCategory>('job');

/**
 * 지역 데이터 로드
 */
export const loadAreaData = () => loadData<AreaData>('area');
