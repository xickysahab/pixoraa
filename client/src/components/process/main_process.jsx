import SectionWrapper from '../../common/section_wrapper';
import SectionLabel from './section_label';
import ProcessTimeline from './process_timeline';
import './process.css';

export default function Process() {
  return (
    <SectionWrapper id="process" className="proc" label="Our process">
      <SectionLabel />
      <ProcessTimeline />
    </SectionWrapper>
  );
}
