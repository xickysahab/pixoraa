import Stars from './stars';

export default function TestimonialCard({ item }) {
  return (
    <figure className="tst__card">
      <span className="tst__quote-mark editor" aria-hidden="true">&ldquo;</span>

      <blockquote className="tst__quote">{item.quote}</blockquote>

      <figcaption className="tst__by">
        <span className="tst__name">{item.name}</span>
        <span className="tst__role">{item.role}</span>
        <Stars count={item.stars} />
      </figcaption>
    </figure>
  );
}
