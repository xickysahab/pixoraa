import { useState } from 'react';
import { faqs } from '../../data/faq';
import FaqItem from './faq_item';

/**
 * Single-open accordion: opening one closes the rest, so the reader is
 * never scrolling past six expanded answers looking for the one they
 * opened. The first is open on load — an accordion that starts fully
 * closed hides the fact that there are answers at all.
 */
export default function FaqList() {
  const [openId, setOpenId] = useState(faqs[0].id);

  return (
    <div className="faq__list">
      {faqs.map((item) => (
        <FaqItem
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
