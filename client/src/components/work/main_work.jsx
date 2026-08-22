import SectionWrapper from '../../common/section_wrapper';
import WorkStreamBand from './work_stream_band';
import SectionLabel from './section_label';
import ProjectGrid from './project_grid';
import './work.css';

/**
 * The corridor band sits outside SectionWrapper so it runs full-bleed;
 * the heading and grid keep the page gutters.
 */
export default function Work() {
  return (
    <section id="work" className="work" aria-label="Selected work">
      <WorkStreamBand />
      <SectionWrapper className="work__body">
        <SectionLabel />
        <ProjectGrid />
      </SectionWrapper>
    </section>
  );
}
