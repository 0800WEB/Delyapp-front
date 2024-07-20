type welcomeSwipperDataType = {
  id: number;
  image1: any;
  image2: any;
  image3: any;
  top: any;
  right: any;
  bottom: any;
};

type categorySliderDataType = {
  id: any;
  image: any;
  title: string;
};

type Avatar = {
  public_id: string;
  url: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: Avatar;
  password?: string;
  courses: any;
  createdAt: Date;
  updatedAt: Date;
};

type BannerDataTypes = {
  bannerImageUrl: any;
};

type fakeDataType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
