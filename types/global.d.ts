type welcomeSwipperDataType = {
    id: number;
    image1: any;
    image2: any;
    image3: any;
    top: string;
    right: string;
    bottom: string;
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
  