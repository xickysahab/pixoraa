import SectionWrapper from '../../common/section_wrapper';
import SectionLabel from './section_label';
import ServiceList from './service_list';
import './services.css';

/** Composes the services section. The only services file App.jsx imports. */
export default function Services() {
  return (
    <SectionWrapper id="services" className="svc" label="Services">
      <SectionLabel />
      <ServiceList />
    </SectionWrapper>
  );
}
