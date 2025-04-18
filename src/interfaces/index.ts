export interface IPosition {
  x?: number;
  y?: number;
}
export interface ISize {
  width?: number;
  height?: number;
}

export interface IDummyData {
  id: number;
  title: string;
  description: string;
  typeTitle: string;
  type: number;
  img: string;
  position?: IPosition;
  size?: ISize;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
