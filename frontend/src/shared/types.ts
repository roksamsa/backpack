export interface ProductStartData {
  data: Product[];
  total: number;
}

export interface Product {
  id: string;
  codeNumber: string;
  headline: string;
  description: string;
  productGroup: string;
  productName: string;
  productType: string;
  productLine: string;
  productDescription: string;
  materialDescription: string;
  ean: string;
  visible: boolean;
  availableForSale: boolean;
  visibleInPublicNavigation: boolean;
  pthPath: string;
  categoryIds: number[];
  segmentIds: number[];
  categories: any[];
  productReplacements: any[];
  branchCodes: any[];
  price: Price;
}

export interface Price {
  currency: string;
  amount: number;
  pricingUnit: number;
  materialPricingGroup: null;
  productId: string;
}

export interface ProductFormatted extends Product {
  image: string;
}
