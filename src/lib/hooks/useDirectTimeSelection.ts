import { useState, useCallback } from 'react';

interface DirectTimeSelection {
  startTime: string;
  endTime: string;
}

interface UseDirectTimeSelectionReturn {
  timeSelection: DirectTimeSelection;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  resetTimeSelection: () => void;
  hasValidSelection: boolean;
}

/**
 * 근무시간 직접 선택을 위한 커스텀 훅
 * 시작시간과 종료시간을 관리하고 유효성 검사를 제공합니다.
 */
export const useDirectTimeSelection = (): UseDirectTimeSelectionReturn => {
  const [timeSelection, setTimeSelection] = useState<DirectTimeSelection>({
    startTime: '',
    endTime: ''
  });

  const setStartTime = useCallback((time: string) => {
    setTimeSelection(prev => ({ ...prev, startTime: time }));
  }, []);

  const setEndTime = useCallback((time: string) => {
    setTimeSelection(prev => ({ ...prev, endTime: time }));
  }, []);

  const resetTimeSelection = useCallback(() => {
    setTimeSelection({ startTime: '', endTime: '' });
  }, []);

  const hasValidSelection = timeSelection.startTime !== '' && timeSelection.endTime !== '';

  return {
    timeSelection,
    setStartTime,
    setEndTime,
    resetTimeSelection,
    hasValidSelection
  };
};
