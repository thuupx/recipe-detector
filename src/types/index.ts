export interface RecipeSettingsResponse {
  clarity: Clarity[];
  color: Color[];
  color_chrome_effect: ColorChromeEffect[];
  color_chrome_effect_blue: ColorChromeEffectBlue[];
  dynamic_range: DynamicRange[];
  exposure_compensation: ExposureCompensation[];
  film_simulation: FilmSimulation[];
  grain_effect: GrainEffect[];
  highlight: Highlight[];
  iso: Iso[];
  noise_reduction: NoiseReduction[];
  sensor: Sensor[];
  shadow: Shadow[];
  sharpening: Sharpening[];
  wb_shift_blue: WbShiftBlue[];
  wb_shift_red: WbShiftRed[];
  white_balance: WhiteBalance[];
}

export interface Clarity {
  probability: number;
  raw_value: number;
  value: string;
}

export interface Color {
  probability: number;
  raw_value: number;
  value: string;
}

export interface ColorChromeEffect {
  probability: number;
  value: string;
}

export interface ColorChromeEffectBlue {
  probability: number;
  value: string;
}

export interface DynamicRange {
  probability: number;
  value: string;
}

export interface ExposureCompensation {
  probability: number;
  raw_value: number;
  value: string;
}

export interface FilmSimulation {
  probability: number;
  value: string;
}

export interface GrainEffect {
  probability: number;
  value: string;
}

export interface Highlight {
  probability: number;
  raw_value: number;
  value: string;
}

export interface Iso {
  probability: number;
  value: string;
}

export interface NoiseReduction {
  probability: number;
  raw_value: number;
  value: string;
}

export interface Sensor {
  probability: number;
  value: string;
}

export interface Shadow {
  probability: number;
  raw_value: number;
  value: string;
}

export interface Sharpening {
  probability: number;
  raw_value: number;
  value: string;
}

export interface WbShiftBlue {
  probability: number;
  raw_value: number;
  value: string;
}

export interface WbShiftRed {
  probability: number;
  raw_value: number;
  value: string;
}

export interface WhiteBalance {
  probability: number;
  value: string;
}

export enum SensorModel {
  XTransI = "X-Trans I",
  XTransII = "X-Trans II",
  XTransIII = "X-Trans III",
  XTransIV = "X-Trans IV",
  XTransV = "X-Trans V",
  Bayer = "Bayer",
  GFX = "GFX",
  EXR = "EXR-CMOS",
  Unknown = "Unknown",
}

export interface FujifilmExifData {
  Make: string;
  Model: string;
  Orientation: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  Software: string;
  DateTime: string;
  Artist: string;
  YCbCrPositioning: number;
  Copyright: string;
  ExifIFDPointer: number;
  undefined: string;
  ExposureTime: number;
  FNumber: number;
  ExposureProgram: string;
  ISOSpeedRatings: number;
  ExifVersion: string;
  DateTimeOriginal: string;
  DateTimeDigitized: string;
  ComponentsConfiguration: string;
  CompressedBitsPerPixel: number;
  ShutterSpeedValue: number;
  ApertureValue: number;
  BrightnessValue: number;
  ExposureBias: number;
  MaxApertureValue: number;
  MeteringMode: string;
  LightSource: string;
  Flash: string;
  FocalLength: number;
  MakerNote: number[];
  UserComment: number[];
  FlashpixVersion: string;
  ColorSpace: number;
  PixelXDimension: number;
  PixelYDimension: number;
  InteroperabilityIFDPointer: number;
  FocalPlaneXResolution: number;
  FocalPlaneYResolution: number;
  FocalPlaneResolutionUnit: number;
  SensingMethod: string;
  FileSource: string;
  SceneType: string;
  CustomRendered: string;
  ExposureMode: number;
  WhiteBalance: string;
  FocalLengthIn35mmFilm: number;
  SceneCaptureType: string;
  Sharpness: string;
  SubjectDistanceRange: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  Compression: number;
  Orientation: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  undefined: string;
  JpegIFOffset: number;
  JpegIFByteCount: number;
  YCbCrPositioning: number;
  blob: Blob;
}
