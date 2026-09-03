import { processContact } from '../../data/process';
import Button from '../../common/button';

export default function ProcessContactCard() {
  const initials = processContact.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <div className="proc__card">
      <div className="proc__card-top">
        <span className="proc__avatar" aria-hidden="true">{initials}</span>
        <div>
          <p className="proc__card-name">{processContact.name}</p>
          <p className="proc__card-role">{processContact.role}</p>
        </div>
      </div>
      <p className="proc__card-line">{processContact.line}</p>
      <Button href="#contact" variant="ghost">
        Book a call
      </Button>
    </div>
  );
}
