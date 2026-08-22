/** Title / discipline / year row beneath each card. */
export default function ProjectMeta({ project }) {
  return (
    <div className="work__meta">
      <div className="work__meta-top">
        <h3 className="work__name display">{project.name}</h3>
        <span className="work__year">{project.year}</span>
      </div>
      <p className="work__disc-text">{project.discipline}</p>
      <p className="work__result">{project.result}</p>
    </div>
  );
}
