import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import BentoGrid from './bento_grid';
import GalleryModal from './gallery_modal';
import { galleryIntro, galleryItems } from '../../data/gallery';
import './gallery.css';

export default function Gallery() {
  const [items, setItems] = useState(galleryItems);
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper id="gallery" className="gal" label="Studio gallery">
      <header className="gal__head">
        <Eyebrow>{galleryIntro.label}</Eyebrow>
        <RevealText
          as="h2"
          lines={[galleryIntro.title]}
          className="gal__title sec-title"
        />
        <p className="gal__desc">{galleryIntro.description}</p>
      </header>

      <BentoGrid items={items} setItems={setItems} onOpen={setSelected} />

      <AnimatePresence>
        {selected && (
          <GalleryModal
            item={selected}
            items={items}
            onSelect={setSelected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
