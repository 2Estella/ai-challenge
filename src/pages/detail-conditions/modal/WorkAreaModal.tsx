import React, { useState, useEffect } from 'react';
import type { WorkArea, WorkAreaModalProps } from '@/types/search';
import areaData from '../../../../data/area.json';
import './WorkAreaModal.scss';

export const WorkAreaModal: React.FC<WorkAreaModalProps> = ({
  isOpen,
  onClose,
  onAreaSelect,
  onAreaRemove
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [groupSimilar, setGroupSimilar] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cityAllSelected, setCityAllSelected] = useState<boolean>(false);

  // area.json 데이터를 사용하여 cities 구성
  const cities = [
    { id: 'I000', name: areaData.name, dataNo: 0 }
  ];

  const districts = areaData.collection.map((districtName, index) => ({
    id: `I${String(index + 10).padStart(3, '0')}`,
    name: districtName,
    type: 'district' as const,
    parentId: 'I000',
    dataNo: index
  }));

  // 컴포넌트 마운트 시 첫 번째 지역 자동 선택
  useEffect(() => {
    if (cities.length > 0) {
      setSelectedCity(cities[0].id);
    }
  }, []);

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    setCityAllSelected(false);
  };

  const handleDistrictSelect = (district: WorkArea) => {
    onAreaSelect(district);
  };

  const handleCityAllToggle = () => {
    const newCityAllSelected = !cityAllSelected;
    setCityAllSelected(newCityAllSelected);

    if (newCityAllSelected) {
      // 현재 선택된 도시의 모든 구/군을 선택
      districts.forEach(district => {
        onAreaSelect(district);
      });
    } else {
      // 현재 선택된 도시의 모든 구/군을 제거
      districts.forEach(district => {
        onAreaRemove(district.id);
      });
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setSelectedCity('');
    setCityAllSelected(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="WorkAreaModal">
      <div className="WorkAreaModal__overlay" onClick={handleClose} />
      <div className="WorkAreaModal__container">
        {/* Header */}
        <div className="WorkAreaModal__header">
          <h3 className="WorkAreaModal__title">지역 선택</h3>
          <button className="WorkAreaModal__close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="WorkAreaModal__main">
          {/* Search Section */}
          <div className="WorkAreaModal__search-section">
            <div className="WorkAreaModal__search-container">
              <input
                type="text"
                placeholder="지역명을 검색하세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="WorkAreaModal__search-input"
              />
              <div className="WorkAreaModal__search-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#B8B8B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Group Similar Checkbox */}
            <div className="WorkAreaModal__group-similar">
              <label className="WorkAreaModal__checkbox-label">
                <input
                  type="checkbox"
                  checked={groupSimilar}
                  onChange={(e) => setGroupSimilar(e.target.checked)}
                  className="WorkAreaModal__checkbox"
                />
                <span className="WorkAreaModal__checkbox-text">유사동묶기</span>
              </label>
            </div>
          </div>

          {/* Tab Section */}
          <div className="WorkAreaModal__tab-section">
            {/* City Tab */}
            <div className="WorkAreaModal__city-tab" role="tablist" aria-orientation="vertical" aria-label="시 · 도">
              <p className="WorkAreaModal__tab-title">시 · 도</p>
              <div>
                {cities.map(city => (
                  <button
                    key={city.id}
                    className={`WorkAreaModal__tab-item ${selectedCity === city.id ? 'is-selected' : ''}`}
                    onClick={() => handleCitySelect(city.id)}
                    type="button"
                    data-id={city.id}
                    data-no={city.dataNo}
                    aria-selected={selectedCity === city.id}
                    aria-controls={`depth-panel-${city.id}1`}
                  >
                    <p>{city.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* District Tab - 항상 표시 */}
            <div className="WorkAreaModal__district-tab" role="tablist" aria-orientation="vertical" aria-label="시 · 구 · 군" id="depth-panel-1">
              <p className="WorkAreaModal__tab-title">시 · 구 · 군</p>
              <div className="WorkAreaModal__tab-content">
                {/* 도시 전체 체크박스 */}
                <div className="WorkAreaModal__city-all-checkbox">
                  <div className="WorkAreaModal__checkbox-item">
                    <input
                      type="checkbox"
                      id="selector-I000"
                      checked={cityAllSelected}
                      onChange={handleCityAllToggle}
                      data-no="0"
                      data-sec="0"
                      data-column="0"
                      value="I000"
                    />
                    <label htmlFor="selector-I000">
                      <span>{cities.find(city => city.id === selectedCity)?.name || ''} 전체<em></em></span>
                    </label>
                  </div>
                </div>
                {/* 구/군 목록 */}
                {districts.map(district => (
                  <button
                    key={district.id}
                    className="WorkAreaModal__tab-item"
                    type="button"
                    data-id={district.id}
                    data-no={district.dataNo}
                    aria-selected={false}
                    aria-controls={`depth-panel-${district.id}1`}
                    onClick={() => handleDistrictSelect(district)}
                  >
                    <p>{district.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dong Tab - 항상 표시 */}
            <div className="WorkAreaModal__dong-tab" id="depth-panel-2">
              <p className="WorkAreaModal__tab-title">동 · 읍 · 면</p>
              <div className="WorkAreaModal__tab-content">
                {/* 빈 상태 - 내용 없음 */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="WorkAreaModal__footer">
          <button className="WorkAreaModal__cancel" onClick={handleClose}>
            취소
          </button>
          <button className="WorkAreaModal__confirm" onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
