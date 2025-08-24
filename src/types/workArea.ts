export interface WorkArea {
  id: string;
  name: string;
  type: 'city' | 'district';
  parentId?: string;
}

export interface WorkAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAreas: WorkArea[];
  onAreaSelect: (area: WorkArea) => void;
  onAreaRemove: (areaId: string) => void;
}
