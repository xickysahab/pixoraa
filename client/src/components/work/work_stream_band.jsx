import { useMemo } from 'react';
import ImageStream from './image_stream';
import { projects } from '../../data/projects';
import { workImages } from '../../data/media';
import Eyebrow from '../../common/eyebrow';

/**
 * Full-bleed corridor that opens the work section. It runs the six real
 * project covers — the same images as the grid below, so the band and
 * the cards read as one body of work rather than stock decoration.
 */
export default function WorkStreamBand() {
  const items = useMemo(
    () => projects.map((p) => ({ ...p, src: workImages[p.id] })),
    []
  );

  return (
    <ImageStream
      items={items}
      cards={9}
      speed={20}
      axis={52}
      className="work__band"
    >
      <div className="stream__veil" aria-hidden="true" />
      <div className="stream__content">
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="work__band-title display">
          Six shoots.<br />One studio floor.
        </h2>
      </div>
    </ImageStream>
  );
}
