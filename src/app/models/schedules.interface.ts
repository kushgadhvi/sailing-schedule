import { ILocation } from './location.interface';
// Model for Schedules Details.
export interface ISchedules {
  id: string;
  carrier: ICarrierDetail;
  comments: string;
  cutOff: string;
  cutOffIMO: string;
  eta: string;
  etd: string;
  hub: ILocation;
  placeOfReceipt: ILocation;
  portOfDischarge: ILocation;
  portOfLoading: ILocation;
  productType: string;
  transitTimeCutOffToPort: number;
  transitTimePortToPort: number;
  vessel: IVessel;
  voyageNumber: string;
}

export interface ICarrierDetail {
  name: string;
  scac: string;
}

export interface IVessel {
  imoNumber: string;
  name: string;
}
