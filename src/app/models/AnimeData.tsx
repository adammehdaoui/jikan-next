import TitleData from "./TitleData"

export default interface AnimeData {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  titles: Array<TitleData>;
  title: string;
}