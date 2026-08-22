import { projects } from '../../data/projects';
import ProjectCard from './project_card';

export default function ProjectGrid() {
  return (
    <div className="work__grid">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
