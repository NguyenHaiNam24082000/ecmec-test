export type imageType = {
  imageId: number;
  projectId?: null | number;
  serviceId?: null | number;
  introductionId?: null | number;
  homepageId?: null | number;
  partnerId?: null | number;
  url?: null | string;
  createdTime?: null | string;
  createdUser?: null | string;
  modifiedTime?: null | string;
  modifiedUser?: null | string;
};

export type bannerType = {
  id?: number;
  tagLineVn: string;
  tagLineEn: string;
  descriptionVn: string;
  descriptionEn: string;
  images: imageType[];
}
