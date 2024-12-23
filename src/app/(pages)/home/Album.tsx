import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Photo, ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

import StyledLink from "../../_components/StyledLink/StyledLink";
import allPhotos from "@/styles/photos";
import MotionWrapper from "@/app/_components/MotionWrapper";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type SelectablePhoto = Photo & {
  selected?: boolean;
};

export default function App() {
  const [photos, setPhotos] = useState<SelectablePhoto[]>(() =>
    allPhotos.map((photo) => ({
      ...photo,
      href: "#!",
      label: "Open image in a lightbox",
    }))
  );

  const [index, setIndex] = useState(-1);

  return (
    <MotionWrapper className="padding-main">
      <ColumnsPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        render={{
          link: (props) => <StyledLink {...props} />,
        }}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </MotionWrapper>
  );
}
