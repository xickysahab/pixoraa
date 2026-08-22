import { useCallback, useState } from 'react';
import { services } from '../../data/services';
import ServiceIndex from './service_index';
import ServiceBlock from './service_block';

export default function ServiceList() {
  const [active, setActive] = useState(0);
  const handleActive = useCallback((i) => setActive(i), []);

  return (
    <div className="svc__grid">
      <ServiceIndex active={active} />

      <div className="svc__blocks">
        {services.map((service, i) => (
          <ServiceBlock
            key={service.id}
            service={service}
            index={i}
            onActive={handleActive}
          />
        ))}
      </div>
    </div>
  );
}
